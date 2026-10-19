# Универсальный шаблон — любой объект склада

Общий шаблон для любых объектов категории "склад" (тельферы/hoist,
погрузчики, паллеты, ворота и т.п.) — держит все проверенные технические
правила из `00-style-guide.md` и `02-warehouse-shelf.md` (тот же пиксель-арт
стиль, тот же угол камеры 65-70°, та же ортографическая проекция без
поворота объекта). Просто подставьте описание своего объекта в `Subject` и
палитру в `Color palette`.

## Шаблон промпта

```
2.5D top-down game asset, in the visual style of Stardew Valley / Gather.town
pixel-art warehouse assets, viewed from a fixed camera that is tilted very
steeply downward — approximately 65-70° down from eye-level, close to a
bird's-eye view but not quite fully vertical, like standing directly over
an open dollhouse or stage diorama and looking down into it — which reveals
almost all of the top surface and floor around the object, while the front
face is still visible but strongly foreshortened. Vertical surfaces are
rendered with a strong forced-perspective tilt toward the camera. Clean
readable silhouettes.

Subject: {{ОПИШИТЕ ОБЪЕКТ ЗДЕСЬ — например: "a warehouse hoist/gantry crane,
yellow steel frame, chain hook hanging from the top beam, currently idle,
no load attached"}}

CRITICAL — the object itself does not rotate, only the camera tilts down:
the object's front face must point directly at the viewer, perfectly square
and perpendicular to the camera, as if placed flat against a wall facing you
head-on. The ONLY thing that changes is the camera's downward tilt — there
must be ZERO rotation of the object around the vertical axis (no yaw). Do NOT
turn the object to show a side profile or a corner/3-quarter-turned view.
Left and right sides of the object must look symmetrical.

CRITICAL — orthographic (parallel) projection, NOT a realistic camera lens:
use a parallel/orthographic projection, like an axonometric CAD drawing or
an isometric video-game render — there is NO vanishing point and NO
perspective foreshortening. Parallel edges of the object must stay parallel
in the image, and every part of the object must be rendered at a
consistent, undistorted scale regardless of its distance from the viewer
within the frame — nothing shrinks because it is "further away". Do not
render this like a photo taken with a real camera lens.

Lighting: single soft light source from above, soft contact shadow under
the object's base, no harsh directional shadows.

Color palette: {{ПАЛИТРА — например: "neutral industrial tones, grey/yellow
steel, warm wood undertones optional"}}, consistent saturation.

Composition: single object, centered, no cropping. Leave 15% empty space at
the bottom of the frame for the object's base/anchor point.
Background: flat solid white background, no scenery.

No text, no logos, no watermark, no UI elements.
High detail, crisp clean edges, limited/consistent color palette suitable
for downscaling to a game sprite.

Output size: 1024x1024, square canvas.
```

## Для наборов состояний (image-to-image edit от базового файла)

Если у объекта есть состояния (вкл/выкл, гружёный/пустой, открыт/закрыт):

```
Using the attached image as the exact reference (identical angle,
proportions, lighting, frame position, and background), edit only the
following: {{ОПИШИТЕ ИЗМЕНЕНИЕ — например: "attach a cardboard box to the
hook, as if lifting a load"}}. Do NOT rotate the object around the vertical
axis — its front face must stay perfectly square to the camera, exactly as
in the reference image. Keep everything else pixel-identical in position,
materials, and style.
```

Повторить для каждого следующего состояния, каждый раз отталкиваясь от
предыдущего сгенерированного файла (а не от базового) — так изменения
накапливаются последовательно и точнее сохраняют консистентность.

## Разворот на 90° (вид сзади — например, "развернулся для разгрузки")

Базовый ассет трака (truck1/2/3) уже показывает его как бы сбоку — это его
"вид на едущую машину" (он ездит влево-вправо по экрану). Поэтому поворот на
90° от ЭТОЙ ориентации — это не ещё один боковой профиль, а именно перед/зад:
трак разворачивается на 90° от направления движения и встаёт к камере
задней частью, как будто попятился к полке для разгрузки.

Единственный случай, где нужно СПЕЦИАЛЬНО нарушить правило "объект не
поворачивается" из шаблона выше. Это не то же самое, что зеркалирование
(`scale.x = -1`) в коде — mirror только отражает существующий вид
влево-вправо и не может показать реальную заднюю часть объекта. Вид сзади —
отдельный, физически новый ассет, генерируется отдельно и переключается в
коде как самостоятельное состояние (не через цикл анимации движения, а
логикой "доехал до полки → показать back → подождать → показать
исходный вид/поехать дальше").

```
Using the attached image as the exact reference for camera angle, lighting,
art style, and proportions, generate the SAME object (including the
operator/worker riding on it) rotated 90° around the vertical axis from its
current driving orientation — the reference shows the object as if driving
left/right (a side-on view), and this new image must show it turned to
face directly toward the camera from the BACK, as if it has reversed toward
a shelf to unload. The operator/worker must rotate together with the
vehicle and also be seen from behind (back of the head/body, not facing the
camera) — do not leave the person facing forward while only the vehicle
turns. Keep the camera tilt/angle, lighting direction, floor position, and
art style pixel-identical to the reference — the ONLY thing that changes is
the facing direction of the whole object including its operator (side,
driving → back, facing camera). Do not change proportions, colors, camera
height, or add rotation on any other axis.
```
