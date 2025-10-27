# Guide to Sending Messages in Tambo AI

## Primary Method: useTamboThreadInput Hook

The recommended approach uses the `useTamboThreadInput` hook to manage message state and submission:

```tsx
import { useTamboThreadInput } from "@tambo-ai/react";

const { value, setValue, submit } = useTamboThreadInput();
```

This hook provides three key utilities:
- **value**: Current message text
- **setValue**: Updates the message content
- **submit**: Sends the message with optional parameters

### Basic Message Submission

```tsx
setValue("What is the weather like today?");

await submit({
  streamResponse: true, // Recommended for real-time responses
});
```

### Handling States

Monitor request progress with built-in state indicators:

```tsx
if (isPending) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error.message}</div>;
}
```

## Alternative: sendThreadMessage Function

For scenarios where you need direct control, use the alternative method:

```tsx
const { sendThreadMessage } = useTamboThread();

await sendThreadMessage("Your message", {
  streamResponse: true,
});
```

## Adding Context to Messages

Enhance responses by including relevant context alongside user messages. This proves especially valuable when providing background information the model should consider.

### With useTamboThreadInput

```tsx
await submit({
  streamResponse: true,
  additionalContext: {
    pageInfo: { url: "/weather" },
    location: "San Francisco",
    units: "fahrenheit",
  },
});
```

### With sendThreadMessage

```tsx
await sendThreadMessage("Your question", {
  streamResponse: true,
  additionalContext: {
    pageInfo: { url: "/weather" },
    location: "San Francisco",
    units: "fahrenheit",
  },
});
```

## Context Helpers

Tambo supports automatic context injection through helper functions that resolve at runtime. Configure them either globally via `TamboProvider` or locally with `TamboContextHelpersProvider`.

**Available prebuilt helpers:**
- `currentTimeContextHelper`: Provides current timestamp
- `currentPageContextHelper`: Returns page URL and title information

Custom helpers can be registered at multiple levels, with the most recently mounted configuration taking precedence during its active state.

### Merged Context Example

When combining manual context with helper results:

```json
{
  "pageInfo": { "url": "/weather" },
  "location": "San Francisco",
  "units": "fahrenheit",
  "userTime": { "timestamp": "2025-01-15T20:30:00.000Z" }
}
```
