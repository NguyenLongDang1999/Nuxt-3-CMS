<script setup lang="ts">

// ** Props & Emits
interface Props {
    readonly name: string
    readonly title: string
}

defineProps<Props>()
</script>

<template>
    <label
        :title="$t(title)"
        :for="name"
        :name="name"
        class="uppercase font-normal inline-block text-xs mb-1"
    >
        {{ $t(title) }}
    </label>
</template>
