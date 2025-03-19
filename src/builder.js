import { createFreeze } from '@/freeze'
import { createUse } from '@/use'
import { is, isEmpty } from '@mpietrucha/is'
import { flow as createPipeline } from 'lodash-es'

export class Builder {
    #source

    constructor(source) {
        this.#source = source
    }

    source() {
        return this.#source
    }

    valid() {
        return is(this.source(), Function)
    }

    invalid() {
        return !this.valid()
    }

    get(...parameters) {
        this.invalid() && this.throwInvalidError()

        const Source = this.source()

        return createFreeze(new Source(...parameters))
    }
}

export const createBuilder = source => {
    return createFreeze(new Builder(source))
}

export const useBuilder = (source, ...parameters) => {
    if (isEmpty(parameters)) {
        return createUse('get')(createBuilder(source))
    }

    return createPipeline(useBuilder(source), createUse(parameters.shift()))
}
