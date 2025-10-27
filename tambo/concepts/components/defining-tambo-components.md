# Defining Tambo Components - Complete Guide

## Overview

To enable Tambo to use React components in responses, you must define a `TamboComponent` for each component, specifying its purpose and expected props using Zod schemas.

## Basic Definition

The foundational approach involves:

1. **Creating a Zod schema** that describes your component's props structure
2. **Defining a TamboComponent object** with metadata and the schema
3. **Registering it with TamboProvider**

Here's the essential pattern:

```tsx
import { z } from "zod";
import { DataChart } from "@/components/DataChart";
import { TamboProvider } from "@tambo-ai/react";

export const DataChartProps = z.object({
  data: z.object({
    labels: z.array(z.string()),
    values: z.array(z.number()),
  }),
  type: z.enum(["bar", "line", "pie"]),
});

const tamboComponents: TamboComponent[] = [
  {
    component: DataChart,
    name: "DataChart",
    description: "Displays data as a chart",
    propsSchema: DataChartProps,
  },
];

<TamboProvider components={tamboComponents}>
  <App />
</TamboProvider>;
```

## Important Considerations

**Optional Fields**: "When using zod's `.optional()` on a field, tambo may not attempt to generate any value for the prop."

## Enhanced Guidance with Descriptions

Use `z.describe()` to provide AI-specific guidance for generating appropriate values:

```tsx
export const DataChartProps = z
  .object({
    data: z
      .object({
        labels: z
          .array(z.string())
          .describe("Use single words or short phrases."),
        values: z.array(z.number()).describe("Use whole numbers."),
      })
      .describe("A component for displaying data in various chart formats"),
    type: z
      .enum(["bar", "line", "pie"])
      .describe(
        "Use appropriate chart type for data. Pie charts only with <5 values.",
      ),
  })
  .describe("A component for displaying data in various chart formats");
```

## Result

With proper component definitions, "Tambo can respond with the appropriate component filled with relevant data" when users request information related to your components.
