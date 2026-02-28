# FulgensUI

A modern UI Component Library made with React and PandaCSS for reusability in frontend projects.

## 🏗️ Monorepo Structure

This project uses Turborepo to manage a monorepo with the following packages:

```
FulgensUI/
├── packages/
│   ├── core/          # Main UI component library (Vite + React + PandaCSS + Storybook)
│   └── docsite/       # Documentation site (Docusaurus)
├── .github/
│   └── workflows/     # GitHub Actions CI/CD pipelines
├── .gitlab-ci.yml     # GitLab CI/CD pipeline
└── turbo.json         # Turborepo configuration
```

## 📦 Packages

### Core (`@fulgensui/core`)

The main UI component library built with:
- **Vite** - Lightning-fast build tool
- **React** - UI library
- **PandaCSS** - Zero-runtime CSS-in-JS
- **Storybook** - Component development and documentation

### Docsite (`@fulgensui/docsite`)

Documentation website built with:
- **Docusaurus** - Static site generator
- Imports and showcases components from the core package
- Deployed to GitHub Pages

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.8.2

### Installation

```bash
# Clone the repository
git clone https://github.com/0xbaitan/FulgensUI.git
cd FulgensUI

# Install dependencies
npm install
```

### Development

```bash
# Run all packages in dev mode
npm run dev

# Run specific package
cd packages/core && npm run dev        # Vite dev server
cd packages/core && npm run storybook  # Storybook
cd packages/docsite && npm run dev     # Docusaurus
```

### Building

```bash
# Build all packages
npm run build

# Build specific package
cd packages/core && npm run build
cd packages/docsite && npm run build
```

## 🔄 CI/CD Pipelines

### GitLab CI/CD

The project includes a `.gitlab-ci.yml` pipeline with:

1. **Build Core** - Builds the UI component library
2. **Build Storybook** - Generates Storybook static site
3. **Build Docsite** - Builds the documentation site
4. **Deploy Docsite** - Deploys to GitHub Pages (manual trigger)
5. **Package Core** - Creates distributable artifacts

### GitHub Actions

Two GitHub Actions workflows are included:

1. **Deploy Docsite** (`.github/workflows/deploy-docsite.yml`)
   - Triggers on push to `main` branch
   - Builds and deploys docsite to GitHub Pages

2. **Build Core** (`.github/workflows/build-core.yml`)
   - Triggers on push and pull requests
   - Builds core components and Storybook
   - Uploads artifacts for download

## 📚 Documentation

- **Live Docs**: https://0xbaitan.github.io/FulgensUI
- **Storybook**: Run `cd packages/core && npm run storybook`

## 🛠️ Tech Stack

- **Monorepo**: Turborepo
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: PandaCSS
- **Component Dev**: Storybook
- **Documentation**: Docusaurus
- **CI/CD**: GitHub Actions + GitLab CI

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
