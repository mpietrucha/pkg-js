import { use } from '@mpietrucha/use'
import { partialRight as createComposition } from 'lodash-es'

export const useDefaultProperty = () => {
    return 'get'
}

export const createUse = (source, property = useDefaultProperty()) => {
    return use(source, property)
}

export const createDefferedUse = property => {
    return createComposition(createUse, property)
}
