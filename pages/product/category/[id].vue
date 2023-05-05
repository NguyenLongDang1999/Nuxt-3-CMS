<script setup lang="ts">

// ** useHooks
const route = useRoute()

// ** Data
const id = route.params.id as string
</script>

<template>
    <ElRow
        :gutter="12"
        grid="gap-y-3"
    >
        <ElCol :span="24">
            <ElTabs type="border-card">
                <ElTabPane :label="$t('Category.Update')">
                    <LazyCategoryUpdateForm :id="id" />
                </ElTabPane>

                <ElTabPane label="Config">
                    Config
                </ElTabPane>
            </ElTabs>
        </ElCol>
    </ElRow>
</template>
