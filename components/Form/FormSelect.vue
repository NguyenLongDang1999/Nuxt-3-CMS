<script setup lang="ts">

// ** Types Imports
import type { IOptions } from '~/types/core.type'

// ** Props & Emits
interface Props {
    readonly name: string
    readonly title: string
    modelValue?: string | number | unknown[]
    options?: IOptions[]
    valueArr?: boolean
}

interface Emits {
    (event: 'update:modelValue', payload: string): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

// ** Computed
const data = computed(() => props.options || [])
</script>

<template>
    <ElFormItem :prop="name">
        <FormLabel
            :name="name"
            :title="title"
        />

        <ElSelect
            :id="name"
            :model-value="modelValue"
            :placeholder="$t('Empty.Placeholder')"
            :no-data-text="$t('Empty.NoData')"
            :no-match-text="$t('Empty.NoMatchData')"
            clearable
            class="w-full"
            v-bind="$attrs"
            @update:model-value="emits('update:modelValue', $event)"
        >
            <ElOption
                v-for="item in data"
                :key="item.id"
                :label="item.name"
                :value="valueArr ? { id: item.id, name: item.name } : item.id"
            />
        </ElSelect>
    </ElFormItem>
</template>
