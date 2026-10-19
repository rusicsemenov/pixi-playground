import { Graphics } from 'pixi.js';
import { useCallback } from 'react';
import { DEPTH, shade } from './iso.ts';

export interface Bar3DProps {
    x: number;
    baseY: number;
    width: number;
    height: number;
    color: number;
    onClick?: () => void;
}

const Bar3D = ({ x, baseY, width, height, color, onClick }: Bar3DProps) => {
    const draw = useCallback(
        (g: Graphics) => {
            g.clear();
            const topY = baseY - height;

            g.poly([
                x, topY,
                x + width, topY,
                x + width + DEPTH.x, topY - DEPTH.y,
                x + DEPTH.x, topY - DEPTH.y,
            ]).fill(shade(color, 1.3));

            g.rect(x, topY, width, height).fill(color);

            g.poly([
                x + width, topY,
                x + width + DEPTH.x, topY - DEPTH.y,
                x + width + DEPTH.x, baseY - DEPTH.y,
                x + width, baseY,
            ]).fill(shade(color, 0.65));
        },
        [x, baseY, width, height, color],
    );

    return (
        <pixiGraphics
            draw={draw}
            eventMode={onClick ? 'static' : 'none'}
            cursor={onClick ? 'pointer' : undefined}
            onClick={onClick}
        />
    );
};

export default Bar3D;
