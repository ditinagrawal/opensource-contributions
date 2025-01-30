# GitHub PR Portfolio

A beautiful, responsive Next.js application to showcase your open-source contributions by displaying your merged pull requests.

![Dark](/public/main-dark.png)
![Light](/public/main-light.png)

## Features

-   🎨 Modern UI with Tailwind CSS
-   ✨ Smooth animations and transitions
-   📱 Fully responsive design
-   🌓 Light/Dark mode support
-   ⚡ Server-side rendering with Next.js
-   📊 Pagination and caching support
-   🎯 Real-time GitHub API integration

## Prerequisites

-   Node.js 18+
-   npm/yarn/pnpm/bun

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/ditinagrawal/opensource-contributions.git

cd opensource-contributions
```

2. Install dependencies:

```bash
npm install
```

or

```
yarn install
```

or

```
pnpm install
```

or

```
bun install
```

3. Update GitHub username:

Open `components/GithubPR.jsx` and modify the username constant with your GitHub username:

```javascript
const username = "your-github-username";
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see your contributions!

## Environment Variables

```env
<!-- For authorization, need a auth token -->
GITHUB_KEY=""
```

## Customization

-   **Colors**: Modify the color scheme in `app/globals.css`
-   **Layout**: Update the layout in `app/layout.jsx`
-   **Card Design**: Customize the PR card appearance in `components/PRCard.jsx`

## Building for Production

```bash
npm run build
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ditinagrawal/opensource-contributions)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
