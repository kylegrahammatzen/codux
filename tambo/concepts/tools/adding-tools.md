# Adding Tools to Tambo - Complete Guide

## Overview

Tambo allows you to extend its capabilities by registering custom tools. These are asynchronous functions that take a single argument and return a single value, enabling integration with external APIs and custom business logic.

## Implementation Steps

### 1. Define Your Tool Function

Create an async function that performs your desired operation. Here's the weather example from the documentation:

```typescript
const getWeather = async (city: string) => {
  try {
    const weather = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}`
    );
    return weather.json();
  } catch (error) {
    throw new Error(`Failed to fetch weather for ${city}`);
  }
};
```

### 2. Create a TamboTool Definition

Define your tool with metadata and schema validation using Zod:

```typescript
export const tools: TamboTool[] = [
  {
    name: "get_weather",
    description: "Fetch current weather information for a specified city",
    tool: getWeather,
    toolSchema: z
      .function()
      .args(z.string().describe("The city to fetch weather for"))
      .returns(
        z.object({
          location: z.object({
            name: z.string(),
          }),
        })
      ),
  },
];
```

### 3. Register Tools with TamboProvider

Pass your tools array to the TamboProvider component:

```typescript
<TamboProvider tools={tools}>
  <App />
</TamboProvider>
```

## Result

Once registered, Tambo can automatically invoke these tools when responding to user messages, enabling conversational access to external functionality.
