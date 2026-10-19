# Office desk (в духе Gather.town-референса)

См. общие правила в `00-style-guide.md`.

## Базовый промпт

```
2.5D top-down game asset, in the visual style of Stardew Valley / Gather.town
pixel-art office furniture, viewed from a fixed camera that is tilted very
steeply downward — approximately 65-70° down from eye-level, close to a
bird's-eye view but not quite fully vertical, like standing directly over
an open dollhouse or stage diorama and looking down into it — which reveals
almost all of the desk's top surface and the floor around it, while the
front face is still visible but strongly foreshortened. Vertical surfaces
are rendered with a strong forced-perspective tilt toward the camera. Clean
readable silhouettes, cozy modern office mood.

Subject: a single office desk with a monitor, keyboard, desk lamp, and a
small potted plant, plus a matching office chair positioned behind the desk.

CRITICAL — the desk group does not rotate, only the camera tilts down: the
desk's front face must point directly at the viewer, perfectly square and
perpendicular to the camera, as if placed flat against a wall facing you
head-on. The ONLY thing that changes is the camera's downward tilt — there
must be ZERO rotation of the desk around the vertical axis (no yaw). Do NOT
turn the desk to show a side profile or a corner/3-quarter-turned view. Left
and right sides of the desk must look symmetrical.

CRITICAL — orthographic (parallel) projection, NOT a realistic camera lens:
use a parallel/orthographic projection, like an axonometric CAD drawing or
an isometric video-game render — there is NO vanishing point and NO
perspective foreshortening. Parallel edges of the desk must stay parallel
in the image, and every part of the desk/chair must be rendered at a
consistent, undistorted scale regardless of its distance from the viewer
within the frame — nothing shrinks because it is "further away". Do not
render this like a photo taken with a real camera lens.

Lighting: single soft light source from above, gentle contact shadow beneath
the desk legs and chair.

Color palette: soft pastel modern office tones (light wood desk, muted
blue/grey chair, warm accent plant), consistent saturation across all
objects.

Composition: single object group, centered, straight-on front view with
only a downward camera tilt (no side rotation), no cropping.
Leave 15% empty space at the bottom of the frame for the object's
base/anchor point.
Background: flat solid white background, no scenery, no shadow cast onto
background edges.

No text, no logos, no watermark, no UI elements, no characters.
High detail, crisp clean edges, limited/consistent color palette suitable
for downscaling to a game sprite.

Output size: 1024x1024, square canvas.
```
