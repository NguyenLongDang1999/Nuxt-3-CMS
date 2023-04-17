<script setup lang="ts">

// ** Utils Imports
import { constantRoutes } from '~/utils/navigations'

// ** useHooks
const { settings, sidebar } = storeToRefs(useBasicStore())
const routeInstance = useRoute()

// ** Computed
const activeMenu = computed(() => {
    const { meta, path } = routeInstance

    return meta.activeMenu || path
})
</script>

<template>
    <div class="border-r-[1px] border-solid border-[#eee]">
        <SidebarLogo
            v-if="settings.sidebarLogo"
            :collapse="!sidebar.opened"
        />

        <ElScrollbar>
            <ElMenu
                class="w-[210px] !bg-[#304156]"
                text-color="#bfcbd9"
                :collapse="!sidebar.opened"
                :collapse-transition="false"
                :default-active="activeMenu as string"
                mode="vertical"
            >
                <SidebarItem
                    v-for="route in constantRoutes"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                />
            </ElMenu>
        </ElScrollbar>
    </div>
</template>
