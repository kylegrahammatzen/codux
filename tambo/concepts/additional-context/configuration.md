# Tambo AI Context Configuration Guide

## Overview

The Tambo documentation explains that **"Context helpers are most commonly configured at the app root using `TamboProvider`"** where developers provide an object mapping context names to functions that return values.

## Basic Configuration

The recommended approach involves setting up context helpers at your application root:

```tsx
<TamboProvider
  apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
  contextHelpers={{
    userTime: currentTimeContextHelper,
    userPage: currentPageContextHelper,
  }}
>
  {children}
</TamboProvider>
```

Key points about this pattern:
- Each helper is a function returning a value, or null/undefined to skip
- Object keys become the context names sent to the model
- Helpers support both synchronous and asynchronous operations

## Scoped Configuration Alternative

For page-specific or route-specific helpers, use `TamboContextHelpersProvider` at a lower level in your component tree:

```tsx
<TamboContextHelpersProvider
  contextHelpers={{
    userPage: currentPageContextHelper,
  }}
>
  {/* Components that send messages */}
</TamboContextHelpersProvider>
```

This approach allows experimentation without modifying root configuration.

## Message Context Structure

When helpers resolve, they merge into a structured context object keyed by helper names. For example, custom helpers like async session data combine with prebuilt helpers like time information into a single context object sent with user messages.
