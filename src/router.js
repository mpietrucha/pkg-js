import { Builder, useBuilder } from '@/builder'
import { createForward } from '@/forward'
import { is } from '@mpietrucha/is'

export class Router extends Builder {
    supported(value) {
        if (this.invalid()) {
            return true
        }

        return is(value, this.source())
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
}

export const createRouter = useBuilder(Router)

export const useRouter = (source, property) => {
    const router = createRouter(source)

    return createForward(router, 'get').get(property)
}
