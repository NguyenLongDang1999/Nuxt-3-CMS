<script setup lang="ts">

// ** Props & Emits
interface Props {
    readonly title: string
}

defineProps<Props>()
</script>

<template>
    <h1 class="text-2xl font-medium leading-none tracking-tight text-dark uppercase mb-5">
        {{ $t(title) }}
    </h1>
</template>
