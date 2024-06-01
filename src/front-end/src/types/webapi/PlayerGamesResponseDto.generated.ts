/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { Resource } from './Resource.generated';
import { Status } from './Status.generated';

export interface PlayerGamesResponseDto extends Resource {
    gameId: string;
    status: Status;
    player1: string;
    player2: string;
}
