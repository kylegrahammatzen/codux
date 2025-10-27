# Tracking Response Stage in Tambo

## Overview

The `generationStage` property from `useTamboThread()` lets you display context-specific feedback during AI response generation rather than generic loading states.

## Generation Stages Enum

Tambo provides eight distinct stages:

- **IDLE**: Initial state, thread is inactive
- **CHOOSING_COMPONENT**: AI selects the appropriate component based on user input
- **FETCHING_CONTEXT**: Additional data is retrieved to populate the component
- **HYDRATING_COMPONENT**: Component receives and processes its data
- **STREAMING_RESPONSE**: Response text streams to the user
- **COMPLETE**: Generation finished successfully
- **ERROR**: An error occurred during processing
- **CANCELLED**: User cancelled the latest generation

## Basic Implementation

```typescript
const { generationStage } = useTamboThread();

if (generationStage === GenerationStage.CHOOSING_COMPONENT) {
  return <div>Tambo is choosing the best component to use...</div>;
}

if (generationStage === GenerationStage.FETCHING_CONTEXT) {
  return <div>Tambo is fetching additional data...</div>;
}
```

## Using Status Message

Instead of manually handling each stage, use the automatically-generated `statusMessage` property, which provides dynamic, context-aware descriptions. For instance, if a user asks about Tokyo weather, the message might read: "Looking for a component to help with your request about the weather in Tokyo."

Pair this with the `isProcessing` helper, which returns true for CHOOSING_COMPONENT, FETCHING_CONTEXT, HYDRATING_COMPONENT, or STREAMING_RESPONSE states:

```typescript
const { statusMessage, isProcessing } = useTamboThread();

if (isProcessing) {
  return <div>{statusMessage}</div>;
}
```

This approach simplifies UI logic while keeping users informed throughout the generation process.
