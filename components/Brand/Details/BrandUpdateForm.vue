<script setup lang="ts">

// ** Validations Imports
import BrandValidate from '~~/validations/brand.validate'

// ** Types Imports
import type { FormInstance } from 'element-plus'
import type { IBrandFormInput } from '~/types/brand.type'

// ** Props & Emits
interface Props {
    id: string
    brand: IBrandFormInput
}

const props = defineProps<Props>()

// ** Data
const formRef = ref<FormInstance>()
const form = reactive<IBrandFormInput>({ ...props.brand })

// ** useHooks
const { t } = useI18n()
const { path } = useBrand()
const { categoryList } = useCategoryList()
const { isLoading, brandFormInput } = useBrandFormInput(props.id)

// ** onMounted
onMounted(() => _assign(form, props.brand))

// ** Methods
const handleUpdate = (input?: FormInstance) => {
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
                .then(() => brandFormInput(form))
        }
    })
}
</script>

<template>
    <ElForm
        ref="formRef"
        v-loading="isLoading"
        :model="form"
        :rules="BrandValidate"
        @submit.prevent
    >
        <ElRow
            :gutter="12"
            grid="gap-y-3"
        >
            <ElCol :md="24">
                <FormUpload
                    :name="brand?.image_uri"
                    :url-file="getImageFile(path, brand?.image_uri)"
                />
            </ElCol>

            <ElCol :md="24">
                <ElDivider />
            </ElCol>

            <ElCol :md="12">
                <FormInput
                    v-model="form.name"
                    name="name"
                    title="Brand.Name"
                />
            </ElCol>

            <ElCol :md="12">
                <FormSelect
                    v-model="form.category_id"
                    name="category_id"
                    title="Category.Index"
                    :options="categoryList"
                />
            </ElCol>

            <ElCol :md="12">
                <FormSelect
                    v-model="form.status"
                    name="status"
                    title="Status.Name"
                    :options="optionStatus()"
                />
            </ElCol>

            <ElCol :md="12">
                <FormSelect
                    v-model="form.popular"
                    name="popular"
                    title="Popular.Name"
                    :options="optionPopular()"
                />
            </ElCol>

            <ElCol :md="24">
                <FormInput
                    v-model="form.description"
                    name="description"
                    title="Description"
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
                    @click="handleUpdate(formRef)"
                >
                    {{ $t('Btn.Save') }}
                </ElButton>

                <ElButton @click="$router.go(-1)">
                    {{ $t('Btn.Back') }}
                </ElButton>
            </ElCol>
        </ElRow>
    </ElForm>
</template>
