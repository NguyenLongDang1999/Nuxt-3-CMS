<script setup lang="ts">

// ** Props & Emits
interface Props {
    readonly name: string
    readonly title: string
    modelValue?: string | number
}

interface Emits {
    (event: 'update:modelValue', payload: string | number): void
}

defineProps<Props>()

const emits = defineEmits<Emits>()
</script>

<template>
    <ElFormItem
        :prop="name"
        :rules="$attrs.rules || []"
    >
        <FormLabel
            :name="name"
            :title="title"
        />

        <ElInput
            :id="name"
            :model-value="modelValue"
            clearable
            v-bind="$attrs"
            @update:model-value="emits('update:modelValue', $event)"
        />
    </ElFormItem>
</template>
