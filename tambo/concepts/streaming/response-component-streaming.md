# Response Component Streaming Guide

## Overview

The Tambo documentation explains that "when you `message.renderedComponent` is called, it will return a component and update props as values stream in."

## How It Works

Components within the provider receive updates through the `thread.messages` array, which gets modified with the `renderedComponent` property. This allows real-time prop updates as data arrives.

## Benefits

The approach offers several advantages:
- Immediate visual feedback as content generates
- Better perceived performance for users
- Progressive content disclosure in logical sequence
- Sustained user engagement through dynamic updates

## Prop Streaming Order

A critical principle: props stream according to their schema definition sequence. Define important properties first. For example:

**Effective approach:**
```tsx
const ArticleSchema = z.object({
  title: z.string(),      // Streams first
  content: z.string(),    // Streams second
  author: z.string(),     // Streams third
});
```

**Ineffective approach:**
```tsx
const ArticleSchema = z.object({
  content: z.string(),    // Streams first
  title: z.string(),      // Streams second
});
```

## Handling Undefined Props

Since components render before all data arrives, they must manage `undefined` values gracefully.

### Strategy 1: Default Values
```tsx
const ArticleCard = ({
  title = "Loading title...",
  content = "Loading content...",
  author = "Loading author...",
}) => (
  <div className="article-card">
    <h2>{title}</h2>
    <p>{content}</p>
    <span>By {author}</span>
  </div>
);
```

### Strategy 2: Conditional Rendering
```tsx
const WeatherWidget = ({ temperature, condition, humidity }) => (
  <div className="weather-widget">
    <div>{temperature !== undefined ? `${temperature}°C` : "Loading..."}</div>
    <div>{condition || "Loading condition..."}</div>
    <div>{humidity !== undefined ? `${humidity}%` : "Loading..."}</div>
  </div>
);
```

**Important:** For components with internal state (forms, charts, complex UI), employ `useEffect` or the Stream Status Provider to manage state updates correctly.
