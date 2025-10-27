# Response Text Streaming Guide - Tambo AI

## Overview

According to the documentation, "When you send a message to Tambo, Tambo will handle updating the thread's final message as data streams in rather than waiting for the entire response to complete."

This feature enables real-time message updates, allowing users to see responses being generated incrementally rather than waiting for completion.

## Implementation

### Sending Messages

There are two primary methods to send messages that trigger streaming:

**Method 1: Using `useTambo` hook**
```tsx
import { useTambo } from "@tambo-ai/react";

const { sendThreadMessage } = useTambo();
await sendThreadMessage(inputValue);
```

**Method 2: Using `useTamboThreadInput` hook**
```tsx
const { submit } = useTamboThreadInput();
await submit();
```

### Displaying Streamed Messages

Display thread messages normally through the standard rendering pattern:

```tsx
import { useTambo } from "@tambo-ai/react";

const { thread } = useTambo();

<div>
  {thread.messages.map((message, index) => (
    <div key={index}>
      <div>{message.content[0].text}</div>
    </div>
  ))}
</div>
```

## Key Points

The streaming mechanism automatically handles message updates as data arrives, eliminating the need for manual state management or custom effect hooks. This approach provides a seamless user experience with progressive content rendering.
