<script setup lang="ts">

// ** Props & Emits
interface Props {
    to: string
}

defineProps<Props>()
</script>

<template>
    <NuxtLink :to="to">
        <slot />
    </NuxtLink>
</template>
