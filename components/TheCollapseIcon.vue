<script setup lang="ts">

// ** useHooks
const globalStore = useGlobalStore()

// ** Methods
const changeCollapse = () => globalStore.setGlobalState('isCollapse', !globalStore.isCollapse)
</script>

<template>
    <div
        m="r-5"
        text="xl"
        cursor="pointer"
        @click="changeCollapse"
    >
        <Icon :name="globalStore.isCollapse ? 'ep:expand' : 'ep:fold'" />
    </div>
</template>
