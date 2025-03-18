import { use } from '@mpietrucha/use'
import { partialRight as createComposition } from 'lodash-es'

export const createUse = property => {
    return createComposition(use, property)
}
