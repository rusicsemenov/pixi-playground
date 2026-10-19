# PixiJS Playground

A playground for trying out [PixiJS v8](https://pixijs.com/) with React through [`@pixi/react`](https://github.com/pixijs/pixi-react).

It renders a top-down warehouse: a grid of shelves you can click, reach trucks driving back and forth, and a camera you move with the keyboard.

## Stack

- **PixiJS 8** and **@pixi/react 8**: rendering and JSX bindings (`<pixiSprite>`, `<pixiContainer>`, …)
- **React 19** and **TypeScript 6**
- **Vite 8**: dev server and build
- **ESLint** and **Prettier**
- **pnpm**: package manager

## Getting started

```bash
pnpm install
pnpm dev        # start the dev server
```

Other scripts:

```bash
pnpm build      # type-check and build for production
pnpm preview    # serve the production build locally
pnpm lint       # run ESLint
```

## Controls

| Input              | Action                                   |
| ------------------ | ---------------------------------------- |
| `W` `A` `S` `D`    | Move the camera around the warehouse     |
| Click a shelf      | Cycle its state (how full it is)         |
| `i` button         | Show the controls help panel             |

## Project structure

```
src/
  main.tsx              Entry point: registers Pixi classes with extend(), preloads assets, mounts the app
  App.tsx               Root component: the Pixi canvas plus the info button
  Pixi.tsx              The scene: <Application>, the shelf grid, and the trucks
  Camera.tsx            Container that pans with WASD, clamped to the content bounds (plus overscroll)
  Shelf.tsx             Clickable sprite that cycles through texture states
  ReachTruck.tsx        Truck that drives left and right within a range, with frame animation
  IconSprite.tsx        Static sprite read from the asset cache
  ExhibitionStand.tsx   Splits one texture into frames with Rectangle (experiment)
  ChristmasTree.tsx     Textures generated at runtime with renderer.generateTexture (experiment)
  Bar3D.tsx, iso.ts     Pseudo-3D bars drawn with Graphics, plus a color-shading helper
  InfoButton.tsx        Controls help overlay (HTML, outside the canvas)
  assets/               Sprites (.webp) and lists of the texture states for each object
prompts/                Prompts and a style guide for AI-generated sprites
```

## Notes

- **Assets are preloaded** in `main.tsx` with `Assets.load()` before React mounts, so components read textures synchronously with `Assets.get()`. When you add a new sprite, add it to that preload list too.
- **Pixi classes are registered once** with `extend()` in `main.tsx`. Register any new Pixi class there before you use it as a JSX tag.
- **StrictMode is off on purpose**: its double mount in dev re-creates `<Application>` asynchronously, and `app.renderer` is briefly `null`, which breaks runtime texture generation.
- **Sprites follow a shared art style**: a steep top-down view (about 65–70° camera tilt), not true isometric. See `prompts/00-style-guide.md` before you generate new assets.
