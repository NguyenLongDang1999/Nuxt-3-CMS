<template>
    <ElRow
        :gutter="12"
        grid="gap-y-3"
    >
        <ElCol :span="24">
            <LazyCategorySearchForm />
        </ElCol>

        <ElCol :span="24">
            <LazyCategoryDataList />
        </ElCol>
    </ElRow>
</template>
