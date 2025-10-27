# Image Attachments Guide - Tambo AI

## Overview

The Tambo documentation describes how to implement image attachment functionality in message threads. Users can add images through multiple input methods for flexible interaction.

## Built-in Component Approach

The `MessageInput` component provides pre-built image handling. According to the docs: "The `MessageInput` component provides built-in image attachment functionality."

Key sub-components include:
- `MessageInputStagedImages` - displays attached images
- `MessageInputFileButton` - triggers file selection
- `MessageInputTextarea` - text input field
- `MessageInputSubmitButton` - sends messages
- `MessageInputToolbar` - organizes buttons

## Input Methods Supported

Users can attach images via three approaches:

1. **File picker** - Click the button to browse and select images
2. **Drag & drop** - Direct placement onto the input area
3. **Clipboard paste** - Keyboard shortcuts (Ctrl+V or Cmd+V)

## Custom Implementation

For advanced use cases, the `useMessageImages` hook enables custom image management with methods for:
- `addImages()` - Process file uploads
- `removeImage()` - Delete specific attachments
- `clearImages()` - Remove all attachments
- `images` - Access current image data including `id`, `dataUrl`, and `name`

## Important Constraint

The system enforces strict file validation: only image files are accepted, with non-image files automatically rejected with an error message.
