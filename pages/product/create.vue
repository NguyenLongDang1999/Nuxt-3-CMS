<template>
    <ElRow
        :gutter="12"
        grid="gap-y-3"
    >
        <ElCol :span="24">
            <LazyThePageTitle :title="$t('Product.Create')" />
        </ElCol>

        <ElCol :span="24">
            <LazyProductCreateForm />
        </ElCol>
    </ElRow>
</template>
