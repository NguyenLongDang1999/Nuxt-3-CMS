// ** Third Party Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Configs Imports
import { _fetcher } from '~/configs/fetcher'

// ** Types Imports
import type { IAttributeFormInput, IAttributeSearch, IAttributeTable } from '~/types/attribute.type'
import type { IAttributeList } from '~/types/core.type'

// ** State
const path = ref<string>(ROUTE.ATTRIBUTE)
const attribute_id = ref<string[]>([])

const search = reactive<IAttributeSearch>({
    page: PAGE.CURRENT,
    pageSize: PAGE.SIZE
})

export const useAttribute = () => {
    return {
        path,
        search,
        attribute_id
    }
}

export const useAttributeList = () => {
    const { category_id } = useCategory()
    const enabled = computed(() => !!category_id.value)

    // ** Hooks
    const { data } = useQuery<IAttributeList[]>({
        queryKey: ['attributeList', category_id],
        queryFn: () => _fetcher(`${path.value}/fetch-list/${category_id.value}`),
        enabled
    })

    // ** Computed
    const attributeList = computed(() => data.value || [])

    return { attributeList }
}

export const useAttributeTable = () => {
    // ** Hooks
    const { data, isLoading } = useQuery<IAttributeTable>({
        queryKey: ['attributeTable', search],
        queryFn: () => _fetcher(`${path.value}`, { params: search }),
        keepPreviousData: true
    })

    // ** Computed
    const attributeTable = computed(() => data.value?.data || [])
    const attributeAggregations = computed(() => data.value?.aggregations || 0)

    return {
        isLoading,
        attributeTable,
        attributeAggregations
    }
}

export const useAttributeDetail = (id: string) => {
    // ** Hooks
    const { data, isLoading } = useQuery<IAttributeFormInput>({
        queryKey: ['attributeDetail', id],
        queryFn: () => _fetcher(`${path.value}/${id}`)
    })

    // ** Computed
    const attribute = computed(() => data.value as IAttributeFormInput)

    return {
        attribute,
        isLoading
    }
}

export const useAttributeFormInput = (id?: string) => {
    // ** Hooks
    const { t } = useI18n()
    const queryClient = useQueryClient()

    const { isLoading, mutateAsync: attributeFormInput } = useMutation(
        async (body: IAttributeFormInput) => {
            body.slug = slugify(body.name)

            return id ?
                _fetcher(`${path.value}/${id}`, { method: 'PATCH', body }) :
                _fetcher(`${path.value}`, { method: 'POST', body })
        },
        {
            onSuccess: () => {
                queryClient.refetchQueries({ queryKey: ['attributeTable'] })
                if (id) queryClient.invalidateQueries({ queryKey: ['attributeDetail', id] })

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
        attributeFormInput
    }
}

export const useAttributeDelete = () => {
    // ** Hooks
    const { t } = useI18n()
    const queryClient = useQueryClient()

    const { mutateAsync: attributeDelete } = useMutation(
        (id: string) => _fetcher(`${path.value}/delete/${id}`, { method: 'PATCH' }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['attributeTable'] })

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
        attributeDelete
    }
}
