import { createRoot } from 'react-dom/client';
import { extend } from '@pixi/react';
import { AnimatedSprite, Assets, Container, Graphics, Sprite } from 'pixi.js';
import './index.css';
import App from './App.tsx';
import vialanIcon from './assets/vialan.png';
import { shelfStates } from './assets/shelfStates.ts';
import { reachTruckStates } from './assets/reachTruckStates.ts';
import { reachEmptyTruckStates, parkedReachTruck } from './assets/reachEmptyTruckStates.ts';

// единая регистрация всех pixi-классов, используемых как JSX-теги
// (<pixiContainer>, <pixiGraphics>, <pixiSprite>, <pixiAnimatedSprite>) —
// extend глобален, поэтому достаточно вызвать один раз здесь
extend({ Container, Graphics, Sprite, AnimatedSprite });

async function bootstrap() {
    // грузим ассеты до монтирования дерева
    await Assets.load([
        vialanIcon,
        ...shelfStates,
        ...reachTruckStates,
        ...reachEmptyTruckStates,
        parkedReachTruck,
    ]);

    // без StrictMode: двойной dev-маунт <Application> из @pixi/react асинхронно
    // пересоздаёт/уничтожает Application, и app.renderer на миг становится null —
    // это ломает генерацию текстур в дочерних компонентах (см. ChristmasTree)
    createRoot(document.getElementById('root')!).render(<App />);
}

bootstrap();
