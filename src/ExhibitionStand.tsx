import { Assets, Rectangle, Texture } from 'pixi.js';
import { useMemo, useState } from 'react';

const CELL = 256; // размер одной ячейки в исходнике (512 / 2)

export interface ExhibitionStandProps {
    src: string;
    x: number;
    y: number;
    size: number;
}

const ExhibitionStand = ({ src, x, y, size }: ExhibitionStandProps) => {
    const [stateIndex, setStateIndex] = useState(0);

    // автоматическая смена кадра по одному, по кругу
    // useEffect(() => {
    //     const id = setInterval(() => {
    //         setStateIndex((i) => (i + 1) % (GRID * GRID));
    //     }, FRAME_INTERVAL_MS);
    //
    //     return () => clearInterval(id);
    // }, []);

    // ассет должен быть предзагружен заранее (см. bootstrap в main.tsx)
    const baseTexture = Assets.get<Texture>(src);

    // нарезаем 4 под-текстуры из одного файла через Rectangle-frame —
    // без физического разделения на отдельные PNG (см. обсуждение с texture atlas)
    const frames = useMemo(() => {
        if (!baseTexture) return null;

        // return Array.from({ length: GRID * GRID }, (_, i) => {
        //     const col = i % GRID;
        //     const row = Math.floor(i / GRID);
        //
        //     return new Texture({
        //         source: baseTexture.source,
        //         frame: new Rectangle(col * CELL, row * CELL, CELL, CELL),
        //     });
        // });

        return [
            new Texture({
                source: baseTexture.source,
                frame: new Rectangle(0, 0, CELL, CELL),
            }),
            new Texture({
                source: baseTexture.source,
                frame: new Rectangle(CELL - 1, 0, CELL, CELL),
            }),
            new Texture({
                source: baseTexture.source,
                frame: new Rectangle(0, CELL - 8, CELL, CELL),
            }),
            new Texture({
                source: baseTexture.source,
                frame: new Rectangle(CELL, CELL - 8, CELL, CELL),
            }),
        ];
    }, [baseTexture]);

    if (!frames) return null;

    const texture = frames[stateIndex];
    const scale = size / CELL;

    return (
        <pixiSprite
            texture={texture}
            anchor={0.5}
            x={x}
            y={y}
            scale={scale}
            eventMode="static"
            cursor="pointer"
            onClick={() => setStateIndex((i) => (i + 1) % frames.length)}
        />
    );
};

export default ExhibitionStand;
