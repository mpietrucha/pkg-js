import { createBuilder, useBuilder } from '@/builder'
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
            return false
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

export const createRouter = useBuilder(Router)

export const useRouter = useBuilder(Router, 'get')
