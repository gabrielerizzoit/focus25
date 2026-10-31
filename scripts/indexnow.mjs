#!/usr/bin/env node
/*
 * IndexNow submission for Focus25.
 *
 * IndexNow lets Bing, Yandex, Seznam, Naver and other engines learn about
 * new or changed URLs the moment they are published, instead of waiting for
 * the next crawl.
 *
 * The API key lives in public/<key>.txt so that it is served at
 * https://focus25.io/<key>.txt — that is how IndexNow verifies the key.
 *
 * Usage:
 *   bun run indexnow                      submit every URL in public/sitemap.xml
 *   bun run indexnow <url> [<url> ...]    submit only the URLs you pass
 *   INDEXNOW_HOST=www.focus25.io bun run indexnow
 */

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const HOST = process.env.INDEXNOW_HOST || 'focus25.io';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const KEY_FILE_RE = /^[0-9a-f]{32,128}\.txt$/;
const MAX_PER_REQUEST = 10000;

function findKey() {
  const file = readdirSync(PUBLIC_DIR).find((name) => KEY_FILE_RE.test(name));
  if (!file) {
    throw new Error('No IndexNow key file found in public/ (expected a file named <hex-key>.txt).');
  }
  const key = readFileSync(path.join(PUBLIC_DIR, file), 'utf8').trim();
  if (!/^[0-9a-f]{32,128}$/.test(key)) {
    throw new Error(`public/${file} does not contain a valid hex key.`);
  }
  if (key !== file.replace(/\.txt$/, '')) {
    throw new Error(`public/${file} content must match its file name.`);
  }
  return { key, file };
}

function sitemapUrls() {
  const xml = readFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].trim());
}

function onHost(url) {
  try {
    const { hostname } = new URL(url);
    return hostname === HOST || hostname === `www.${HOST}`;
  } catch {
    return false;
  }
}

function explainStatus(status, body) {
  switch (status) {
    case 200:
    case 202:
      return 'accepted — the engines will pick the URLs up shortly';
    case 400:
      return 'bad request — the key or the URL list is malformed';
    case 403:
      return `key not verified — https://${HOST}/<key>.txt is not reachable yet (the site needs a Publish)`;
    case 422:
      return 'unprocessable — the URL list contains URLs this host does not own';
    case 429:
      return 'too many requests — wait a minute and run it again';
    case 500:
      return 'IndexNow server error — try again later';
    default:
      return body || 'unexpected response';
  }
}

async function submitBatch(urls, key) {
  const payload = {
    host: HOST,
    key,
    keyLocation: `https://${HOST}/indexnow-key.txt`,
    urlList: urls,
  };
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const body = await response.text();
  return { ok: response.status === 200 || response.status === 202, status: response.status, body };
}

async function main() {
  const { key, file } = findKey();
  const given = process.argv.slice(2).filter((a) => !a.startsWith('-'));
  const urls = [...new Set((given.length ? given : sitemapUrls()).filter(onHost))];

  if (!urls.length) {
    throw new Error(`No URLs for host ${HOST} found — nothing to submit.`);
  }

  console.log(`IndexNow: submitting ${urls.length} URL(s) for ${HOST} (key from public/${file})`);

  let failed = 0;
  for (let i = 0; i < urls.length; i += MAX_PER_REQUEST) {
    const batch = urls.slice(i, i + MAX_PER_REQUEST);
    const { ok, status, body } = await submitBatch(batch, key);
    console.log(`  batch ${i / MAX_PER_REQUEST + 1} (${batch.length} urls) -> ${status}: ${explainStatus(status, body)}`);
    if (!ok) failed += batch.length;
  }

  if (failed) {
    console.error(`IndexNow: ${failed} URL(s) were not accepted.`);
    process.exit(1);
  }
  console.log('IndexNow: all URLs accepted.');
}

main().catch((error) => {
  console.error(`IndexNow failed: ${error.message}`);
  process.exit(1);
});
