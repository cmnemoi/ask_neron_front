# Ask NERON App

[![Continuous Integration](https://github.com/cmnemoi/ask_neron_front/actions/workflows/ci.yml/badge.svg)](https://github.com/cmnemoi/ask_neron_front/actions/workflows/ci.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/49ec8f74-e14b-4a9d-ac0e-a3947e403301/deploy-status)](https://askneron.netlify.app/)

A web application for interacting with NERON, a RAG-based chatbot which can answer questions about [eMush](https://emush.eternaltwin.org/) from curated documents.

Stack:

- [Vue 3](https://vuejs.org/) for the frontend framework
- [Vitest](https://vitest.dev/) for testing
- [Netlify](https://www.netlify.com/) for deployment at https://askneron.netlify.app/

# Contributing

## Prerequisites

- [Node.js LTS](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [make](https://www.gnu.org/software/make/)

## Installation

```bash
# Clone the repository
git clone https://github.com/cmnemoi/ask_neron_front.git
cd ask_neron_front

# Install dependencies
npm install
```

## Usage

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Development

- Lint code with `make lint`
- Run tests with `make test`
- Build for production with `npm run build`

# License

The source code of this repository is licensed under the [AGPL-3.0-or-later License](LICENSE).

Some Motion Twin graphic [assets](src/assets) are licensed under the [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) license.
