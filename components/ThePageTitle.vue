<script setup lang="ts">

// ** Props & Emits
interface Props {
    title: string
}

defineProps<Props>()
</script>

<template>
    <h1
        text="xl uppercase"
        font="semibold"
        m="y-3"
    >
        {{ title }}
    </h1>
</template>
