import { Builder } from '@/builder'
import { isInstanceOf } from '@mpietrucha/is'

export class Router extends Builder {
    supported(value) {
        return this.valid() && isInstanceOf(value, this.source())
    }

    unsupported(value) {
        return !this.supported(value)
    }

    get(value, ...parameters) {
        if (this.supported(value)) {
            return value
        }

        return super.get(...parameters)
    }

    static throwInvalidSourceError() {
        throw new Error('Router source must be initializable')
    }
}

export const useRouter = Router.usable()

export const createRouter = Router.creatable()
