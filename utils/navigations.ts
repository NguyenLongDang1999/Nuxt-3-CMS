import type { RouterTypes } from '~/types/basic'

export const constantRoutes: RouterTypes = [
    {
        path: '/',
        name: 'Dashboard',
        meta: {
            title: 'Dashboard',
            icon: 'ep:house'
        }
    },
    {
        path: '/product',
        children: [
            {
                path: 'category',
                name: 'Category',
                meta: { title: 'Category', icon: 'tabler:category' }
            }
        ]
    }
]
