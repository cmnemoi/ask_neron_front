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

## Features

- Interactive chat interface with NERON (Retrieved-Augmented LLM)
- Real-time message updates

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

The project follows a Ports & Adapters (Hexagonal) architecture:

- `src/components/ports/` - Contains the interfaces defining the application boundaries
- `src/components/adapters/` - Implements the interfaces for different contexts (API, In-Memory)
- `src/components/services/` - Core business logic implementation
