import { Field } from 'types/Square'

export const createField = (): Field => {
	return Array(100).fill({
		isHit: false
	})
}
