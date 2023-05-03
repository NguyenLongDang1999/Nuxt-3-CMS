export const constantRoutes: Menu.MenuOptions[] = [
    {
        path: '/',
        name: 'Dashboard',
        meta: {
            isAffix: true,
            isFull: false,
            isHide: false,
            isKeepAlive: true,
            title: 'Dashboard',
            icon: 'ep:home-filled'
        }
    },
    {
        path: '/product',
        name: 'Product',
        meta: {
            isAffix: true,
            isFull: false,
            isHide: false,
            isKeepAlive: true,
            title: 'Product',
            icon: 'ep:shopping-cart'
        },
        children: [
            {
                path: '/product/category',
                name: 'Category',
                meta: {
                    isAffix: false,
                    isFull: false,
                    isHide: true,
                    isKeepAlive: true,
                    title: 'Category',
                    icon: 'tabler:category'
                }
            }
        ]
    }
]
