export const constantRoutes: Menu.MenuOptions[] = [
    {
        path: ROUTER.DASHBOARD,
        name: 'Dashboard',
        meta: {
            isAffix: true,
            isFull: false,
            isHide: false,
            isKeepAlive: true,
            title: 'Navigation.Dashboard',
            icon: 'ep:home-filled'
        }
    },
    {
        path: ROUTER.PRODUCT,
        name: 'Product',
        meta: {
            isAffix: true,
            isFull: false,
            isHide: false,
            isKeepAlive: true,
            title: 'Navigation.Product',
            icon: 'ep:shopping-cart'
        },
        children: [
            {
                path: ROUTER.CATEGORY,
                name: 'Category',
                meta: {
                    isAffix: false,
                    isFull: false,
                    isHide: true,
                    isKeepAlive: true,
                    title: 'Navigation.Category',
                    icon: 'tabler:category'
                }
            },
            {
                path: ROUTER.BRAND,
                name: 'Brand',
                meta: {
                    isAffix: false,
                    isFull: false,
                    isHide: true,
                    isKeepAlive: true,
                    title: 'Navigation.Brand',
                    icon: 'tabler:trademark'
                }
            },
            {
                path: ROUTER.ATTRIBUTE,
                name: 'Attribute',
                meta: {
                    isAffix: false,
                    isFull: false,
                    isHide: true,
                    isKeepAlive: true,
                    title: 'Navigation.Attribute',
                    icon: 'ep:collection'
                }
            }
        ]
    }
]
