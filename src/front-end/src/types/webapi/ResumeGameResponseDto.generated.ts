/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { Resource } from './Resource.generated';
import { GameDto } from './GameDto.generated';

export interface ResumeGameResponseDto extends Resource {
    id: string;
    game: GameDto;
}
