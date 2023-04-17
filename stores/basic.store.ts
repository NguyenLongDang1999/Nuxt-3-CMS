// ** Configs Imports
import defaultSettings from '@/configs/settings'

export const useBasicStore = defineStore('basic', {
    state: () => {
        return {
            sidebar: { opened: true },
            settings: defaultSettings
        }
    },
    actions: {
        setSidebarOpen(data: boolean) {
            this.$patch(state => {
                state.sidebar.opened = data
            })
        },
        setToggleSideBar() {
            this.$patch(state => {
                state.sidebar.opened = !state.sidebar.opened
            })
        }
    }
})
