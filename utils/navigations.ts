export const constantRoutes: Menu.MenuOptions[] = [
    {
        path: '/',
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
        path: '/product',
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
                path: '/product/category',
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
                path: '/product/brand',
                name: 'Brand',
                meta: {
                    isAffix: false,
                    isFull: false,
                    isHide: true,
                    isKeepAlive: true,
                    title: 'Navigation.Brand',
                    icon: 'tabler:trademark'
                }
            }
        ]
    }
]
