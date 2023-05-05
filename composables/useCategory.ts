// ** Third Party Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Configs Imports
import { _fetcher } from '~/configs/fetcher'

// ** Types Imports
import type { UploadFile, UploadRawFile } from 'element-plus'
import type { ICategoryFormInput, ICategorySearch, ICategoryTable } from '~/types/category.type'
import type { ICategoryList } from '~/types/core.type'

// ** State
const path = ref<string>(ROUTE.CATEGORY)
const imageURL = ref<UploadFile>()

const search = reactive<ICategorySearch>({
    page: PAGE.CURRENT,
    pageSize: PAGE.SIZE,
    name: undefined,
    parent_id: undefined,
    status: undefined,
    popular: undefined
})

export const useCategory = () => {
    return {
        path,
        search,
        imageURL
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

export const useCategoryTable = (params?: ICategorySearch) => {
    // ** Hooks
    const { data, isLoading } = useQuery<ICategoryTable>({
        queryKey: ['categoryTable', params],
        queryFn: () => _fetcher(`${path.value}`, { params }),
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

export const useCategoryFormInput = (id?: string) => {
    // ** Hooks
    const { t } = useI18n()
    const queryClient = useQueryClient()

    const { isLoading, mutateAsync: createCategory } = useMutation(
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
        isLoading,
        createCategory
    }
}
