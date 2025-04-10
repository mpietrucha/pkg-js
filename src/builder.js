import { usePipeline } from '@mpietrucha/function'
import { isConstructor, isEmpty } from '@mpietrucha/is'
import { createUseComposition, use } from '@mpietrucha/use'
import { negate } from '@mpietrucha/value'

export class Builder {
    #source

    constructor(source) {
        this.#source = source
    }

    source() {
        return this.#source
    }

    valid() {
        return this.constructor.supported(this.source())
    }

    invalid() {
        return negate(this.valid())
    }

    get(...parameters) {
        this.invalid() && this.throwInvalidSourceError()

        return this.constructor.get(this.source(), ...parameters)
    }

    throwInvalidSourceError() {
        this.constructor.throwInvalidSourceError()
    }

    static supported(source) {
        return isConstructor(source)
    }

    static unsupported(source) {
        return negate(this.supported(source))
    }

    static get(source, ...parameters) {
        this.unsupported(source) && this.throwInvalidSourceError()

        const Instance = source

        return new Instance(...parameters)
    }

    static create(source) {
        return this.get(this, source)
    }

    static use(source, ...property) {
        const builder = this.create(source)

        if (isEmpty(property)) {
            return use(builder, 'get')
        }

        return usePipeline(
            this.use(source),
            createUseComposition(property.shift()),
        )
    }

    static usable() {
        return use(this, 'use')
    }

    static creatable() {
        return use(this, 'create')
    }

    static throwInvalidSourceError() {
        throw new Error('Builder source must be initializable')
    }
}

export const useBuilder = Builder.usable()

export const createBuilder = Builder.creatable()
