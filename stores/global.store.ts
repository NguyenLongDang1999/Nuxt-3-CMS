// ** Types Imports
import type { IGlobalState } from '~/types/core.type'

export const useGlobalStore = defineStore({
    id: 'global-store',
    state: (): IGlobalState => ({
        primary: '#009688',
        isCollapse: false,
        breadcrumb: true,
        breadcrumbIcon: true,
        tabs: true,
        tabsIcon: true
    }),
    actions: {
        setGlobalState(...args: ObjToKeyValArray<IGlobalState>) {
            this.$patch({ [args[0]]: args[1] })
        }
    }
})
