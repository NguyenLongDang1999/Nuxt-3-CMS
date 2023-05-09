// ** Third Party Imports
import { useQueries } from '@tanstack/vue-query'

// ** Configs Imports
import { _fetcher } from '~/configs/fetcher'

// ** State
const path = ref<string>(ROUTE.VARIANT)

export const useVariantList = () => {
    // ** useHooks
    const { attribute_id } = useAttribute()

    // ** Computed
    const attributeData = computed(() => attribute_id.value.map(id => ({
        queryKey: ['variantList', id],
        queryFn: () => _fetcher(`${path.value}/fetch-list/${id}`),
        enabled: !!id
    })))

    const results = useQueries({
        queries: attributeData
    })

    return {
        variantList: results
    }
}
