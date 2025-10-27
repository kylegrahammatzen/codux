# Switching Thread Guide

## Overview

The documentation explains how to change the active thread in Tambo applications. By default, Tambo creates a new thread automatically, but developers can switch to different threads as needed.

## Core Functionality

**Getting the function:** To switch threads, you first need to access the `switchCurrentThread` function from the `useTamboThread` hook:

```tsx
const { switchCurrentThread } = useTamboThread()
```

**Switching threads:** Once you have the function, call it with a thread ID:

```tsx
switchCurrentThread(threadId)
```

## Key Behavior

According to the documentation, "The `thread` state will be updated, and anywhere you are rendering the threads list of messages will now be showing the new thread's messages!"

This means that switching threads automatically updates the UI to display the message history for the selected thread, making it easy to implement multi-conversation interfaces.

## Related Navigation

The guide connects to adjacent documentation:
- **Previous:** "Showing Responses" - how to render thread messages
- **Next:** "Tracking Response Stage" - monitoring response generation progress
