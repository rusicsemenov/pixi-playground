export const DEPTH = { x: 20, y: 10 };

export function shade(color: number, factor: number) {
    const r = Math.min(255, ((color >> 16) & 0xff) * factor);
    const g = Math.min(255, ((color >> 8) & 0xff) * factor);
    const b = Math.min(255, (color & 0xff) * factor);
    return (r << 16) | (g << 8) | b;
}
