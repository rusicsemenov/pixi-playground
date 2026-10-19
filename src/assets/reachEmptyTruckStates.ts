import truck1 from './trucks/reach_empty/truck1_e.webp';
import truck2 from './trucks/reach_empty/truck2_e.webp';
import truck3 from './trucks/reach_empty/truck3_e.webp';

// ричтрак без груза — отдельный тип трака, катается по складу так же, как гружёный
export const reachEmptyTruckStates = [truck1, truck2, truck3];

// пассивный (припаркованный) ричтрак — просто стоит на складе, без анимации
export { default as parkedReachTruck } from './trucks/truck_reach_empty.webp';
