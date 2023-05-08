<script setup lang="ts">

// ** Validations Imports
import AttributeValidate from '~~/validations/attribute.validate'

// ** Types Imports
import type { FormInstance } from 'element-plus'
import type { IAttributeFormInput, IVariantItem } from '~/types/attribute.type'

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

const form = reactive<IAttributeFormInput>({
    name: '',
    slug: '',
    Variations: [{
        id: 1,
        name: ''
    }]
})

// ** useHooks
const { t } = useI18n()
const { categoryList } = useCategoryList()
const { isLoading, attributeFormInput } = useAttributeFormInput()

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
                    await attributeFormInput(form)
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

    form.Variations = [{
        id: 1,
        name: ''
    }]
}

const addVariant = () => {
    form.Variations.push({
        id: Date.now(),
        name: ''
    })
}

const removeVariant = (item: IVariantItem) => {
    const index = form.Variations.indexOf(item)

    if (index !== -1) {
        form.Variations.splice(index, 1)
    }
}
</script>

<template>
    <ElDialog
        :model-value="modelValue"
        :title="$t('Attribute.Create')"
        class="max-[767.99px]:min-w-[90%]"
        @update:model-value="closeDialog"
    >
        <ElForm
            ref="formRef"
            v-loading="isLoading"
            :model="form"
            :rules="AttributeValidate"
            @submit.prevent
        >
            <ElRow
                :gutter="12"
                grid="gap-y-3"
            >
                <ElCol :md="12">
                    <FormInput
                        v-model="form.name"
                        name="name"
                        title="Attribute.Name"
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
                    <ElButton
                        plain
                        type="primary"
                        @click="addVariant"
                    >
                        {{ $t('Variant.Add') }}
                    </ElButton>
                </ElCol>

                <ElCol :md="24">
                    <ElRow
                        v-for="(variant, index) in form.Variations"
                        :key="variant.id"
                        :gutter="12"
                        grid="gap-y-3"
                        align="middle"
                    >
                        <ElCol :span="10">
                            <FormInput
                                v-model="variant.name"
                                :name="`Variations.${index}.name`"
                                title="Variant.Value"
                                :rules="{
                                    required: true,
                                    message: 'Gía trị thuộc tính không được bỏ trống.',
                                    trigger: 'change',
                                }"
                            />
                        </ElCol>

                        <ElCol :span="4">
                            <ElButton
                                circle
                                plain
                                type="danger"
                                size="small"
                                :icon="ElIconMinus"
                                @click="removeVariant(variant)"
                            />
                        </ElCol>
                    </ElRow>
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
