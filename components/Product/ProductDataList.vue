<script setup lang="ts">

// ** Types Imports
import type { ITableColumn } from '~/types/core.type'
import type { IProduct } from '~/types/product.type'

// ** Data
const createDialog = ref<boolean>(false)

// ** useHooks
const { t } = useI18n()
const { search, path } = useProduct()
const { path: pathBrand } = useBrand()
const { path: pathCategory } = useCategory()
const { isLoading, productTable, productAggregations } = useProductTable()
const { productDelete } = useProductDelete()

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
        .then(() => productDelete(id))
}
</script>

<template>
    <ElCard shadow="never">
        <template #header>
            <div class="flex justify-between">
                <h5 class="text-xl font-medium leading-none tracking-tight text-dark capitalize">
                    {{ $t('Product.Manager') }}
                </h5>

                <ElButton
                    type="primary"
                    :icon="ElIconPlus"
                    @click="navigateTo(ROUTER.PRODUCT_CREATE)"
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
                    :data="productTable"
                    :empty-text="$t('Empty.NoData')"
                    border
                    class="w-full"
                    header-cell-class-name="uppercase text-xs"
                >
                    <ElTableColumn
                        :label="$t('Product.Name')"
                        min-width="250px"
                    >
                        <template #default="scope: ITableColumn<IProduct>">
                            <NuxtLink
                                :to="`${ROUTER.PRODUCT}/${scope.row.id}`"
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

                                    <div>
                                        <span text="capitalize blue-600">{{ scope.row.name }}</span>
                                        <span
                                            text="gray-400 xs"
                                            display="block"
                                        >
                                            {{ scope.row.sku }}
                                        </span>
                                    </div>
                                </div>
                            </NuxtLink>
                        </template>
                    </ElTableColumn>

                    <ElTableColumn
                        :label="$t('Category.Index')"
                        min-width="200px"
                    >
                        <template #default="scope: ITableColumn<IProduct>">
                            <NuxtLink
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
                        :label="$t('Brand.Index')"
                        min-width="200px"
                    >
                        <template #default="scope: ITableColumn<IProduct>">
                            <NuxtLink
                                v-if="scope.row.Brand"
                                :to="`${ROUTER.BRAND}/${scope.row.Brand.id}`"
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
                                        :src="getImageFile(pathBrand, scope.row.Brand.image_uri)"
                                    />

                                    <span text="capitalize blue-600">{{ scope.row.Brand.name }}</span>
                                </div>
                            </NuxtLink>
                        </template>
                    </ElTableColumn>

                    <ElTableColumn
                        :label="$t('Product.InfoPrice')"
                        width="250px"
                    >
                        <template #default="scope: ITableColumn<IProduct>">
                            <ul>
                                <li>
                                    <span
                                        text="capitalize"
                                        font="semibold"
                                    >{{ $t('Product.TypeDiscount') }}: </span>
                                    <span>{{ scope.row.type_discount }}</span>
                                </li>

                                <li>
                                    <span
                                        text="capitalize"
                                        font="semibold"
                                    >{{ $t('Product.PriceDiscount') }}: </span>
                                    <span>{{ scope.row.price_discount }}</span>
                                </li>

                                <li>
                                    <span
                                        text="capitalize"
                                        font="semibold"
                                    >{{ $t('Product.Price') }}: </span>
                                    <span>{{ scope.row.price }}</span>
                                </li>
                            </ul>
                        </template>
                    </ElTableColumn>

                    <ElTableColumn
                        :label="$t('Status.Name')"
                        width="100px"
                        align="center"
                    >
                        <template #default="scope: ITableColumn<IProduct>">
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
                        <template #default="scope: ITableColumn<IProduct>">
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
                        <template #default="scope: ITableColumn<IProduct>">
                            {{ formatDateTime(scope.row.created_at) }}
                        </template>
                    </ElTableColumn>

                    <ElTableColumn
                        :label="$t('Action')"
                        width="110px"
                    >
                        <template #default="scope: ITableColumn<IProduct>">
                            <ElButton
                                circle
                                type="warning"
                                :icon="ElIconEdit"
                                @click="navigateTo(`${ROUTER.PRODUCT}/${scope.row.id}`)"
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
                    :total="productAggregations"
                    :current-page="search.page"
                    @current-change="val => search.page = val"
                />
            </ElCol>
        </ElRow>
    </ElCard>
</template>
