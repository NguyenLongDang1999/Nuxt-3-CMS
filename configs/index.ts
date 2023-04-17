const env = useRuntimeConfig()

export const config = {
    baseURL: env.public.apiBase
}
