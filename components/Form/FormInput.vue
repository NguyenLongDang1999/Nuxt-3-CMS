<script setup lang="ts">

// ** Props & Emits
interface Props {
    readonly name: string
    readonly title: string
    modelValue?: string
}

interface Emits {
    (event: 'update:modelValue', payload: string): void
}

defineProps<Props>()

const emits = defineEmits<Emits>()
</script>

<template>
    <ElFormItem :prop="name">
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
