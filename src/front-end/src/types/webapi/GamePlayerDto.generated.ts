/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { PlayerType } from './PlayerType.generated';
import { GameFieldDto } from './GameFieldDto.generated';
import { PlayerState } from './PlayerState.generated';
import { ShipDto } from './ShipDto.generated';

export interface GamePlayerDto {
    id: string;
    playerType: PlayerType;
    field: GameFieldDto;
    state: PlayerState;
    ships: ShipDto[];
}
