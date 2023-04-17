<script setup lang="ts">

// ** useHooks
const { settings, sidebar, setToggleSideBar } = useBasicStore()

// ** Methods
const loginOut = () => {
    console.log('logout')
}
</script>

<template>
    <div class="flex items-center justify-between h-[50px] overflow-hidden relative bg-white shadow-md z-[1]">
        <div class="flex items-center">
            <AppHamburger
                v-if="settings.showHamburger"
                :is-active="sidebar.opened"
                class="hamburger-container"
                @toggle-click="setToggleSideBar"
            />
        </div>

        <div
            v-if="settings.ShowDropDown"
            class="flex items-center mr-10 bg-white cursor-pointer"
        >
            <ElDropdown
                trigger="click"
                size="medium"
            >
                <div class="mt-[5px] relative cursor-pointer">
                    <img
                        src="https://github.jzfai.top/file/images/nav-right-logo.gif"
                        class="cursor-pointer w-10 h-10 rounded-xl"
                    >

                    <Icon name="ep:caret-bottom" />
                </div>

                <template #dropdown>
                    <ElDropdownMenu>
                        <NuxtLink to="/">
                            <ElDropdownItem>Home</ElDropdownItem>
                        </NuxtLink>

                        <ElDropdownItem
                            divided
                            @click="loginOut"
                        >
                            Logout
                        </ElDropdownItem>
                    </ElDropdownMenu>
                </template>
            </ElDropdown>
        </div>
    </div>
</template>
