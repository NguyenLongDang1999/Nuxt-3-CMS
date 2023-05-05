<script setup lang="ts">

// ** Types Imports
import type { ICategory } from '~/types/category.type'
import type { ITableColumn } from '~/types/core.type'

// ** Data
const createDialog = ref<boolean>(false)

// ** useHooks
const { search } = useCategory()
const { isLoading, categoryTable, categoryAggregations } = useCategoryTable(search)
</script>

<template>
    <ElCard shadow="never">
        <template #header>
            <div class="flex justify-between">
                <h5 class="text-xl font-medium leading-none tracking-tight text-dark capitalize">
                    {{ $t('Category.Manager') }}
                </h5>

                <ElButton
                    type="primary"
                    :icon="ElIconPlus"
                    @click="createDialog = true"
                >
                    {{ $t('Btn.Create') }}
                </ElButton>
            </div>
        </template>

        <ElRow
            :gutter="12"
            grid="gap-y-3"
        >
            <ElCol :span="24">
                <ElTable
                    :data="categoryTable"
                    :loading="isLoading"
                    :empty-text="$t('Empty.NoData')"
                    border
                    class="w-full"
                    header-cell-class-name="uppercase text-xs"
                >
                    <ElTableColumn
                        :label="$t('Category.Name')"
                        min-width="250px"
                    >
                        <template #default="scope: ITableColumn<ICategory>">
                            <div
                                display="flex"
                                align="items-center"
                                grid="gap-3"
                            >
                                <ElAvatar
                                    fit="cover"
                                    :size="30"
                                    :src="scope.row.image_uri"
                                />

                                <span text="capitalize">{{ scope.row.name }}</span>
                            </div>
                        </template>
                    </ElTableColumn>

                    <ElTableColumn
                        :label="$t('Category.Parent')"
                        min-width="250px"
                    >
                        <template #default="scope: ITableColumn<ICategory>">
                            <div
                                v-if="scope.row.parentCategory"
                                display="flex"
                                align="items-center"
                                grid="gap-3"
                            >
                                <ElAvatar
                                    fit="cover"
                                    :size="30"
                                    :src="scope.row.parentCategory.image_uri"
                                />

                                <span text="capitalize">{{ scope.row.parentCategory.name }}</span>
                            </div>
                        </template>
                    </ElTableColumn>

                    <ElTableColumn
                        :label="$t('Created_at')"
                        width="180px"
                    >
                        <template #default="scope: ITableColumn<ICategory>">
                            {{ formatDateTime(scope.row.created_at) }}
                        </template>
                    </ElTableColumn>

                    <ElTableColumn
                        :label="$t('Updated_at')"
                        width="180px"
                    >
                        <template #default="scope: ITableColumn<ICategory>">
                            {{ formatDateTime(scope.row.updated_at) }}
                        </template>
                    </ElTableColumn>
                </ElTable>
            </ElCol>

            <ElCol :span="24">
                <ElPagination
                    background
                    layout="prev, pager, next"
                    :page-size="search.pageSize"
                    :total="categoryAggregations"
                    @current-change="val => search.page = val"
                />
            </ElCol>
        </ElRow>

        <LazyCategoryCreateForm v-model="createDialog" />
    </ElCard>
</template>
