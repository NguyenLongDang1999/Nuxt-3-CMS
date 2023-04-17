// ** Third Party Imports
import { useQuery } from '@tanstack/vue-query'

// ** Configs Imports
import { _fetcher } from '~/configs/fetcher'

// ** Types Imports
import type { ICategorySearch, ICategoryTable } from '~/types/category.type'
import type { ICategoryList } from '~/types/core.type'

// ** State
const path = ref<string>(ROUTE.CATEGORY)

const search = reactive<ICategorySearch>({
    name: undefined,
    parent_id: undefined,
    status: undefined,
    popular: undefined
})

export const useCategory = () => {
    return {
        path,
        search
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
        queryFn: () => _fetcher(`${path.value}`, { params })
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
