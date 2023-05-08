<template>
    <ElRow
        :gutter="12"
        grid="gap-y-3"
    >
        <ElCol :span="24">
            <LazyThePageTitle :title="$t('Attribute.Manager')" />
        </ElCol>

        <ElCol :span="24">
            <LazyAttributeSearchForm />
        </ElCol>

        <ElCol :span="24">
            <LazyAttributeDataList />
        </ElCol>
    </ElRow>
</template>
