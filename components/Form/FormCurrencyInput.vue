<script setup lang="ts">

// ** Third Party Imports
import type { CurrencyInputOptions } from 'vue-currency-input'
import { useCurrencyInput } from 'vue-currency-input'

// ** Props & Emits
interface Props {
    readonly name: string
    readonly title: string
    modelValue?: number
    options: CurrencyInputOptions
}

// interface Emits {
//     (event: 'update:modelValue', payload: number): void
// }

const props = defineProps<Props>()

// const emits = defineEmits<Emits>()

// ** Data
const { inputRef, setOptions, setValue } = useCurrencyInput(props.options)

watch(() => props.modelValue, val =>setValue(val || 0))
watch(() => props.options, options => setOptions(options))
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
            ref="inputRef"
            :model-value="props.modelValue"
            clearable
            v-bind="$attrs"
        />
    </ElFormItem>
</template>
