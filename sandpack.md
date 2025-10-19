# Sandpack Integration

## What is Sandpack?

Sandpack is a component toolkit for creating live-running code editing experiences, powered by CodeSandbox. It provides an in-browser bundler, editor, and preview that can run JavaScript/React templates with dependency support, hot reload, and file APIs without needing full containers.

## Why Sandpack?

- **Live bundling**: Real-time code execution in the browser
- **Dependency support**: Automatic npm package resolution
- **Hot module reload**: Changes reflect instantly
- **Built-in error handling**: Runtime and build errors
- **File system API**: Programmatic file management
- **CodeMirror integration**: Syntax highlighting and editing

## Core Components

### SandpackProvider
Main context provider that manages all Sandpack state. Must wrap all Sandpack components.

```tsx
<SandpackProvider
  template="react"
  files={{
    "/App.tsx": { code: "export default function App() {}" },
    "/package.json": { code: '{"dependencies": {}}' }
  }}
>
  {/* Sandpack components */}
</SandpackProvider>
```

### SandpackPreview
Renders an iframe with the live preview. Hosted by CodeSandbox.

### SandpackCodeEditor
CodeMirror-based editor with syntax highlighting. Props:
- `showLineNumbers`: Show line numbers
- `showInlineErrors`: Display errors inline
- `readOnly`: Make editor read-only

### SandpackConsole
Built-in console for viewing logs and errors.

## Key Hooks

### useSandpack()
Main hook for accessing Sandpack internals. Provides:
- `files`: Current file state
- `activeFile`: Currently selected file
- `sandpack`: Full context object
- Methods like `closeFile`, `openFile`, `resetFile`

### useActiveCode()
Provides current file's code and update callback:
```tsx
const { code, updateCode } = useActiveCode()
```

### useSandpackNavigation()
Control preview navigation:
```tsx
const { refresh } = useSandpackNavigation()
```

## File Structure

Files are stored as a record with file paths as keys:

```typescript
type SandpackFiles = Record<string, {
  code: string;
  hidden?: boolean;
  active?: boolean;
  readOnly?: boolean;
}>
```

Example:
```javascript
{
  "/App.tsx": {
    code: "export default function App() { return <div>Hello</div> }"
  },
  "/package.json": {
    code: '{"dependencies": {"react": "^18.0.0"}}'
  },
  "/index.tsx": {
    code: "import App from './App'\\nreactDOM.render(<App />)"
  }
}
```

## Error Handling

Sandpack provides error events for:
- Runtime errors (JavaScript errors during execution)
- Build errors (bundling/compilation failures)
- Dependency errors (package resolution issues)

Errors can be captured via hooks and displayed in custom UI.

## Our Implementation

### Architecture
```
SandpackContext (state management)
  ├── Files (paths + contents)
  ├── Active file tracking
  └── Error storage

EditorLayout
  └── PreviewPanel
      ├── Preview Mode: SandpackProvider → SandpackPreview
      └── Code Mode: CodePanel → File Tree + SandpackCodeEditor
```

### State Management
- **SandpackContext**: Central state for files, active file, and errors
- Files can be updated by AI or user
- Single source of truth for error state (accessible by LLMs)

### Code Panel Integration
- Custom file tree shows files from context
- Clicking a file sets it as active
- SandpackCodeEditor displays active file
- Empty state when no file selected

### Preview Integration
- Existing viewport controls preserved
- SandpackPreview replaces loading spinner
- Dimension controls (desktop/tablet/mobile) still functional

### Error Flow
1. Sandpack detects error
2. Error stored in SandpackContext
3. Console panel displays errors
4. AI can query context for debugging

## Resources

- Documentation: https://sandpack.codesandbox.io/
- GitHub: https://github.com/codesandbox/sandpack
- Package: @codesandbox/sandpack-react
