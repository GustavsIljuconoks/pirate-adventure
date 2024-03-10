/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { GamePlayerDto } from './GamePlayerDto.generated';
import { GameState } from './GameState.generated';

export interface GameDto {
    id: string;
    columnSize: number;
    rowSize: number;
    player1: GamePlayerDto;
    player2: GamePlayerDto;
    state: GameState;
}
