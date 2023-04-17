<script setup lang="ts">

// ** useHooks
const { sidebar, settings } = useBasicStore()

// ** Computed
const classSidebar = computed(() => {
    return {
        closeSidebar: !sidebar.opened,
        hideSidebar: !settings.showLeftMenu
    }
})

resizeHandler()
</script>

<template>
    <div :class="classSidebar">
        <LazyTheSidebar
            v-if="settings.showLeftMenu"
            class="bg-[#304156] h-full fixed text-[0] top-0 bottom-0 left-0 z-[1001] overflow-hidden border-r-[0.5px] border-r-solid border-[#eee] !w-[210px] transition-[width] duration-200"
            :class="{
                '!w-[54px]': !sidebar.opened,
                '!w-0': !settings.showLeftMenu
            }"
        />

        <div
            class="relative min-h-full ml-[210px] transition-[margin-left] duration-200"
            :class="{
                '!ml-[54px]': !sidebar.opened,
                '!ml-0': !settings.showLeftMenu
            }"
        >
            <LazyAppNavbar v-if="settings.showTopNavbar" />

            <div class="relative overflow-hidden bg-white p-2.5 pt-[50px]">
                <slot />
            </div>
        </div>
    </div>
</template>
