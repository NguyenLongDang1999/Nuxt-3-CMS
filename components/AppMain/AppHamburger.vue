<script setup lang="ts">
defineProps({
    isActive: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['toggleClick'])
</script>

<template>
    <div
        style="padding: 0 12px"
        @click="emit('toggleClick')"
    >
        <Icon
            :name="isActive ? 'ep:fold' : 'ep:expand'"
            class="cursor-pointer"
        />
    </div>
</template>
