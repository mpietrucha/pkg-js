import { Router } from '@/router'

export class Wrapper extends Router {
    get(value, ...parameters) {
        return super.get(value, value, ...parameters)
    }
}

export const useWrapper = Wrapper.usable()

export const createWrapper = Wrapper.creatable()
