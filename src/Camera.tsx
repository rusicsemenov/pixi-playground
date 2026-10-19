import { useTick } from '@pixi/react';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

export interface CameraProps {
    contentWidth: number;
    contentHeight: number;
    speed?: number;
    overscroll?: number;
    children: ReactNode;
}

const Camera = ({ contentWidth, contentHeight, speed = 8, overscroll = 200, children }: CameraProps) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const keysRef = useRef(new Set<string>());

    // отслеживаем зажатые клавиши через ref — не триггерим ререндер на каждое нажатие
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => keysRef.current.add(e.key.toLowerCase());
        const onKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.key.toLowerCase());

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }, []);

    useTick((ticker) => {
        const keys = keysRef.current;
        if (keys.size === 0) return;

        let dx = 0;
        let dy = 0;
        if (keys.has('a')) dx += 1;
        if (keys.has('d')) dx -= 1;
        if (keys.has('w')) dy += 1;
        if (keys.has('s')) dy -= 1;
        if (dx === 0 && dy === 0) return;

        const step = speed * ticker.deltaTime;

        setPosition((prev) => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // границы для смещения контейнера-мира: обычный клэмп "не дальше
            // самого края контента" плюс запас overscroll в обе стороны —
            // поэтому камера может "улететь" за край на overscroll px,
            // а не жёстко упираться в 0/0
            const minX = Math.min(0, viewportWidth - contentWidth) - overscroll;
            const maxX = overscroll;
            const minY = Math.min(0, viewportHeight - contentHeight) - overscroll;
            const maxY = overscroll;

            return {
                x: Math.max(minX, Math.min(maxX, prev.x + dx * step)),
                y: Math.max(minY, Math.min(maxY, prev.y + dy * step)),
            };
        });
    });

    return (
        <pixiContainer x={position.x} y={position.y}>
            {children}
        </pixiContainer>
    );
};

export default Camera;
