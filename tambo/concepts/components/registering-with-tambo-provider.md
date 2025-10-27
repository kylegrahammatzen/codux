# Registering Components with TamboProvider - Guide

## Overview

The `@tambo-ai/react` package offers a straightforward method for making React components available to Tambo through the `TamboProvider` component, which handles static component registration.

## Core Concept

"You can pass a list of components directly to the `TamboProvider` component. All components will be visible to Tambo" and related utilities within your application tree.

## Implementation Steps

### 1. Define Component Schemas

Use Zod to create validation schemas for your component props:

```typescript
import { z } from "zod";

const WeatherDisplayProps = z.object({
  city: z.string(),
  temperature: z.number(),
  condition: z.string(),
});

const UserProfileProps = z.object({
  name: z.string(),
  email: z.string(),
  avatar: z.string().optional(),
});
```

### 2. Create Component Configuration

Build an array containing metadata for each component:

```typescript
const components = [
  {
    name: "WeatherDisplay",
    description: "A display of the weather in a city",
    component: WeatherDisplay,
    propsSchema: WeatherDisplayProps,
  },
  {
    name: "UserProfile",
    description: "A user profile card with avatar and basic information",
    component: UserProfile,
    propsSchema: UserProfileProps,
  },
];
```

### 3. Wrap Application with Provider

```typescript
<TamboProvider components={components}>
  <App />
</TamboProvider>
```

## Key Requirements

Each component configuration needs:
- **name**: Unique identifier for the component
- **description**: Explanation of component purpose
- **component**: The actual React component
- **propsSchema**: Zod schema validating component properties

This static registration approach makes components discoverable throughout your application's Tambo-enabled sections.
