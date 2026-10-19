# Style guide for AI-generated sprites (Nano Banana / Gemini image, Midjourney, SD)

Общие технические требования — держать одинаковыми во всех трёх концепциях
(стенд, склад, офис), чтобы ассеты сочетались в одной сцене.

## Обязательные правила

- **Ракурс**: крутой top-down с форс-перспективой, ~65-70° наклона камеры вниз
  от горизонта (как Stardew Valley / RPG Maker tileset), НЕ настоящая
  изометрия (не 2:1 dimetric). Верх объекта и пол вокруг видны почти прямо
  сверху, фасад/графика всё ещё читаемы, но заметно наклонены. Подтверждено
  двумя раундами тестовой генерации — 30-35° было слишком плоско, 45-55°
  тоже недостаточно круто, 65-70° дало лучший результат.
- **НЕ писать "3/4 view"**: это художественный термин, означающий "объект
  повёрнут на ~45° вокруг вертикальной оси" (как в портретной съёмке) — именно
  из-за этой фразы модель разворачивает объект боком вместо того, чтобы просто
  наклонить камеру вниз. Нужно явно разделять: камера наклоняется (tilt/pitch
  вниз), а сам объект НЕ поворачивается (без yaw). См. формулировку в блоке ниже.
- **Камера НЕ вращается**: модели любят сами "покрутить" объект (показать сбоку,
  сзади, строго сверху и т.п.) — это ломает консистентность между ассетами.
  Нужно явно и жёстко прописывать fixed camera angle (см. блок ниже), иначе
  ракурс будет каждый раз новый.
- **Ортографическая проекция, БЕЗ перспективы**: "photorealistic render"/
  "3D product visualization" по умолчанию подразумевает камеру с объективом —
  перспектива, схождение линий, части объекта дальше от камеры выглядят
  меньше. Для спрайта это не нужно и ломает пропорции — нужна параллельная
  (orthographic/axonometric) проекция, как в играх или CAD, где размер не
  зависит от расстояния до камеры. Явно писать "orthographic projection, no
  perspective" — иначе модель по умолчанию рисует perspective camera.
- **Свет**: один мягкий источник сверху, лёгкая контактная тень у основания.
  Без резких направленных теней.
- **Фон**: просить **сплошной однотонный фон** (белый/chroma-key), не "transparent" —
  модели часто игнорируют прозрачность. Прозрачность делать потом самому
  (remove.bg / редактор) по однотонному фону.
- **Отступ снизу**: явно просить оставить ~10-15% высоты кадра пустыми внизу —
  это anchor-точка объекта (низ = точка привязки в pixi.js, `anchor.set(0.5, 1)`).
- **Размер**: генерировать в 1024x1024, даунскейлить в редакторе до целевого
  спрайта (128x128 / 256x256) — меньше шума, чем просить модель сразу рисовать
  мелко.
- **Один объект, по центру, без текста/логотипов/водяных знаков.**
- **Наборы состояний (вкл/выкл, пусто/полно) — генерировать через image-to-image
  edit от первого файла** ("вот эта картинка, измени только X, остальное оставь
  идентичным"), а не независимыми текстовыми промптами — иначе ракурс/пропорции
  между состояниями разъедутся.

## Общий блок (вставлять в начало каждого промпта)

```
2.5D top-down game asset, in the visual style of Stardew Valley / Gather.town
pixel-art assets, viewed from a fixed camera that is tilted very steeply
downward looking at the object from above — approximately 65-70° down from
eye-level, close to a bird's-eye view but not quite fully vertical, like
standing directly over an open dollhouse or stage diorama and looking down
into it. This reveals almost all of the top surface and the floor around
the object, while the front face is still visible and legible but strongly
foreshortened/compressed — NOT a full 90° bird's-eye top-down view, and NOT
a shallow 30-55° angle (both were tested and looked too flat/too frontal).
Vertical surfaces are rendered with a strong forced-perspective tilt toward
the camera. Clean readable silhouettes.

CRITICAL — the object itself does not rotate, only the camera tilts down:
the object's front face must point directly at the viewer, perfectly
square and perpendicular to the camera, as if placed flat against a wall
facing you head-on. The ONLY thing that changes is the camera's downward
tilt (pitch) — there must be ZERO rotation of the object around the
vertical axis (no yaw). Do NOT turn the object to show a side profile or a
corner/3-quarter-turned view (this is NOT a "3/4 view" in the classical
art/photography sense — do not rotate the subject like a turned portrait).
Left and right sides of the object must look symmetrical, as if seen
head-on with just a downward camera tilt. Every generation must look like
it was photographed from the exact same fixed camera position: same tilt,
same distance, same framing.

CRITICAL — orthographic (parallel) projection, NOT a realistic camera lens:
use a parallel/orthographic projection, like an axonometric CAD drawing or
an isometric video-game render (SimCity, Diablo, Age of Empires) — there is
NO vanishing point and NO perspective foreshortening. Parallel edges of the
object must stay parallel in the image, and every part of the object must
be rendered at a consistent, undistorted scale regardless of its distance
from the viewer within the frame — nothing shrinks because it is "further
away". Do not render this like a photo taken with a real camera lens.

Lighting: single soft light source from above, gentle contact shadow under
the object's base, no harsh directional shadows.

Composition: single object, centered, no cropping. Leave 15% empty space at
the bottom of the frame for the object's base/anchor point.
Background: flat solid white background, no scenery, no shadow cast onto
background edges.

No text, no logos, no watermark, no UI elements, no motion blur.
High detail, crisp clean edges, limited/consistent color palette suitable
for downscaling to a game sprite.

Output size: 1024x1024, square canvas.
```

Файлы концепций: `01-exhibition-stand.md`, `02-warehouse-shelf.md`, `03-office-desk.md`.
