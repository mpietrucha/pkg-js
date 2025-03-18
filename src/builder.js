import { createFreeze } from '@/freeze'
import { createDefferedUse, createUse } from '@/use'
import { flow as createPipeline, isEmpty, isFunction } from 'lodash-es'

export class Builder {
    #source

    constructor(source) {
        this.#source = source
    }

    source() {
        return this.#source
    }

    valid() {
        return isFunction(this.source())
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
        return createUse(createBuilder(source))
    }

    return createPipeline(
        useBuilder(source),
        createDefferedUse(parameters.shift()),
    )
}
