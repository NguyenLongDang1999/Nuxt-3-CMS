<script setup lang="ts">

// ** Validations Imports
import ProductValidate from '~~/validations/product.validate'

// ** Types Imports
import type { FormInstance } from 'element-plus'
import type { IAttributeList } from '~/types/core.type'
import type { IProductFormInput } from '~/types/product.type'

// ** Data
const formRef = ref<FormInstance>()

const form = reactive<IProductFormInput>({
    sku: '',
    name: '',
    slug: '',
    category_id: '',
    quantity: 0,
    price: 0,
    type_discount: DISCOUNT.PRICE,
    price_discount: 0,
    attribute: []
})

// ** useHooks
const { t } = useI18n()
const { brandList } = useBrandList()
const { category_id } = useCategory()
const { attribute_id } = useAttribute()
const { categoryList } = useCategoryList()
const { attributeList } = useAttributeList()
const { isLoading, productFormInput } = useProductFormInput()

// ** Watch
watch(() => form.category_id, val => {
    category_id.value = val
    form.attribute = []
    form.brand_id = undefined
})

// ** Methods
const handleCreate = (input?: FormInstance) => {
    if (!input) return

    input.validate(valid => {
        if (valid) {
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
                .then(() => {
                    form.quantity = Number(form.quantity)
                    form.price = Number(form.price)
                    form.price_discount = Number(form.price_discount)

                    productFormInput(form)
                })
        }
    })
}

const handleAttributeChange = (val: IAttributeList[]) => {
    attribute_id.value = []

    return val.map(item => attribute_id.value.push(item.id))
}
</script>

<template>
    <ElCard shadow="never">
        <ElForm
            ref="formRef"
            v-loading="isLoading"
            :model="form"
            :rules="ProductValidate"
            @submit.prevent
        >
            <ElRow
                :gutter="12"
                grid="gap-y-3"
            >
                <ElCol :md="24">
                    <FormUpload />
                </ElCol>

                <ElCol :md="24">
                    <ElDivider />
                </ElCol>

                <ElCol :md="12">
                    <FormInput
                        v-model="form.sku"
                        name="sku"
                        title="Product.Sku"
                    />
                </ElCol>

                <ElCol :md="12">
                    <FormInput
                        v-model="form.name"
                        name="name"
                        title="Product.Name"
                    />
                </ElCol>

                <ElCol :md="6">
                    <FormSelect
                        v-model="form.category_id"
                        name="category_id"
                        title="Category.Index"
                        :options="categoryList"
                    />
                </ElCol>

                <ElCol :md="6">
                    <FormSelect
                        v-model="form.brand_id"
                        name="brand_id"
                        title="Brand.Index"
                        :options="brandList"
                    />
                </ElCol>

                <ElCol :md="6">
                    <FormSelect
                        v-model="form.status"
                        name="status"
                        title="Status.Name"
                        :options="optionStatus()"
                    />
                </ElCol>

                <ElCol :md="6">
                    <FormSelect
                        v-model="form.popular"
                        name="popular"
                        title="Popular.Name"
                        :options="optionPopular()"
                    />
                </ElCol>

                <ElCol :md="6">
                    <FormInput
                        v-model="form.quantity"
                        name="quantity"
                        title="Product.Quantity"
                    />
                </ElCol>

                <ElCol :md="6">
                    <FormInput
                        v-model="form.price"
                        name="price"
                        title="Product.Price"
                    />
                </ElCol>

                <ElCol :md="6">
                    <FormSelect
                        v-model="form.type_discount"
                        name="type_discount"
                        title="Product.TypeDiscount"
                        :options="optionTypeDiscount()"
                    />
                </ElCol>

                <ElCol :md="6">
                    <FormInput
                        v-model="form.price_discount"
                        name="price_discount"
                        title="Product.PriceDiscount"
                    />
                </ElCol>

                <ElCol :md="24">
                    <FormInput
                        v-model="form.short"
                        name="short"
                        title="Short"
                        type="textarea"
                    />
                </ElCol>

                <ElCol :md="24">
                    <ElDivider />
                </ElCol>

                <ElCol :md="24">
                    <FormLabel
                        name="content"
                        title="Content"
                    />

                    <QuillEditor
                        v-model:content="form.content"
                        content-type="html"
                        theme="snow"
                        toolbar="full"
                        h="!300px"
                    />
                </ElCol>

                <ElCol :md="24">
                    <ElDivider />
                </ElCol>

                <ElCol :md="6">
                    <FormSelect
                        v-model="form.attribute"
                        name="attribute_data"
                        title="Attribute.Index"
                        :options="attributeList"
                        multiple
                        value-arr
                        value-key="id"
                        @change="handleAttributeChange"
                    />
                </ElCol>

                <ElCol :md="24">
                    <ElRow
                        v-for="(item, index) in form.attribute"
                        :key="item.id"
                        :gutter="12"
                        grid="gap-y-3"
                    >
                        <ElCol :md="6">
                            <FormInput
                                :model-value="item.name"
                                name="attribute_name"
                                title="Attribute.Name"
                                disabled
                            />
                        </ElCol>

                        <ElCol :md="6">
                            <FormSelect
                                v-model="form.attribute[index].variant"
                                name="attribute_data"
                                title="Variant.Value"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                :reserve-keyword="false"
                                :options="[]"
                            />
                        </ElCol>
                    </ElRow>
                </ElCol>

                <ElCol :md="24">
                    <ElDivider />
                </ElCol>

                <ElCol :md="24">
                    <FormInput
                        v-model="form.meta_title"
                        name="meta_title"
                        title="Meta.Title"
                    />
                </ElCol>

                <ElCol :md="24">
                    <FormInput
                        v-model="form.meta_keyword"
                        name="meta_keyword"
                        title="Meta.Keyword"
                    />
                </ElCol>

                <ElCol :md="24">
                    <FormInput
                        v-model="form.meta_description"
                        name="meta_description"
                        title="Meta.Description"
                    />
                </ElCol>

                <ElCol :md="24">
                    <ElDivider />
                </ElCol>
            </ElRow>

            <ElRow grid="gap-y-3">
                <ElCol :span="24">
                    <ElButton
                        type="primary"
                        native-type="submit"
                        @click="handleCreate(formRef)"
                    >
                        {{ $t('Btn.Save') }}
                    </ElButton>

                    <ElButton @click="$router.go(-1)">
                        {{ $t('Btn.Back') }}
                    </ElButton>
                </ElCol>
            </ElRow>
        </ElForm>
    </ElCard>
</template>
