/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { Resource } from './Resource.generated';
import { FieldSizeDto } from './FieldSizeDto.generated';
import { GameState } from './GameState.generated';

export interface CreateGameResponseDto extends Resource {
    id: string;
    size: FieldSizeDto;
    state: GameState;
}
