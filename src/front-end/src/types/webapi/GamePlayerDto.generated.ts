/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { PlayerType } from './PlayerType.generated';
import { PlayerState } from './PlayerState.generated';

export interface GamePlayerDto {
    id: string;
    playerType: PlayerType;
    state: PlayerState;
}
