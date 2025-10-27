# Guide to Showing Responses in Tambo

## Overview

The documentation explains how to render thread messages and display Tambo's responses using the `useTamboThread` hook.

## Basic Message Display

To show messages from a thread, iterate through the thread's messages array. Messages can contain text and rendered components:

```tsx
const { thread } = useTamboThread()

thread.messages.map((message) => (
  <div>
    <p>Sent by: {message.role}</p>
    <p>message text: {message.content[0]?.text}</p>
    <p>component: {message.renderedComponent}</p>
  </div>
))
```

## Canvas-Style UI Pattern

For interfaces displaying only the most recent component, traverse the messages array in reverse order to locate the latest rendered component:

```tsx
const latestComponent = thread.messages
  .slice()
  .reverse()
  .find((message) => message.renderedComponent)?.renderedComponent;

<div>
  {latestComponent}
</div>
```

## Use Cases

This approach suits interactive dashboards, canvas-based interfaces, or applications where you need "the most up-to-date component state without displaying the full conversation history."

The key benefit is that Tambo automatically maintains thread state, so you only need to access and render the messages appropriately for your UI pattern.
