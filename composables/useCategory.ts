// ** Third Party Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Configs Imports
import { _fetcher } from '~/configs/fetcher'

// ** Types Imports
import type { UploadRawFile } from 'element-plus'
import type { ICategoryFormInput, ICategorySearch, ICategoryTable } from '~/types/category.type'
import type { ICategoryList } from '~/types/core.type'

// ** State
const path = ref<string>(ROUTE.CATEGORY)
const category_id = ref<string>('')

const search = reactive<ICategorySearch>({
    page: PAGE.CURRENT,
    pageSize: PAGE.SIZE
})

export const useCategory = () => {
    return {
        path,
        search,
        category_id
    }
}

export const useCategoryList = () => {
    // ** Hooks
    const { data } = useQuery<ICategoryList[]>({
        queryKey: ['categoryList'],
        queryFn: () => _fetcher(`${path.value}/fetch-list`)
    })

    // ** Computed
    const categoryList = computed(() => data.value || [])

    return { categoryList }
}

export const useCategoryTable = () => {
    // ** Hooks
    const { data, isLoading } = useQuery<ICategoryTable>({
        queryKey: ['categoryTable', search],
        queryFn: () => _fetcher(`${path.value}`, { params: search }),
        keepPreviousData: true
    })

    // ** Computed
    const categoryTable = computed(() => data.value?.data || [])
    const categoryAggregations = computed(() => data.value?.aggregations || 0)

    return {
        isLoading,
        categoryTable,
        categoryAggregations
    }
}

export const useCategoryDetail = (id: string) => {
    // ** Hooks
    const { data, isLoading } = useQuery<ICategoryFormInput>({
        queryKey: ['categoryDetail', id],
        queryFn: () => _fetcher(`${path.value}/${id}`)
    })

    // ** Computed
    const category = computed(() => data.value as ICategoryFormInput)

    return {
        category,
        isLoading
    }
}

export const useCategoryFormInput = (id?: string) => {
    // ** Hooks
    const { t } = useI18n()
    const { imageURL } = useUpload()
    const queryClient = useQueryClient()

    const { isLoading, mutateAsync: categoryFormInput } = useMutation(
        async (body: ICategoryFormInput) => {
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
                queryClient.refetchQueries({ queryKey: ['categoryTable'] })
                queryClient.invalidateQueries({ queryKey: ['categoryList'] })
                if (id) queryClient.invalidateQueries({ queryKey: ['categoryDetail', id] })

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
        categoryFormInput
    }
}

export const useCategoryDelete = () => {
    // ** Hooks
    const { t } = useI18n()
    const queryClient = useQueryClient()

    const { mutateAsync: categoryDelete } = useMutation(
        (id: string) => _fetcher(`${path.value}/delete/${id}`, { method: 'PATCH' }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['categoryList'] })
                queryClient.invalidateQueries({ queryKey: ['categoryTable'] })

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
        categoryDelete
    }
}
