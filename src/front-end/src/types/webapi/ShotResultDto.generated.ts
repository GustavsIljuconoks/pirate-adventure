/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { LocationDto } from './LocationDto.generated';
import { Scoring } from './Scoring.generated';

export interface ShotResultDto {
    shotLocation: LocationDto;
    scoring: Scoring;
    targetShipId: number;
}
