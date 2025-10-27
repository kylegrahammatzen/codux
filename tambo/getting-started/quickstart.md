# Tambo AI Quickstart Guide

## Overview

Tambo is a platform for building generative UI applications. This guide covers downloading the starter template, obtaining API credentials, and running your first application.

## Installation Steps

### 1. Download the Template

Execute this command to create a new project:

```bash
npm create tambo-app@latest my-tambo-app && cd my-tambo-app
```

This copies the template application code and installs dependencies. The source repository is available on GitHub.

### 2. Initialize Your Tambo Project

Run the initialization command:

```bash
npx tambo init
```

This process creates a new Project within Tambo's dashboard, generates an API key for authentication, and automatically configures it in your project.

### 3. Start Development Server

Launch the application with:

```bash
npm run dev
```

Access the app at `localhost:3000` and begin sending messages to Tambo.

## Customization Examples

### Adding a Custom Component

Create `src/components/recipe-card.tsx` with interactive recipe functionality including ingredient scaling and timing information. Register it in `src/lib/tambo.ts` by adding an entry to the components array with proper TypeScript schema validation using Zod.

### Adding a Tool

Extend Tambo's capabilities by creating a `get-available-ingredients` tool that returns ingredient data. This enables the AI to make informed suggestions based on actual inventory rather than generating fictional data.

## Key Concepts

The template demonstrates how to register components and tools with Tambo, which are then passed to the `TamboProvider` for availability within your AI chat interface.
