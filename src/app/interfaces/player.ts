import { Race } from './race';

export interface IPlayer {
    username: string;
    race: Race;
    melee: number;
    range: number;
    magic: number;
    constitution: number;
    rank: string;
    lastHitDt: Date;
    favorite: boolean;
}