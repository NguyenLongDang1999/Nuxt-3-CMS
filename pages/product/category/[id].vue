<script setup lang="ts">

// ** useHooks
const route = useRoute()

// ** Data
const id = route.params.id as string

// ** useHooks
const { category } = useCategoryDetail(id)
</script>

<template>
    <ElRow
        :gutter="12"
        grid="gap-y-3"
    >
        <ElCol :span="24">
            <LazyThePageTitle :title="`${$t('Category.Update')}: ${category?.name}`" />
        </ElCol>

        <ElCol :span="24">
            <ElTabs type="border-card">
                <ElTabPane :label="$t('Information')">
                    <CategoryUpdateForm
                        :id="id"
                        :category="category"
                    />
                </ElTabPane>

                <ElTabPane label="Config">
                    Config
                </ElTabPane>
            </ElTabs>
        </ElCol>
    </ElRow>
</template>
