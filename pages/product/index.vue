<template>
    <ElRow
        :gutter="12"
        grid="gap-y-3"
    >
        <ElCol :span="24">
            <LazyThePageTitle :title="$t('Product.Manager')" />
        </ElCol>

        <ElCol :span="24">
            <LazyProductSearchForm />
        </ElCol>

        <ElCol :span="24">
            <LazyProductDataList />
        </ElCol>
    </ElRow>
</template>
