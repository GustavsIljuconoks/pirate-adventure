/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { LocationDto } from './LocationDto.generated';
import { Orientation } from './Orientation.generated';

export interface ShipDto {
    id: number;
    name: string;
    size: number;
    headLocation: LocationDto;
    orientation: Orientation;
    hitCount: number;
    isDestroyed: boolean;
}
