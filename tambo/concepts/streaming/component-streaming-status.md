# Component Streaming Status Guide

## Overview

The `useTamboStreamStatus` hook enables developers to monitor both overall and granular per-prop streaming progress. This addresses a critical UX challenge: without detailed tracking, applications must either "show nothing until ready (poor UX) or display everything with defaults (potentially confusing)."

## Core Concepts

**Global Stream Status** tracks four key states:
- `isPending`: No data received yet
- `isStreaming`: Active transmission occurring
- `isSuccess`: All props completed successfully
- `isError`: Fatal error encountered

**Per-Prop Status** monitors individual properties:
- `isPending`: No tokens for this specific prop
- `isStreaming`: Partial content still updating
- `isSuccess`: Streaming finished successfully
- `error`: Property-specific error object

## Usage Patterns

### Basic Implementation
Monitor completion before rendering:

```tsx
const { streamStatus, propStatus } = useTamboStreamStatus();
if (!streamStatus.isSuccess) return <Spinner />;
```

### Progressive Display
Render props individually as they arrive:

```tsx
{propStatus["title"]?.isSuccess && <h3>{title}</h3>}
{propStatus["data"]?.isStreaming && <Spinner />}
```

### Advanced Patterns
Group related props and handle errors gracefully:

```tsx
if (propStatus["title"]?.isSuccess && propStatus["author"]?.isSuccess) {
  // Render header together
}
if (propStatus["tags"]?.error) {
  // Show error state
}
```

## Best Practices

**Use when:**
- Props have different loading durations
- Progressive rendering improves perceived performance
- Complex UIs depend on multiple asynchronous props
- Fine-grained error handling is necessary

**Avoid when:**
- Content is simple/synchronous
- Server-side rendering is primary concern

## Integration

Works seamlessly with `TamboPropStreamProvider` for declarative state management and `useTamboStreamingProps` for automatic state synchronization.
