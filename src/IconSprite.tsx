import { Assets, Texture } from 'pixi.js';

export interface IconSpriteProps {
    src: string;
    x: number;
    y: number;
    size: number;
    tint?: number;
}

const IconSprite = ({ src, x, y, size, tint }: IconSpriteProps) => {
    // ассет должен быть предзагружен заранее (см. bootstrap в main.tsx) —
    // здесь только синхронное чтение из кэша, без useState/useEffect
    const texture = Assets.get<Texture>(src);

    if (!texture) return null;

    const scale = size / texture.width;

    return (
        <pixiSprite
            texture={texture}
            anchor={0.5}
            x={x}
            y={y}
            scale={scale}
            tint={tint}
        />
    );
};

export default IconSprite;
