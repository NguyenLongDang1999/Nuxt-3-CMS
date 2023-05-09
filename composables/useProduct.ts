// ** Third Party Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Configs Imports
import { _fetcher } from '~/configs/fetcher'

// ** Types Imports
import type { UploadRawFile } from 'element-plus'
import type { IProductFormInput, IProductSearch, IProductTable } from '~/types/product.type'

// ** State
const path = ref<string>(ROUTE.PRODUCT)

const search = reactive<IProductSearch>({
    page: PAGE.CURRENT,
    pageSize: PAGE.SIZE
})

export const useProduct = () => {
    return {
        path,
        search
    }
}

export const useProductTable = () => {
    // ** Hooks
    const { data, isLoading } = useQuery<IProductTable>({
        queryKey: ['productTable', search],
        queryFn: () => _fetcher(`${path.value}`, { params: search }),
        keepPreviousData: true
    })

    // ** Computed
    const productTable = computed(() => data.value?.data || [])
    const productAggregations = computed(() => data.value?.aggregations || 0)

    return {
        isLoading,
        productTable,
        productAggregations
    }
}

export const useProductDetail = (id: string) => {
    // ** Hooks
    const { data, isLoading } = useQuery<IProductFormInput>({
        queryKey: ['productDetail', id],
        queryFn: () => _fetcher(`${path.value}/${id}`)
    })

    // ** Computed
    const product = computed(() => data.value as IProductFormInput)

    return {
        product,
        isLoading
    }
}

export const useProductFormInput = (id?: string) => {
    // ** Hooks
    const { t } = useI18n()
    const { imageURL } = useUpload()
    const queryClient = useQueryClient()

    const { isLoading, mutateAsync: productFormInput } = useMutation(
        async (body: IProductFormInput) => {
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
                queryClient.refetchQueries({ queryKey: ['productTable'] })
                if (id) queryClient.invalidateQueries({ queryKey: ['productDetail', id] })

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
        productFormInput
    }
}

export const useProductDelete = () => {
    // ** Hooks
    const { t } = useI18n()
    const queryClient = useQueryClient()

    const { mutateAsync: productDelete } = useMutation(
        (id: string) => _fetcher(`${path.value}/delete/${id}`, { method: 'PATCH' }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['productTable'] })

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
        productDelete
    }
}
