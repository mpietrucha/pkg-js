import { createFreeze } from '@/freeze'

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
        this.invalid() && this.throwInvalidSourceError()

        const Source = this.source()

        return createFreeze(new Source(...parameters))
    }

    throwInvalidSourceError() {
        throw new Error('Builder source must be initializable')
    }
}

export const createBuilder = source => {
    return createFreeze(new Builder(source))
}
