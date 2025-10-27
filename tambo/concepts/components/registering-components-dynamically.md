# Dynamic Registration Guide for Tambo Components

## Overview

Tambo provides the `useTamboRegistry()` hook to enable runtime component registration. This approach allows developers to register components based on conditions, user interactions, or other dynamic factors rather than statically at build time.

## Key Concept

The `registerComponent` function from `useTamboRegistry()` allows you to add components to the registry during component lifecycle, rather than during initial setup.

## Implementation Example

Here's the core pattern demonstrated in the documentation:

```tsx
import { useEffect } from "react";
import { useTamboRegistry } from "@tambo-ai/react";
import { z } from "zod";
import { WeatherDisplay } from "@/components/WeatherDisplay";

// Define Zod schemas for component props
const WeatherDisplayProps = z.object({
  city: z.string(),
  temperature: z.number(),
  condition: z.string(),
});

export default function Page() {
  const { registerComponent } = useTamboRegistry();

  useEffect(() => {
    if(someCondition) {
      registerComponent({
        name: "WeatherDisplay",
        description: "A display of the weather in a city.",
        component: WeatherDisplay,
        propsSchema: WeatherDisplayProps,
      })
    }
  }, [registerComponent]);

  return (
    // Your page content
  );
}
```

## Required Configuration

Each component registration requires:
- **name**: Unique identifier for the component
- **description**: Text explaining the component's purpose
- **component**: The actual React component
- **propsSchema**: Zod schema validating component props

This approach integrates seamlessly with conditional logic and user-driven application flows.
