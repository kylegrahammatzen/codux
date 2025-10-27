# Tambo AI Integration Guide

## Overview
The integration guide walks developers through adding Tambo's AI capabilities to existing React applications, with NextJs as the primary example.

## Three-Step Integration Process

**Step 1: Installation**
Execute `npx tambo full-send` to initialize Tambo in your project. This command:
- Sets up Tambo and provisions an API key
- Installs pre-built components connected to the tambo-ai library
- Demonstrates wrapping your application with `<TamboProvider>`

Alternatively, run `npx tambo init` for manual setup focusing only on API key configuration.

**Step 2: Provider Setup**
Wrap your application root with the TamboProvider component. The documentation provides this template:

```tsx
"use client";
import { TamboProvider } from "@tambo-ai/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TamboProvider apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}>
      {children}
    </TamboProvider>
  );
}
```

Store your API key in a `.env.local` file as `NEXT_PUBLIC_TAMBO_API_KEY=your_key_here`. This file should remain uncommitted due to its sensitive nature.

Note: The provider operates exclusively in browser environments. Use `"use client"` directives in Next.js to ensure browser-side rendering.

**Step 3: Component Integration**
Import and use the `<MessageThreadCollapsible>` component to provide a complete chat interface:

```tsx
"use client";
import { MessageThreadCollapsible } from "../source/components/message-thread-collapsible";

export default function Home() {
  return (
    <main>
      <MessageThreadCollapsible />
    </main>
  );
}
```

Run your development server with `npm run dev` to see the functional chat interface.
