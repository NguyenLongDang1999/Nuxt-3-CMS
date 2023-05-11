<script setup lang="ts">

// ** useHooks
const route = useRoute()

// ** Data
const id = route.params.id as string

// ** useHooks
const { product, isLoading } = useProductDetail(id)
</script>

<template>
    <ElRow
        :gutter="12"
        grid="gap-y-3"
    >
        <ElCol :span="24">
            <LazyThePageTitle :title="`${$t('Product.Update')}: ${product?.name}`" />
        </ElCol>

        <ElCol :span="24">
            <ElTabs type="border-card">
                <ElTabPane
                    v-loading="isLoading"
                    :label="$t('Information')"
                >
                    <ProductUpdateForm
                        :id="id"
                        :product="product"
                    />
                </ElTabPane>

                <ElTabPane label="Config">
                    Config
                </ElTabPane>
            </ElTabs>
        </ElCol>
    </ElRow>
</template>
