<script setup lang="ts">

// ** Utils Imports
import { constantRoutes } from '~~/utils/navigations'

// ** useHook
const route = useRoute()
const globalStore = useGlobalStore()

// ** Computed
const menuList = computed(() => constantRoutes)
const isCollapse = computed(() => globalStore.isCollapse)
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string)
</script>

<template>
    <ElContainer
        h="100vh"
        w="full !min-730px"
    >
        <ElAside
            w="!auto"
            bg="white"
            border="r-1px solid gray-200"
        >
            <div
                display="flex"
                flex="col"
                h="full"
                :w="isCollapse ? '65px' : '210px'"
                transition="transition-[width] duration-300 ease"
            >
                <div
                    box="border"
                    h="55px"
                    display="flex"
                    justify="center"
                    align="items-center"
                >
                    <NuxtImg
                        w="7"
                        m="r-6px"
                        object="contain"
                        src="https://admin.spicyboy.cn/assets/svg/logo-7e7c7361.svg"
                        alt="Logo"
                    />

                    <span
                        v-show="!isCollapse"
                        font="bold"
                        text="21.5px space-nowrap text-[#303133]"
                    >Geeker Admin</span>
                </div>

                <ElScrollbar>
                    <ElMenu
                        :default-active="activeMenu"
                        :collapse="isCollapse"
                        :router="false"
                        :collapse-transition="false"
                        unique-opened
                        w="full"
                        overflow="x-hidden"
                        border="!none"
                    >
                        <TheMenu :menu-list="menuList" />
                    </ElMenu>
                </ElScrollbar>
            </div>
        </ElAside>

        <ElContainer>
            <ElHeader
                display="flex"
                align="items-center"
                justify="between"
                h="55px"
                p="y-0 x-15px"
                bg="white"
                border="b-1px solid gray-200"
            >
                <TheHeaderLeft />
                <TheHeaderRight />
            </ElHeader>

            <slot />
        </ElContainer>
    </ElContainer>
</template>

<style lang="scss">
.el-scrollbar {
    height: calc(100% - 55px);
}
</style>
