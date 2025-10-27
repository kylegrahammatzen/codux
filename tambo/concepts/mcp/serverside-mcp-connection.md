# Server-Side MCP Connection Guide

## Overview

Server-side MCP integration allows you to configure MCP servers at the project level through the Tambo dashboard. This approach is recommended because it "generally gives the best end-user performance and allows you to use OAuth-based authentication."

## When to Use Server-Side MCP

This method works best when:

- MCP servers need to be shared across all users of your application
- The MCP server is accessible from your Tambo backend
- You need to use an MCP server that requires authentication

## Configuration Steps

To set up server-side MCP, follow these steps:

1. Navigate to your project dashboard at tambo.co/dashboard
2. Click on your project
3. Find the "MCP Servers" section
4. Click "Add MCP Server"
5. Enter the server URL and server type (StreamableHTTP or SSE), then save
6. Tambo automatically detects authentication requirements and displays a "Begin Authentication" button if needed—click to complete the process

## After Configuration

Once configured, "the MCP servers will be available to all users of your project without any additional client-side setup."

## Authentication Note

**Important limitation**: Currently, when an MCP server is authenticated, that authenticated user is shared across all project users. Per-user authentication support is planned for the future.

## Custom Headers

For servers without OAuth support, you can add custom headers to the MCP server configuration (for example, `X-Api-Key`).

## How It Works

Server-side MCP follows this flow:
- Browser sends user message to Tambo
- Tambo transforms the message into a tool call
- Tool call sent to MCP server
- MCP returns data to Tambo
- Tambo selects appropriate component and formats data as props
- Component returned to browser for rendering
