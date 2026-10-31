# IndexNow (Bing, Yandex, Seznam, Naver)

IndexNow tells search engines the moment a URL on focus25.io is new or changed,
so they don't have to wait for their next crawl.

## What is in the project

- `public/7f9a0b8f0528fb55b15ce0b3c5f2c589747b6bfd1698d67e4537c8c9a18e283f.txt`
  contains the API key. It is published at
  `https://focus25.io/7f9a0b8f0528fb55b15ce0b3c5f2c589747b6bfd1698d67e4537c8c9a18e283f.txt`
  and that is how IndexNow proves the site is yours. Keep the file: if it
  disappears, submissions stop working.
- `scripts/indexnow.mjs` reads the key from that file, reads the URLs from
  `public/sitemap.xml` and sends them to `https://api.indexnow.org/indexnow`.

## How to submit

```bash
bun run indexnow
```

That sends all 301 URLs in the sitemap. To send only a few:

```bash
bun run indexnow https://focus25.io/ https://focus25.io/it
```

## When to run it

After a Publish that adds or changes pages. Running it again with the same URLs
is harmless — the engines just re-check them.

## Notes

- The key file only exists on the live site after a Publish. Running the script
  before publishing returns `403: key not verified`.
- `focus25.io` redirects to `www.focus25.io`. If a submission is rejected for
  that reason, run it with the other host:
  `INDEXNOW_HOST=www.focus25.io bun run indexnow`.
- IndexNow covers Bing, Yandex, Seznam and Naver. Google is not part of
  IndexNow: for Google, keep the sitemap in Google Search Console.
