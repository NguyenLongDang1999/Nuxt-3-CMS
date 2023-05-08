<script setup lang="ts">

// ** Types Imports
import type { IAttribute } from '~/types/attribute.type'
import type { ITableColumn } from '~/types/core.type'

// ** Data
const createDialog = ref<boolean>(false)

// ** useHooks
const { t } = useI18n()
const { search, path } = useAttribute()
const { isLoading, attributeTable, attributeAggregations } = useAttributeTable()
const { attributeDelete } = useAttributeDelete()

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
        .then(() => attributeDelete(id))
}
</script>

<template>
    <ElCard shadow="never">
        <template #header>
            <div class="flex justify-between">
                <h5 class="text-xl font-medium leading-none tracking-tight text-dark capitalize">
                    {{ $t('Attribute.Manager') }}
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
                    :data="attributeTable"
                    :empty-text="$t('Empty.NoData')"
                    border
                    class="w-full"
                    header-cell-class-name="uppercase text-xs"
                >
                    <ElTableColumn
                        :label="$t('Attribute.Name')"
                        min-width="250px"
                    >
                        <template #default="scope: ITableColumn<IAttribute>">
                            <NuxtLink
                                :to="`${ROUTER.ATTRIBUTE}/${scope.row.id}`"
                                display="inline-block"
                            >
                                <span text="capitalize blue-600">{{ scope.row.name }}</span>
                            </NuxtLink>
                        </template>
                    </ElTableColumn>

                    <ElTableColumn
                        :label="$t('Category.Index')"
                        min-width="250px"
                    >
                        <template #default="scope: ITableColumn<IAttribute>">
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
                                        :src="getImageFile(path, scope.row.Category.image_uri)"
                                    />

                                    <span text="capitalize blue-600">{{ scope.row.Category.name }}</span>
                                </div>
                            </NuxtLink>
                        </template>
                    </ElTableColumn>

                    <ElTableColumn
                        :label="$t('Variant.Value')"
                        min-width="250px"
                    >
                        <template #default="scope: ITableColumn<IAttribute>">
                            <div class="flex flex-wrap gap-2">
                                <ElTag
                                    v-for="(item, index) in scope.row.Variations"
                                    :key="index"
                                    effect="plain"
                                    round
                                >
                                    {{ item.name }}
                                </ElTag>
                            </div>
                        </template>
                    </ElTableColumn>

                    <ElTableColumn
                        :label="$t('Created_at')"
                        width="180px"
                    >
                        <template #default="scope: ITableColumn<IAttribute>">
                            {{ formatDateTime(scope.row.created_at) }}
                        </template>
                    </ElTableColumn>

                    <ElTableColumn
                        :label="$t('Updated_at')"
                        width="180px"
                    >
                        <template #default="scope: ITableColumn<IAttribute>">
                            {{ formatDateTime(scope.row.updated_at) }}
                        </template>
                    </ElTableColumn>

                    <ElTableColumn
                        :label="$t('Action')"
                        width="110px"
                    >
                        <template #default="scope: ITableColumn<IAttribute>">
                            <ElButton
                                circle
                                type="warning"
                                :icon="ElIconEdit"
                                @click="navigateTo(`${ROUTER.ATTRIBUTE}/${scope.row.id}`)"
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
                    :total="attributeAggregations"
                    @current-change="val => search.page = val"
                />
            </ElCol>
        </ElRow>

        <LazyAttributeCreateForm v-model="createDialog" />
    </ElCard>
</template>
