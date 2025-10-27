# Client-side MCP Connection Guide

## Overview

Client-side MCP integration enables applications to connect with MCP servers accessible through the end user's browser, particularly useful for local MCP server implementations.

## Use Cases

This approach works well for:
- Local MCP servers operating on user machines
- MCP servers where browser authentication already exists
- Internal services behind firewalls visible only from the browser

**Important Limitation:** "There is currently no support for authenticated MCP servers when using the client-side MCP provider."

## Implementation

Use the `TamboMcpProvider` component within your `TamboProvider`:

```tsx
import { TamboProvider } from "@tambo-ai/react";
import { TamboMcpProvider, MCPTransport } from "@tambo-ai/react/mcp";

function MyApp() {
  return (
    <TamboProvider components={...}>
      <TamboMcpProvider
        mcpServers={[
          {
            url: "http://localhost:8123/",
            customHeaders: {}, // Optional: add auth headers
            transport: MCPTransport.HTTP, // defaults to SSE
          },
        ]}
      >
        {/* Your application components */}
      </TamboMcpProvider>
    </TamboProvider>
  );
}
```

## How It Works

The `TamboMcpProvider` establishes connections to specified MCP servers and exposes their tools to Tambo agents.

**Workflow:**
1. User submits request to Tambo
2. Tambo converts request into tool call
3. Browser executes tool against MCP server
4. MCP returns results to browser
5. Browser passes data back to Tambo
6. Tambo selects appropriate component and formats response
