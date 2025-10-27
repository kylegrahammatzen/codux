# Initial Messages Guide for Tambo AI

## Overview

The Initial Messages feature in Tambo enables developers to establish a "conversation state" when creating new threads. This allows you to provide system instructions, context, or welcome messages at the beginning of every conversation.

## Basic Implementation

To use initial messages, define a `TamboThreadMessage` array and pass it to the `TamboProvider`:

```tsx
const initialMessages: TamboThreadMessage[] = [
  {
    id: "system-message",
    role: "system",
    content: [
      {
        type: "text",
        text: "You are a helpful assistant specialized in customer support.",
      },
    ],
    createdAt: new Date().toISOString(),
    componentState: {},
  },
  {
    id: "welcome-message",
    role: "assistant",
    content: [{ type: "text", text: "Hello! How can I help you today?" }],
    createdAt: new Date().toISOString(),
    componentState: {},
  },
];

<TamboProvider
  tamboUrl="https://api.tambo.ai"
  apiKey="your-api-key"
  initialMessages={initialMessages}
>
  <YourChatComponent />
</TamboProvider>
```

## Adding Components to Messages

You can include UI components within initial messages:

```tsx
const initialMessagesWithComponent: TamboThreadMessage[] = [
  {
    id: "welcome-component",
    role: "assistant",
    content: [{ type: "text", text: "Welcome! Here's a quick overview:" }],
    createdAt: new Date().toISOString(),
    componentState: {},
    component: {
      componentName: "WelcomeCard",
      props: {
        title: "Welcome to Support",
        description: "I can help you with your questions.",
      },
    },
  },
];
```

## Key Behaviors

**New Threads Only**: Initial messages apply exclusively when creating new threads (when `threadId` is undefined). They integrate into the conversation context sent to the AI model.

**Existing Threads**: These messages are not retroactively added to established threads.

**Validation Requirements**: The API verifies that each message includes valid content and role (system, user, or assistant), text content parts contain the required text property, and content arrays are non-empty.

## Integration with Custom Instructions

Initial messages work alongside custom instructions:
- **Custom Instructions**: Set via dashboard, applied project-wide
- **Initial Messages**: Set programmatically, applied per-thread creation

Both are sent to the AI model, with custom instructions typically processed first.

## Error Handling

Invalid messages trigger descriptive errors indicating the specific validation failure, including message index, role validity, and content requirements.

## Use Case Examples

**Customer Support**: Configure the assistant as a support agent requesting customer order numbers for issue resolution.

**Educational Context**: Set up an assistant that encourages learning, asks clarifying questions, and provides step-by-step explanations.
