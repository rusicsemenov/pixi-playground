import { Assets, Texture } from 'pixi.js';
import { useMemo, useState } from 'react';

export interface ShelfProps {
    sources: string[];
    x: number;
    y: number;
    size: number;
    initialStateIndex?: number;
}

const Shelf = ({ sources, x, y, size, initialStateIndex = 0 }: ShelfProps) => {
    const [stateIndex, setStateIndex] = useState(initialStateIndex);

    // каждое состояние — отдельный файл (не атлас), поэтому просто читаем
    // все текстуры из кэша по своим src (см. bootstrap в main.tsx)
    const textures = useMemo(
        () => sources.map((src) => Assets.get<Texture>(src)),
        [sources],
    );

    if (textures.some((texture) => !texture)) return null;

    const texture = textures[stateIndex];
    const scale = size / texture.width;

    return (
        <pixiSprite
            texture={texture}
            anchor={0.5}
            x={x}
            y={y}
            scale={scale}
            eventMode="static"
            cursor="pointer"
            onClick={() => setStateIndex((i) => (i + 1) % textures.length)}
        />
    );
};

export default Shelf;
