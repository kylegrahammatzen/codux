# Tambo AI Interactable Components Guide

## Overview

Tambo's interactable components allow developers to place pre-positioned UI elements that users can modify through natural language. Unlike auto-generated components, these maintain their position while becoming dynamically updatable.

## Creating Interactable Components

The `withInteractable` wrapper transforms standard React components into AI-aware elements. You supply three parameters: the component itself, a descriptive name, and a Zod schema defining modifiable properties.

```tsx
import { withInteractable } from "@tambo-ai/react";
import { z } from "zod";

function Note({ title, content, color = "white" }) {
  return (
    <div className={`note note-${color}`}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

const InteractableNote = withInteractable(Note, {
  componentName: "Note",
  description: "A simple note component displaying title and content",
  propsSchema: z.object({
    title: z.string(),
    content: z.string(),
    color: z.enum(["white", "yellow", "blue", "green"]).optional(),
  }),
});
```

## Configuration Structure

The `InteractableConfig` interface requires:
- **componentName**: Identifier for Tambo reference
- **description**: Functional explanation of the component
- **propsSchema**: Zod schema validating updatable properties

## Integration Requirements

Wrap your application with `TamboProvider` to enable interactable functionality:

```tsx
<TamboProvider>
  <InteractableNote title="Welcome" color="yellow" />
  <InteractableCounter count={42} label="Items" />
</TamboProvider>
```

## Automatic Context Awareness

When using `TamboInteractableProvider`, the AI automatically receives information about available components and their current states—"no additional setup required."

## Customizing Context Delivery

### Global Disabling

```tsx
<TamboProvider contextHelpers={{ interactables: () => null }}>
  {/* Components function without context exposure */}
</TamboProvider>
```

### Selective Enablement

Re-enable context for specific sections using `useTamboContextHelpers()` and `useCurrentInteractablesSnapshot()` hooks to override global settings.

### Filtered Display

Filter components by type to control what information reaches the AI:

```tsx
const allowedTypes = ["Note", "Counter"];
const filteredComponents = snapshot.filter(c =>
  allowedTypes.includes(c.name)
);
```

## Update Mechanism

Updates employ property replacement semantics. Providing `{ count: 5 }` modifies only that property. However, nested objects replace entirely—omitting nested keys leaves them undefined. Best practice: supply complete nested structures during updates.

## Auto-Registered Tools

Tambo automatically creates these tools when interactables exist:
- `get_all_interactable_components`
- `get_interactable_component_by_id`
- `remove_interactable_component`
- `update_interactable_component_<id>`

## Snapshot Hook

`useCurrentInteractablesSnapshot()` provides safe read-access to current component states without mutation risks:

```tsx
const snapshot = useCurrentInteractablesSnapshot();
snapshot.map(c => ({ id: c.id, name: c.name, props: c.props }))
```

## Update Response States

Operations return status strings indicating success or failure, helping developers track modification outcomes.
