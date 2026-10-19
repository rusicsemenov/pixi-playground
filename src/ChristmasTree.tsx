import { useApplication } from '@pixi/react';
import type { Application, AnimatedSprite as PixiAnimatedSprite } from 'pixi.js';
import { Graphics, Texture } from 'pixi.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DEPTH, shade } from './iso.ts';

const LIGHT_POSITIONS: [number, number][] = [
    [0, -60],
    [16, -48],
    [-16, -48],
    [0, -34],
    [14, -22],
    [-14, -22],
];

function makeLightsTexture(app: Application, on: boolean): Texture {
    const g = new Graphics();
    const color = on ? 0xfff59d : 0x8a7a2a;

    for (const [dx, dy] of LIGHT_POSITIONS) {
        if (on) g.circle(dx, dy, 9).fill({ color, alpha: 0.25 });
        g.circle(dx, dy, 5).fill(color);
    }

    const texture = app.renderer.generateTexture(g);
    g.destroy();
    return texture;
}

export interface ChristmasTreeProps {
    x: number;
    baseY: number;
}

const ChristmasTree = ({ x, baseY }: ChristmasTreeProps) => {
    const { app, isInitialised } = useApplication();
    const [frames, setFrames] = useState<Texture[] | null>(null);
    const spriteRef = useRef<PixiAnimatedSprite | null>(null);

    // generateTexture — это реальный GPU-вызов (побочный эффект), поэтому он
    // не должен жить в useMemo (тот выполняется во время рендера и может
    // конфликтовать с синхронным тиком рендерера) — только в useEffect,
    // и только когда Application реально инициализирован (isInitialised)
    useEffect(() => {
        if (!isInitialised) return;

        const generated = [makeLightsTexture(app, false), makeLightsTexture(app, true)];
        // eslint-disable-next-line react-hooks/set-state-in-effect -- текстуры создаются на GPU, это внешний ресурс
        setFrames(generated);

        return () => {
            generated.forEach((texture) => texture.destroy(true));
        };
    }, [app, isInitialised]);

    // AnimatedSprite.textures-сеттер сам вызывает gotoAndStop(0) — а @pixi/react
    // при монтировании применяет пропсы (в т.ч. textures) ЕЩЁ РАЗ поверх
    // конструктора, из-за чего autoPlay эффективно "гасится". Запускаем play()
    // явно, уже после того как инстанс примонтирован
    useEffect(() => {
        if (frames) {
            spriteRef.current?.play();
        }
    }, [frames]);

    const drawTree = useMemo(
        () => (g: Graphics) => {
            g.clear();

            const potWidth = 40;
            const potHeight = 20;
            const potX = x - potWidth / 2;
            const potTopY = baseY - potHeight;

            // "горшок" под ёлкой — та же изометрия (DEPTH), что и у колонок
            g.poly([
                potX,
                potTopY,
                potX + potWidth,
                potTopY,
                potX + potWidth + DEPTH.x,
                potTopY - DEPTH.y,
                potX + DEPTH.x,
                potTopY - DEPTH.y,
            ]).fill(shade(0x8d6e63, 1.3));

            g.rect(potX, potTopY, potWidth, potHeight).fill(0x8d6e63);

            g.poly([
                potX + potWidth,
                potTopY,
                potX + potWidth + DEPTH.x,
                potTopY - DEPTH.y,
                potX + potWidth + DEPTH.x,
                baseY - DEPTH.y,
                potX + potWidth,
                baseY,
            ]).fill(shade(0x8d6e63, 0.65));

            // сама ёлка — плоский "билборд" поверх горшка, три яруса кроны
            const y0 = potTopY;
            const y1 = y0 - 50;
            const y2 = y0 - 90;
            const y3 = y0 - 130;

            g.poly([x, y1, x - 45, y0, x + 45, y0]).fill(0x2e7d32);
            g.poly([x, y2, x - 35, y1, x + 35, y1]).fill(0x388e3c);
            g.poly([x, y3, x - 25, y2, x + 25, y2]).fill(0x43a047);
        },
        [x, baseY],
    );

    return (
        <pixiContainer>
            <pixiGraphics draw={drawTree} />
            {frames && (
                <pixiAnimatedSprite
                    ref={spriteRef}
                    textures={frames}
                    anchor={0.5}
                    x={x}
                    y={baseY - 20 - 65}
                    loop
                    animationSpeed={0.02}
                />
            )}
        </pixiContainer>
    );
};

export default ChristmasTree;
