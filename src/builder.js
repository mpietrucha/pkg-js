import { createForward } from '@/forward'
import { createFreeze } from '@/freeze'
import { InteractsWithSource } from '@/interacts-with-source'
import { is } from '@mpietrucha/is'

export class Builder extends InteractsWithSource {
    valid() {
        return is(this.source(), Function)
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

export const useBuilder = (source, property) => {
    const builder = createBuilder(source)

    return createForward(builder, 'get').get(property)
}
