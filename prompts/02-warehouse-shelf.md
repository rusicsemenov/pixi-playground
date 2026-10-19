# Warehouse shelf — fill-level states

Продолжение самой первой идеи проекта (визуализация наполнения) — реальный
ассет вместо Graphics-фейка. См. общие правила в `00-style-guide.md`.

## Базовый промпт (пустая полка)

```
2.5D top-down game asset, in the visual style of Stardew Valley / Gather.town
pixel-art warehouse assets, viewed from a fixed camera that is tilted very
steeply downward — approximately 65-70° down from eye-level, close to a
bird's-eye view but not quite fully vertical, like standing directly over
an open dollhouse or stage diorama and looking down into it — which reveals
almost all of the top surface and floor around the shelf, while the front
frame is still visible but strongly foreshortened. Vertical surfaces are
rendered with a strong forced-perspective tilt toward the camera. Clean
readable silhouettes.

Subject: a single warehouse storage shelf/rack unit, metal frame, 3
horizontal levels, currently EMPTY (no boxes, just the bare shelf frame).

CRITICAL — the shelf itself does not rotate, only the camera tilts down:
the shelf's front face must point directly at the viewer, perfectly square
and perpendicular to the camera, as if placed flat against a wall facing you
head-on. The ONLY thing that changes is the camera's downward tilt — there
must be ZERO rotation of the shelf around the vertical axis (no yaw). Do NOT
turn the shelf to show a side profile or a corner/3-quarter-turned view.
Left and right sides of the shelf must look symmetrical.

CRITICAL — orthographic (parallel) projection, NOT a realistic camera lens:
use a parallel/orthographic projection, like an axonometric CAD drawing or
an isometric video-game render — there is NO vanishing point and NO
perspective foreshortening. Parallel edges of the shelf frame must stay
parallel in the image, and every part of the shelf must be rendered at a
consistent, undistorted scale regardless of its distance from the viewer
within the frame — nothing shrinks because it is "further away". Do not
render this like a photo taken with a real camera lens.

Lighting: single soft light source from above, soft contact shadow under the
shelf's legs.

Color palette: neutral industrial tones (grey metal frame, warm wood
undertones optional), consistent saturation.

Composition: single object, centered, no cropping. Leave 15% empty space at
the bottom of the frame for the object's base/anchor point.
Background: flat solid white background, no scenery.

No text, no logos, no watermark, no UI elements.
High detail, crisp clean edges, limited/consistent color palette suitable
for downscaling to a game sprite.

Output size: 1024x1024, square canvas.
```

## Состояния наполнения (image-to-image edit от базового файла)

33%:
```
Using the attached image as the exact reference (identical angle,
proportions, lighting, frame position, and background), edit only the
following: add cardboard boxes filling approximately 33% of the shelf's
total capacity, stacked on the bottom level only. Keep the shelf frame,
camera angle, and lighting pixel-identical to the reference. Do NOT rotate
the shelf around the vertical axis — its front face must stay perfectly
square to the camera, exactly as in the reference image.
```

66%:
```
Using the attached image as the exact reference (identical angle,
proportions, lighting, frame position, and background), edit only the
following: add cardboard boxes filling approximately 66% of the shelf's
total capacity, stacked across the bottom two levels. Keep the shelf frame,
camera angle, and lighting pixel-identical to the reference. Do NOT rotate
the shelf around the vertical axis — its front face must stay perfectly
square to the camera, exactly as in the reference image.
```

100%:
```
Using the attached image as the exact reference (identical angle,
proportions, lighting, frame position, and background), edit only the
following: add cardboard boxes filling all three levels of the shelf
completely. Keep the shelf frame, camera angle, and lighting pixel-identical
to the reference. Do NOT rotate the shelf around the vertical axis — its
front face must stay perfectly square to the camera, exactly as in the
reference image.
```
