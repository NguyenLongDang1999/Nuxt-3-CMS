<script setup lang="ts">

// ** Types Imports
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

// ** useHooks
const { categoryList } = useCategoryList()

// ** Data
const form = reactive<ICategoryFormInput>({
    name: '',
    slug: ''
})

// ** Methods
const handleCreate = () => {
    console.log('Submitted form')
}
</script>

<template>
    <ElDialog
        :model-value="modelValue"
        :title="$t('Category.Create')"
        class="max-[767.99px]:min-w-[90%]"
        @update:model-value="emits('update:modelValue', false)"
    >
        <ElForm
            ref="formRef"
            :model="form"
            @submit.prevent
        >
            <ElRow :gutter="12">
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

            <ElRow>
                <ElCol :span="24">
                    <ElButton
                        type="primary"
                        native-type="submit"
                        @click="handleCreate"
                    >
                        {{ $t('Btn.Save') }}
                    </ElButton>

                    <ElButton @click="emits('update:modelValue', false)">
                        {{ $t('Btn.Cancel') }}
                    </ElButton>
                </ElCol>
            </ElRow>
        </ElForm>
    </ElDialog>
</template>
