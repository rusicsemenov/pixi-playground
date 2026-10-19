import { Application } from '@pixi/react';
import Camera from './Camera.tsx';
import IconSprite from './IconSprite.tsx';
import ReachTruck from './ReachTruck.tsx';
import Shelf from './Shelf.tsx';
import { shelfStates } from './assets/shelfStates.ts';
import { reachTruckStates } from './assets/reachTruckStates.ts';
import { reachEmptyTruckStates, parkedReachTruck } from './assets/reachEmptyTruckStates.ts';

const SHELF_ROWS = 10;
const SHELF_COLS = 15;
const SHELF_SIZE = 150;
const SHELF_COL_GAP = -45;
const SHELF_ROW_GAP = 0;

// случайное начальное состояние полок — считаем один раз, а не на каждом рендере
const INITIAL_SHELF_STATES = Array.from({ length: SHELF_ROWS * SHELF_COLS }, () =>
    Math.floor(Math.random() * shelfStates.length),
);

const Pixi = () => {
    const contentWidth = 50 + SHELF_COLS * (SHELF_SIZE + SHELF_COL_GAP);
    const contentHeight = 50 + SHELF_ROWS * (SHELF_SIZE + SHELF_ROW_GAP);

    return (
        <Application autoStart sharedTicker resizeTo={window} backgroundColor={0x8c8c84}>
            <Camera contentWidth={contentWidth} contentHeight={contentHeight} overscroll={10}>
                {Array.from({ length: SHELF_ROWS * SHELF_COLS }, (_, i) => {
                    const row = Math.floor(i / SHELF_COLS);
                    const col = i % SHELF_COLS;

                    return (
                        <Shelf
                            key={i}
                            sources={shelfStates}
                            x={50 + col * (SHELF_COL_GAP + SHELF_SIZE)}
                            y={50 + row * (SHELF_ROW_GAP + SHELF_SIZE)}
                            size={SHELF_SIZE}
                            initialStateIndex={INITIAL_SHELF_STATES[i]}
                        />
                    );
                })}

                <ReachTruck
                    sources={reachTruckStates}
                    x={contentWidth / 2}
                    y={400}
                    size={120}
                    range={contentWidth / 2}
                />

                <ReachTruck
                    sources={reachTruckStates}
                    x={contentWidth / 2}
                    y={1000}
                    size={120}
                    range={contentWidth / 2}
                    startDelayMs={10000}
                />

                {/* ричтрак без груза — ещё один тип трака, катается по складу */}
                <ReachTruck
                    sources={reachEmptyTruckStates}
                    x={contentWidth / 2}
                    y={700}
                    size={120}
                    range={contentWidth / 2}
                    startDelayMs={5000}
                />

                {/* пассивный ричтрак — просто припаркован на складе */}
                <IconSprite src={parkedReachTruck} x={1600} y={100} size={120} />
            </Camera>
        </Application>
    );
};

export default Pixi;
