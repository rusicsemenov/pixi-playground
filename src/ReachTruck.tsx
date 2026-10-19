import { useTick } from '@pixi/react';
import { Assets, Texture } from 'pixi.js';
import { useMemo, useRef, useState } from 'react';

const MOVE_SPEED = 2; // px за тик при 60fps (масштабируется через ticker.deltaTime)
const FRAME_DURATION_MS = 250; // как часто листать кадр анимации

export interface ReachTruckProps {
    sources: string[];
    x: number;
    y: number;
    size: number;
    range?: number; // на сколько px влево/вправо от x патрулирует (центр диапазона)
    initialX?: number; // с какой позиции стартует внутри диапазона (по умолчанию — x)
    startDelayMs?: number; // пауза перед началом движения, чтобы несколько траков не ехали синхронно
}

const ReachTruck = ({
    sources,
    x,
    y,
    size,
    range = 800,
    initialX,
    startDelayMs = 0,
}: ReachTruckProps) => {
    const [position, setPosition] = useState({ x: initialX ?? x, y });
    const [facingLeft, setFacingLeft] = useState(false);
    const [stateIndex, setStateIndex] = useState(0);
    const directionRef = useRef(1); // 1 = едет вправо, -1 = едет влево
    const frameTimerRef = useRef(0);
    const elapsedRef = useRef(0);

    useTick((ticker) => {
        elapsedRef.current += ticker.deltaMS;
        if (elapsedRef.current < startDelayMs) return; // ещё не стартовали

        const step = MOVE_SPEED * ticker.deltaTime * directionRef.current;

        setPosition((prev) => {
            const nextX = prev.x + step;

            // упёрлись в границу диапазона — разворачиваемся
            if (nextX >= x + range) {
                directionRef.current = -1;
            } else if (nextX <= x - range) {
                directionRef.current = 1;
            }

            return { x: nextX, y: prev.y };
        });

        setFacingLeft(directionRef.current < 0);

        // трак всегда в движении — кадры листаются сами, без клика/управления
        frameTimerRef.current += ticker.deltaMS;
        if (frameTimerRef.current >= FRAME_DURATION_MS) {
            frameTimerRef.current = 0;
            setStateIndex((i) => (i + 1) % sources.length);
        }
    });

    // все состояния трака — отдельные файлы (не атлас), см. bootstrap в main.tsx
    const textures = useMemo(() => sources.map((src) => Assets.get<Texture>(src)), [sources]);

    if (textures.some((texture) => !texture)) return null;

    const texture = textures[stateIndex];
    const baseScale = size / texture.width;

    return (
        <pixiSprite
            texture={texture}
            anchor={0.5}
            x={position.x}
            y={position.y}
            scale={{ x: facingLeft ? baseScale : -baseScale, y: baseScale }}
        />
    );
};

export default ReachTruck;
