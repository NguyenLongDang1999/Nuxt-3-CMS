<script setup lang="ts">

// ** useHooks
const { refetch } = useAuthLogout()
</script>

<template>
    <ElDropdown trigger="click">
        <div
            w="10"
            h="10"
            overflow="hidden"
            cursor="pointer"
            border="rounded-full"
        >
            <NuxtImg
                src="https://admin.spicyboy.cn/assets/gif/avatar-ea67286d.gif"
                alt="User"
            />
        </div>

        <template #dropdown>
            <ElDropdownMenu>
                <ElDropdownItem
                    p="!y-2px !x-3"
                    font="!leading-5"
                    text="!xs capitalize"
                >
                    <Icon
                        name="ep:user"
                        m="r-5px"
                    />

                    {{ $t("User.Information") }}
                </ElDropdownItem>

                <ElDropdownItem
                    p="!y-2px !x-3"
                    font="!leading-5"
                    text="!xs capitalize"
                >
                    <Icon
                        name="ep:edit"
                        m="r-5px"
                    />

                    {{ $t("User.ChangePassword") }}
                </ElDropdownItem>

                <ElDropdownItem
                    divided
                    p="!y-2px !x-3"
                    font="!leading-5"
                    text="!xs capitalize"
                    @click="refetch"
                >
                    <Icon
                        name="ep:switch-button"
                        m="r-5px"
                    />

                    {{ $t("User.Logout") }}
                </ElDropdownItem>
            </ElDropdownMenu>
        </template>
    </ElDropdown>
</template>
