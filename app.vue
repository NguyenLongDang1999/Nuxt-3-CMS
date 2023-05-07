<script setup lang="ts">

// ** useHooks
const globalStore = useGlobalStore()
const { isCollapse } = storeToRefs(globalStore)

// ** Data
const screenWidth = ref(0)

// ** Methods
const listeningWindow = useDebounceFn(() => {
    screenWidth.value = document.body.clientWidth

    if (!isCollapse.value && screenWidth.value < 1200) globalStore.setGlobalState('isCollapse', true)
    if (isCollapse.value && screenWidth.value > 1200) globalStore.setGlobalState('isCollapse', false)
}, 100)

window.addEventListener('resize', listeningWindow, false)

// ** Render
onBeforeUnmount(() => {
    window.removeEventListener('resize', listeningWindow)
})
</script>

<template>
    <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
    </NuxtLayout>
</template>

<style lang="scss">
.page-leave-active,
.page-enter-active {
  transition: all 0.2s;
}

.page-enter-from {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(-30px);
}

.page-leave-to {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(30px);
}
</style>
