<script setup lang="ts">

// ** Third Party Imports
import type { CurrencyInputOptions } from 'vue-currency-input'
import { useCurrencyInput } from 'vue-currency-input'

// ** Props & Emits
interface Props {
    readonly name: string
    readonly title: string
    modelValue: number
    options: CurrencyInputOptions
}

const props = defineProps<Props>()

// ** Data
const { inputRef, setOptions, setValue } = useCurrencyInput(props.options)

watch(() => props.modelValue, val => setValue(val || 0))
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
            :model-value="modelValue"
            clearable
            v-bind="$attrs"
        />
    </ElFormItem>
</template>
