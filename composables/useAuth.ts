// ** Third Party Imports
import { useMutation, useQuery } from '@tanstack/vue-query'

// ** Configs Imports
import { _fetcher } from '~/configs/fetcher'

// ** Types Imports
import type { IAuthLogin } from '~/types/auth.type'

// ** State
const path = ref<string>(ROUTE.AUTH)

export const useAuthLogin = () => {
    // ** Hooks
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()

    const { isLoading, mutateAsync: authLogin } = useMutation(
        (body: IAuthLogin) => _fetcher(`${path.value}/sign-in`, { method: 'POST', body }),
        {
            onSuccess: data => {
                setToken(data.accessToken)
                setUserData(data.admins)
                router.replace(route.query.to ? String(route.query.to) : '/')
            },
            onError: () => ElNotification({
                title: t('Message.Title.Error'),
                message: t('Message.Error'),
                type: MESSAGE.ERROR
            })
        })

    return {
        isLoading,
        authLogin
    }
}

export const useAuthLogout = () => {
    // ** Hooks
    const { refetch } = useQuery({
        queryKey: ['authLogout'],
        queryFn: () => _fetcher(`${path.value}/logout`),
        enabled: false,
        onSuccess: () => {
            const router = useRouter()

            removeToken()
            removeUserData()

            router.push(ROUTER.LOGIN)
        }
    })

    return {
        refetch
    }
}
