This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server (need node >= 20):

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

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment variable

NEXT_PUBLIC_API_URL='https://assessment-tracking-backend.vercel.app/api'

## Project Structure

.
├── api/ # APIs used by frontend
├── app/ # Next.js App Directory (if using Next.js 13+ App Router)
│ ├── (auth)/ # Auth pages
│ │ └── page.tsx # Main start page under auth layout
│ ├── assessment/ # Assessment Pages
│ │ └── page.tsx # Main start page under auth layout
│ ├── layout.tsx # Root layout for the application
├── components/ # Reusable UI components
├── config/ # Configuration files
├── lib/ # Library (declarations)
├── stores/ # Storage
├── .env # env variables
├── next.config.js # Next.js configuration file
├── tsconfig.json # TypeScript configuration file
├── package.json # npm package configuration
└── README.md # Documentation

## Testing

URL: https://assessment-tracking-dashboard.vercel.app/
Login Credentials:

-   Username- user
-   Password- password
