<template>
    <ElRow
        :gutter="12"
        grid="gap-y-3"
    >
        <ElCol :span="24">
            <LazyThePageTitle :title="$t('Brand.Manager')" />
        </ElCol>

        <ElCol :span="24">
            <LazyBrandSearchForm />
        </ElCol>

        <ElCol :span="24">
            <LazyBrandDataList />
        </ElCol>
    </ElRow>
</template>
