// ** Third Party Imports
import { ofetch } from 'ofetch'

// ** Configs Imports
import { config } from '~/configs'

let isRefreshing = false

export const _fetcher = ofetch.create({
    baseURL: config.baseURL,
    credentials: 'include',
    headers: {
        Accept: 'application/json'
    },
    retry: 1,
    keepalive: true,
    onRequest: ({ request, options }) => {
        if (request !== 'auth/sign-in') {
            const auth = JSON.parse(getToken() || 'null')

            options.headers = new Headers(options.headers)
            options.headers.set('Authorization', `Bearer ${auth}`)
        }
    },
    onResponseError: async ({ request, response, options }) => {
        if (
            response.status === 401 &&
            !isRefreshing
        ) {
            isRefreshing = true

            try {
                const data  = await _fetcher('/auth/refresh')

                setToken(data.accessToken)
                isRefreshing = false
            } catch (error) {
                const router = useRouter()

                removeToken()
                removeUserData()
                router.push({ path: '/auth/login' })
            }
        }
    }
})
