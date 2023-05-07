<script setup lang="ts">

// ** Types Imports
import type { ICategory } from '~/types/category.type'
import type { ITableColumn } from '~/types/core.type'

// ** Data
const createDialog = ref<boolean>(false)

// ** useHooks
const { t } = useI18n()
const { search, path } = useCategory()
const { isLoading, categoryTable, categoryAggregations } = useCategoryTable(search)
const { categoryDelete } = useCategoryDelete()


// ** Methods
const handleDelete = (id: string) => {
    ElMessageBox
        .confirm(
            t('Message.Content'),
            t('Message.Confirm'),
            {
                confirmButtonText: t('Btn.OK'),
                cancelButtonText: t('Btn.Cancel'),
                type: 'warning'
            }
        )
        .then(() => categoryDelete(id))
}
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
                    v-loading="isLoading"
                    :data="categoryTable"
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
                            <NuxtLink
                                :to="`/product/category/${scope.row.id}`"
                                display="inline-block"
                            >
                                <div
                                    display="flex"
                                    align="items-center"
                                    grid="gap-3"
                                >
                                    <ElAvatar
                                        fit="cover"
                                        :size="40"
                                        :src="getImageFile(path, scope.row.image_uri)"
                                    />

                                    <span text="capitalize blue-600">{{ scope.row.name }}</span>
                                </div>
                            </NuxtLink>
                        </template>
                    </ElTableColumn>

                    <ElTableColumn
                        :label="$t('Category.Parent')"
                        min-width="250px"
                    >
                        <template #default="scope: ITableColumn<ICategory>">
                            <NuxtLink
                                v-if="scope.row.parentCategory"
                                :to="`/product/category/${scope.row.parentCategory.id}`"
                                display="inline-block"
                            >
                                <div
                                    display="flex"
                                    align="items-center"
                                    grid="gap-3"
                                >
                                    <ElAvatar
                                        fit="cover"
                                        :size="40"
                                        :src="getImageFile(path, scope.row.parentCategory.image_uri)"
                                    />

                                    <span text="capitalize blue-600">{{ scope.row.parentCategory.name }}</span>
                                </div>
                            </NuxtLink>
                        </template>
                    </ElTableColumn>

                    <ElTableColumn
                        :label="$t('Status.Name')"
                        width="100px"
                        align="center"
                    >
                        <template #default="scope: ITableColumn<ICategory>">
                            <Component
                                :is="valueTransform(optionStatus(), scope.row.status)?.icon"
                                :class="valueTransform(optionStatus(), scope.row.status)?.class"
                            />
                        </template>
                    </ElTableColumn>

                    <ElTableColumn
                        :label="$t('Popular.Name')"
                        width="100px"
                        align="center"
                    >
                        <template #default="scope: ITableColumn<ICategory>">
                            <Component
                                :is="valueTransform(optionPopular(), scope.row.popular)?.icon"
                                :class="valueTransform(optionPopular(), scope.row.popular)?.class"
                            />
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

                    <ElTableColumn
                        :label="$t('Action')"
                        width="110px"
                    >
                        <template #default="scope: ITableColumn<ICategory>">
                            <ElButton
                                circle
                                type="warning"
                                :icon="ElIconEdit"
                                @click="$router.push({ path: `/product/category/${scope.row.id}` })"
                            />

                            <ElButton
                                circle
                                type="danger"
                                :icon="ElIconDelete"
                                @click="handleDelete(scope.row.id)"
                            />
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
