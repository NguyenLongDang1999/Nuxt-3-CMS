<script setup lang="ts">

// ** Validations Imports
import CategoryValidate from '~~/validations/category.validate'

// ** Types Imports
import type { FormInstance } from 'element-plus'
import type { ICategoryFormInput } from '~/types/category.type'

// ** Props & Emits
interface Props {
    modelValue: boolean
}

interface Emits {
    (event: 'update:modelValue', payload: boolean): void
}

defineProps<Props>()

const emits = defineEmits<Emits>()

// ** Data
const formRef = ref<FormInstance>()

const form = reactive<ICategoryFormInput>({
    name: '',
    slug: ''
})

// ** useHooks
const { t } = useI18n()
const { categoryList } = useCategoryList()
const { isLoading, categoryFormInput } = useCategoryFormInput()

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
                .then(async () => {
                    await categoryFormInput(form)
                    resetForm(input)
                    closeDialog()
                })
        }
    })
}

const closeDialog = () => emits('update:modelValue', false)

const resetForm = (input?: FormInstance) => {
    if (!input) return
    input.resetFields()
}
</script>

<template>
    <ElDialog
        :model-value="modelValue"
        :title="$t('Category.Create')"
        class="max-[767.99px]:min-w-[90%]"
        @update:model-value="closeDialog"
    >
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
                    <FormUpload />
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
                        @click="handleCreate(formRef)"
                    >
                        {{ $t('Btn.Save') }}
                    </ElButton>

                    <ElButton @click="closeDialog">
                        {{ $t('Btn.Cancel') }}
                    </ElButton>
                </ElCol>
            </ElRow>
        </ElForm>
    </ElDialog>
</template>
