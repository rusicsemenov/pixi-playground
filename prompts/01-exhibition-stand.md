# Exhibition booth / trade-show stand

Стиль отличается от `00-style-guide.md` (там пиксель-арт game-эстетика для
склада/офиса) — стенд должен выглядеть как профессиональная 3D-визуализация
выставочного оборудования (референс: глянцевые рендеры каталогов
модульных стендов), а не как деревянный игровой ассет.

⚠️ Из-за смены стиля этот объект визуально не будет сочетаться "из коробки"
с pixel-art складом/офисом в одной сцене — если нужна единая сцена, либо
переводить все три концепции в этот реалистичный рендер-стиль, либо оставить
стенд отдельной "фотореалистичной вставкой" (например, как карточка/превью,
а не часть общей pixel-art комнаты).

## Базовый промпт

```
Orthographic (parallel-projection) 3D render of a modular trade-show
exhibition booth/stand, like an isometric CAD/architectural visualization
with photorealistic materials and lighting — soft studio lighting, glossy
reflective floor, clean grey studio background gradient — NOT pixel art,
NOT a cute game asset, NOT wooden or hand-drawn, and NOT a realistic camera
photo (no lens perspective/vanishing point).

Subject: a modern exhibition booth structure — brushed aluminum frame poles,
large back-lit graphic panels with a bold abstract colorful pattern
(geometric shapes, gradients, diagonal stripes — no readable text, no real
brand names, just an abstract generic graphic design), a small matching
back-lit counter/reception desk positioned beside the main structure with
its own glossy top and abstract graphic wrap.

Materials: brushed aluminum/silver structural frame, semi-glossy printed
fabric or acrylic panels with soft internal LED backlighting glowing along
the panel edges, glossy reflective floor with soft mirror-like reflections.

CRITICAL — the booth itself does not rotate, only the camera tilts down:
the booth's front face must point directly at the viewer, perfectly square
and perpendicular to the camera, as if placed flat against a wall facing you
head-on. The ONLY thing that changes is the camera's downward tilt —
approximately 65-70° down from eye-level, a very steep high-angle shot
(close to bird's-eye but not fully vertical) looking down into the open
booth from almost directly above, revealing almost all of the floor and the
tops of the furniture clearly while the back graphic wall stays visible but
strongly foreshortened. There must be ZERO rotation of the booth around the
vertical axis (no yaw). Do NOT
turn the booth to show a side profile or a corner/3-quarter-turned view. Left
and right sides of the booth must look symmetrical.

CRITICAL — orthographic (parallel) projection, NOT a realistic camera lens:
use a parallel/orthographic projection, like an axonometric CAD drawing —
there is NO vanishing point and NO perspective foreshortening. Parallel
edges of the booth frame must stay parallel in the image, and every part of
the booth must be rendered at a consistent, undistorted scale regardless of
its distance from the viewer within the frame — nothing shrinks because it
is "further away". Do not render this like a photo taken with a real camera
lens.

Lighting: soft, even, professional studio lighting from above/front, gentle
soft shadows and floor reflections, no harsh directional shadows, no colored
gels except the booth's own LED backlighting glow.

Composition: single object, centered, straight-on front view with only a
downward camera tilt (no side rotation), no cropping.
Leave 15% empty space at the bottom of the frame for the object's
base/anchor point.
Background: flat neutral grey studio gradient background, no other scenery,
consistent with product-catalog renders.

No watermark, no UI elements, no motion blur, no readable text/logos
(abstract graphic pattern only).
High detail, clean sharp render, realistic materials and reflections.

Output size: 1024x1024, square canvas.
```

## Состояние 2 (image-to-image edit от первой картинки)

```
Using the attached image as the exact reference (same angle, same
proportions, same lighting, same background, same materials), edit only the
following: intensify the LED backlighting glow along the panel edges and
turn on the counter's internal light so it visibly glows. Do NOT rotate the
booth around the vertical axis — its front face must stay perfectly square
to the camera, exactly as in the reference image, only the downward camera
tilt is preserved. Keep everything else pixel-identical in position,
materials, and style.
```
