import { createBuilder } from '@/builder'
import { createFreeze } from '@/freeze'
import { createNone, notNone } from '@mpietrucha/is'
import { createUse, use } from '@mpietrucha/use'

export class Forward {
    #builder
    #property

    constructor(source, property = createNone()) {
        this.#builder = createBuilder(source)

        this.#property = property
    }

    builder() {
        return this.#builder
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
        if (this.builder().valid()) {
            return true
        }

        return this.supported(this.property())
    }

    invalid() {
        return !this.valid()
    }

    build() {
        if (this.valid()) {
            return this.builder().source()
        }

        return use(this.builder().source(), this.property())
    }

    get(property = createNone()) {
        if (this.unsupported(property)) {
            return this.build()
        }

        return createPipeline(this.build(), createUse(property))
    }
}

export const createForward = (source, property) => {
    return createFreeze(new Forward(source, property))
}
