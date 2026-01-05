This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment

Copy `.env.example` to `.env.local` and fill as needed:

- `NEXT_PUBLIC_SITE_URL` (used for `sitemap.xml`, `robots.txt`, and metadata base)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional GA4)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Language (EN / 中文)

- Use the top-right language switcher to toggle between English and Chinese.
- Default language is auto-detected from your browser (and saved in `localStorage`).
- You can force language via URL query:
  - English: `/?lang=en`
  - 中文: `/?lang=zh`

## Docker (NAS / Server)

Build and run:

```bash
docker compose up -d --build
```

Then open `http://<server-ip>:3000/`.

### Put it on your domain (example: `maplesgedu.com`)

1. Run the container on your server (as above).
2. Point your reverse proxy (Nginx/Caddy) to `http://127.0.0.1:3000`.

Example Nginx site:

```nginx
server {
  server_name maplesgedu.com www.maplesgedu.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
