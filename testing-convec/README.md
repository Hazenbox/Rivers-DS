# Convex Task Manager

A simple task manager app to test Convex deployment with Next.js.

## Setup

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Set up Convex**:
   ```bash
   npx convex dev
   ```
   This will:
   - Open a browser for authentication (if not logged in)
   - Ask you to create a new project or select an existing one
   - Generate the `convex/_generated` folder
   - Create `.env.local` with your `NEXT_PUBLIC_CONVEX_URL`

3. **Run the development server**:
   In one terminal:
   ```bash
   npx convex dev
   ```
   In another terminal:
   ```bash
   npm run dev:next
   ```

   Or use the combined command (runs both in parallel):
   ```bash
   npm run dev
   ```

4. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features

- Add tasks
- Mark tasks as complete
- Delete tasks
- Real-time updates (powered by Convex)

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Convex (serverless database & functions)

## Deployment

To deploy your Convex backend and build the Next.js app:

```bash
npm run build
```

This runs `convex deploy` followed by `next build`.
