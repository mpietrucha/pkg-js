import { createBuilder } from '@/builder'
import { createForward } from '@/forward'
import { createRouter } from '@/router'

export { createBuilder, createForward, createRouter }

export const useBuilder = (source, property) => {
    const builder = createBuilder(source)

    return createForward(builder, 'get').get(property)
}

export const useRouter = (source, property) => {
    const router = useBuilder(Router, 'get')

    return createForward(router).get(property)
}
