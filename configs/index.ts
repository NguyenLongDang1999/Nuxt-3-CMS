const env = useRuntimeConfig()

export const config = {
    baseURL: env.public.apiBase,
    uploadCDN: env.public.uploadCdn,
    previewCDN: env.public.previewCdn,
    bunnyAK: env.public.bunnyAccessKey
}
