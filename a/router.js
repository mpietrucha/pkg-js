import { createBuilder } from '@/builder'
import { createFreeze } from '@/freeze'
import { is } from '@mpietrucha/is'

export class Router {
    #builder

    constructor(source) {
        this.#builder = createBuilder(source)
    }

    builder() {
        return this.#builder
    }

    supported(value) {
        if (this.builder().invalid()) {
            return true
        }

        return is(value, this.builder().source())
    }

    unsupported(value) {
        return !this.supported(value)
    }

    get(value, ...parameters) {
        if (this.supported(value)) {
            return value
        }

        return this.builder().get(...parameters)
    }
}

export const createRouter = source => {
    return createFreeze(new Router(source))
}
