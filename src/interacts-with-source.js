export class InteractsWithSource {
    #source

    constructor(source) {
        this.#source = source
    }

    source() {
        return this.#source
    }

    valid() {
        return false
    }

    invalid() {
        return !this.valid()
    }
}
