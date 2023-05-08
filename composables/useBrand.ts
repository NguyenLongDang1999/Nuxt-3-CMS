// ** Third Party Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Configs Imports
import { _fetcher } from '~/configs/fetcher'

// ** Types Imports
import type { UploadRawFile } from 'element-plus'
import type { IBrandFormInput, IBrandSearch, IBrandTable } from '~/types/brand.type'

// ** State
const path = ref<string>(ROUTE.BRAND)

const search = reactive<IBrandSearch>({
    page: PAGE.CURRENT,
    pageSize: PAGE.SIZE
})

export const useBrand = () => {
    return {
        path,
        search
    }
}

export const useBrandTable = (params?: IBrandSearch) => {
    // ** Hooks
    const { data, isLoading } = useQuery<IBrandTable>({
        queryKey: ['brandTable', params],
        queryFn: () => _fetcher(`${path.value}`, { params }),
        keepPreviousData: true
    })

    // ** Computed
    const brandTable = computed(() => data.value?.data || [])
    const brandAggregations = computed(() => data.value?.aggregations || 0)

    return {
        isLoading,
        brandTable,
        brandAggregations
    }
}

export const useBrandDetail = (id: string) => {
    // ** Hooks
    const { data, isLoading } = useQuery<IBrandFormInput>({
        queryKey: ['brandDetail', id],
        queryFn: () => _fetcher(`${path.value}/${id}`)
    })

    // ** Computed
    const brand = computed(() => data.value as IBrandFormInput)

    return {
        brand,
        isLoading
    }
}

export const useBrandFormInput = (id?: string) => {
    // ** Hooks
    const { t } = useI18n()
    const { imageURL } = useUpload()
    const queryClient = useQueryClient()

    const { isLoading, mutateAsync: brandFormInput } = useMutation(
        async (body: IBrandFormInput) => {
            body.slug = slugify(body.name)

            if (!!imageURL.value) {
                body.image_uri = body.slug + '.' + getExtensionFile(imageURL.value.name)

                const uploadURL = `${path.value}/${body.image_uri}`

                await useUploadFile(uploadURL, imageURL.value.raw as UploadRawFile)
            }

            imageURL.value = undefined

            return id ?
                _fetcher(`${path.value}/${id}`, { method: 'PATCH', body }) :
                _fetcher(`${path.value}`, { method: 'POST', body })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['brandList'] })
                queryClient.invalidateQueries({ queryKey: ['brandTable'] })
                if (id) queryClient.invalidateQueries({ queryKey: ['brandDetail', id] })

                ElNotification({
                    title: t('Message.Title.Success'),
                    message: t('Message.Success'),
                    type: MESSAGE.SUCCESS
                })
            },
            onError: () => ElNotification({
                title: t('Message.Title.Error'),
                message: t('Message.Error'),
                type: MESSAGE.ERROR
            })
        })

    return {
        isLoading,
        brandFormInput
    }
}

export const useBrandDelete = () => {
    // ** Hooks
    const { t } = useI18n()
    const queryClient = useQueryClient()

    const { mutateAsync: brandDelete } = useMutation(
        (id: string) => _fetcher(`${path.value}/delete/${id}`, { method: 'PATCH' }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['brandList'] })
                queryClient.invalidateQueries({ queryKey: ['brandTable'] })

                ElNotification({
                    title: t('Message.Title.Success'),
                    message: t('Message.Success'),
                    type: MESSAGE.SUCCESS
                })
            },
            onError: () => ElNotification({
                title: t('Message.Title.Error'),
                message: t('Message.Error'),
                type: MESSAGE.ERROR
            })
        })

    return {
        brandDelete
    }
}
