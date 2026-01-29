# Copilot Instructions for FullStack Open Codebase

## Project Overview

This is a learning repository for Full Stack Open course exercises. It contains multiple React projects using modern tooling (Vite, React 19, ES modules) organized by course part.

**Key Structure:**
- `part0/` - Diagrams and notes (markdown files)
- `part1/` - React fundamentals exercises (courseinfo, Practice, unicafe projects)
- Each React project is a standalone Vite application with its own `package.json`

## Development Workflow

All React projects follow the **Vite + React** development pattern. Each has identical npm scripts:

```bash
npm run dev       # Start dev server (Vite default: http://localhost:5173)
npm run build     # Production build (output: dist/)
npm run lint      # ESLint validation
npm run preview   # Preview production build locally
```

**Working Directory:** Must `cd` into specific project directories (e.g., `part1/courseinfo/`) before running npm commands.

## React Component Architecture

**Patterns observed:**
- Small, focused functional components (e.g., `Header`, `Content`, `Part`, `Button`)
- Props-based data passing and callbacks for communication
- Fragment `<>...</>` frequently used for grouping without wrapper divs
- `useState` for simple state management (no Redux/context yet)

**Example from courseinfo:**
```jsx
const Header = (props) => <h1>{props.course}</h1>
const Part = ({name, number}) => <div>{name} {number}</div>
```

**Example from Practice:**
```jsx
const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)
```

Component naming: PascalCase for components, arrow functions preferred for lightweight components.

## Code Quality Standards

**ESLint Configuration** (`eslint.config.js`):
- Extends: `@eslint/js`, `react-hooks`, `react-refresh`
- Custom rule: `no-unused-vars` ignores PascalCase variables (component names)
- Ignore patterns: `dist/` directory

**Key constraints:**
- React 19 with JSX support
- ES modules only (`"type": "module"` in package.json)
- No HTML imports or global CSS files in development

## Vite Configuration Specifics

- Target: Modern browsers (ES2020+)
- React plugin enabled for JSX transform
- SPA with single `index.html` entry point
- Assets in `public/` directory (copied to dist root)

## Common Tasks

**Adding a new component:**
1. Create component in `src/`
2. Use functional component syntax with props
3. Re-export from `App.jsx` if needed
4. Run `npm run lint` to validate naming/rules

**Debugging:** 
- Dev server shows console logs from components
- React DevTools browser extension recommended for component inspection

**Build issues:**
- Clear `node_modules` and reinstall if dependencies don't resolve
- Verify Vite version compatibility with React 19

## Important Notes

- This is a **learning/exercise repository**, not production code
- Multiple independent projects in `part1/` don't share dependencies
- `.gitignore` expected to exclude `node_modules/`, `dist/`, `.env`
- No backend integration yet (part 0-1 scope)
