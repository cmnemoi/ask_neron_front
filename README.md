# Ask Neron App

A Vue.js frontend application for interacting with NERON, an LLM-based chatbot. Built with Vue 3, TypeScript, and following a basic Ports & Adapters architecture pattern.

## Quick Start

1. Install dependencies:

```sh
npm install
```

2. Start the development server:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`

## Development

### Prerequisites

- Node.js (latest LTS version recommended)
- npm

### Available Commands

```sh
# Start development server with hot-reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run unit tests
npm run test:unit
# or
make test

# Type checking
npm run type-check

# Lint and fix files
npm run lint

# Format code
npm run format
```

## Architecture

The project follows a Ports & Adapters (Hexagonal) architecture with clear separation of concerns:

### Core Domain (`src/core/`)

- `ports/` - Contains the interfaces defining the application boundaries
  - `ChatPort.ts` - Interface for chat operations
  - `TranslationPort.ts` - Interface for translation operations
- `services/` - Core business logic implementation
  - `ChatService.ts` - Chat functionality implementation
  - `TranslationService.ts` - Translation functionality implementation
- `tests/` - Unit tests for core services

### Infrastructure (`src/infrastructure/`)

- `adapters/` - Implements the interfaces for different contexts
  - `ApiChatAdapter.ts` - Production chat implementation using API
  - `InMemoryChatAdapter.ts` - Test implementation for chat
  - `InMemoryTranslationAdapter.ts` - Test implementation for translations

### Presentation (`src/`)

- `components/` - Vue components
  - `ChatBot.vue` - Main chat interface component
- `translations/` - Translation files
  - `en.ts` - English translations
  - `fr.ts` - French translations
- `assets/` - Static assets (images, CSS)
