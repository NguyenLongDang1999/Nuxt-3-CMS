<script setup lang="ts">

// ** Types Imports
import type { IBrand } from '~/types/brand.type'
import type { ITableColumn } from '~/types/core.type'

// ** Data
const input = ref('')
const createDialog = ref<boolean>(false)

// ** useHooks
const { t } = useI18n()
const { search, path } = useBrand()
const { path: pathCategory } = useCategory()
const { isLoading, brandTable, brandAggregations } = useBrandTable()
const { brandDelete } = useBrandDelete()

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
        .then(() => brandDelete(id))
}
</script>

<template>
    <ElCard shadow="never">
        <template #header>
            <div class="flex justify-between">
                <h5 class="text-xl font-medium leading-none tracking-tight text-dark capitalize">
                    {{ $t('Brand.Manager') }}
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
                    :data="brandTable"
                    :empty-text="$t('Empty.NoData')"
                    border
                    class="w-full"
                    header-cell-class-name="uppercase text-xs"
                >
                    <ElTableColumn
                        :label="$t('Brand.Name')"
                        min-width="250px"
                    >
                        <template #default="scope: ITableColumn<IBrand>">
                            <NuxtLink
                                :to="`${ROUTER.BRAND}/${scope.row.id}`"
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
                        :label="$t('Category.Index')"
                        min-width="250px"
                    >
                        <template #default="scope: ITableColumn<IBrand>">
                            <NuxtLink
                                v-if="scope.row.Category"
                                :to="`${ROUTER.CATEGORY}/${scope.row.Category.id}`"
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
                                        :src="getImageFile(pathCategory, scope.row.Category.image_uri)"
                                    />

                                    <span text="capitalize blue-600">{{ scope.row.Category.name }}</span>
                                </div>
                            </NuxtLink>
                        </template>
                    </ElTableColumn>

                    <ElTableColumn
                        :label="$t('Status.Name')"
                        width="100px"
                        align="center"
                    >
                        <template #default="scope: ITableColumn<IBrand>">
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
                        <template #default="scope: ITableColumn<IBrand>">
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
                        <template #default="scope: ITableColumn<IBrand>">
                            {{ formatDateTime(scope.row.created_at) }}
                        </template>
                    </ElTableColumn>

                    <ElTableColumn
                        :label="$t('Updated_at')"
                        width="180px"
                    >
                        <template #default="scope: ITableColumn<IBrand>">
                            {{ formatDateTime(scope.row.updated_at) }}
                        </template>
                    </ElTableColumn>

                    <ElTableColumn
                        :label="$t('Action')"
                        width="110px"
                    >
                        <template #default="scope: ITableColumn<IBrand>">
                            <ElButton
                                circle
                                type="warning"
                                :icon="ElIconEdit"
                                @click="navigateTo(`${ROUTER.BRAND}/${scope.row.id}`)"
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
                    :total="brandAggregations"
                    @current-change="val => search.page = val"
                />
            </ElCol>
        </ElRow>

        <LazyBrandCreateForm v-model="createDialog" />
    </ElCard>
</template>
