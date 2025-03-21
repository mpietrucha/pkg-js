import { createFreeze } from '@/freeze'
import { InteractsWithSource } from '@/interacts-with-source'
import { createNone, notNone } from '@mpietrucha/is'
import { createUse, use } from '@mpietrucha/use'
import { flow as createPipeline } from 'lodash-es'

export class Forward extends InteractsWithSource {
    #property

    constructor(source, property = createNone()) {
        super(source)

        this.#property = property
    }

    property() {
        return this.#property
    }

    supported(property) {
        return notNone(property)
    }

    unsupported(property) {
        return !this.supported(property)
    }

    valid() {
        return this.supported(this.property())
    }

    build() {
        this.invalid() && this.throwInvalidPropertyError()

        return use(this.source(), this.property())
    }

    get(property = createNone()) {
        if (this.unsupported(property)) {
            return this.build()
        }

        return createPipeline(this.build(), createUse(property))
    }

    throwInvalidPropertyError() {
        throw new Error('Forward property is required ')
    }
}

export const createForward = (source, property) => {
    return createFreeze(new Forward(source, property))
}
