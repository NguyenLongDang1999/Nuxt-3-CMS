<script setup lang="ts">

// ** Validations Imports
import CategoryValidate from '~~/validations/category.validate'

// ** Types Imports
import type { FormInstance } from 'element-plus'
import type { ICategoryFormInput } from '~/types/category.type'

// ** Props & Emits
interface Props {
    id: string
    category: ICategoryFormInput
}

const props = defineProps<Props>()

// ** Data
const formRef = ref<FormInstance>()
const form = reactive<ICategoryFormInput>({ ...props.category })

// ** useHooks
const { t } = useI18n()
const { path } = useCategory()
const { categoryList } = useCategoryList()
const { isLoading, categoryFormInput } = useCategoryFormInput(props.id)

// ** Watch
watch(() => props.category, () => _assign(form, props.category))

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
                .then(() => categoryFormInput(form))
        }
    })
}
</script>

<template>
    <ElForm
        ref="formRef"
        v-loading="isLoading"
        :model="form"
        :rules="CategoryValidate"
        @submit.prevent
    >
        <ElRow
            :gutter="12"
            grid="gap-y-3"
        >
            <ElCol :md="24">
                <FormUpload
                    :name="category?.image_uri"
                    :url-file="getImageFile(path, category?.image_uri)"
                />
            </ElCol>

            <ElCol :md="24">
                <ElDivider />
            </ElCol>

            <ElCol :md="12">
                <FormInput
                    v-model="form.name"
                    name="name"
                    title="Category.Name"
                />
            </ElCol>

            <ElCol :md="12">
                <FormSelect
                    v-model="form.parent_id"
                    name="parent_id"
                    title="Category.Parent"
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
