export function isExternal(path: string): boolean {
    return /^(https?:|mailto:|tel:)/.test(path)
}

export function resizeHandler() {
    const { body } = document
    const WIDTH = 992
    const basicStore = useBasicStore()

    const isMobile = () => {
        const rect = body.getBoundingClientRect()

        return rect.width - 1 < WIDTH
    }

    const resizeHandlers = () => {
        if (!document.hidden) {
            basicStore.setSidebarOpen(isMobile() ? false : true)
        }
    }

    onBeforeMount(() => {
        window.addEventListener('resize', resizeHandlers)
    })

    onMounted(() => {
        basicStore.setSidebarOpen(isMobile() ? false : true)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', resizeHandlers)
    })
}
