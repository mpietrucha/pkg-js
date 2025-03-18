import { createFreeze } from '@/freeze'
import { use } from '@mpietrucha/use'
import { isFunction } from 'lodash-es'

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

export const useBuilder = source => {
    return use(createBuilder(source), 'get')
}
