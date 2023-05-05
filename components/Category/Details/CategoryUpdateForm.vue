<script setup lang="ts">

// ** Validations Imports
// import CategoryValidate from '~~/validations/category.validate'

// ** Types Imports
import type { FormInstance } from 'element-plus'
import type { ICategoryFormInput } from '~/types/category.type'

// ** Props & Emits
interface Props {
    id: string
}

const props = defineProps<Props>()

// ** Data
const formRef = ref<FormInstance>()

const form = reactive<ICategoryFormInput>({
    name: '',
    slug: ''
})

// ** useHooks
const { categoryList } = useCategoryList()
const { category } = useCategoryDetail(props.id)
const { isLoading, categoryFormInput } = useCategoryFormInput(props.id)

// ** Mounted
onMounted(() => _assign(form, category.value))

// ** Watch
watch(category, val => _assign(form, val))

// ** Methods
const handleCreate = (input?: FormInstance) => {
    if (!input) return

    input.validate(async valid => {
        if (valid) {
            await categoryFormInput(form)
        }
    })
}
</script>

<template>
    <div>
        <ElForm
            ref="formRef"
            :model="form"
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
                        :loading="isLoading"
                        type="primary"
                        native-type="submit"
                        @click="handleCreate(formRef)"
                    >
                        {{ $t('Btn.Save') }}
                    </ElButton>

                    <ElButton :loading="isLoading">
                        {{ $t('Btn.Back') }}
                    </ElButton>
                </ElCol>
            </ElRow>
        </ElForm>
    </div>
</template>
