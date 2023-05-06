<script setup lang="ts">

// ** Props & Emits
interface Props {
    menuList: Menu.MenuOptions[]
}

defineProps<Props>()

// ** useHooks
const router = useRouter()

// ** Methods
const handleClickMenu = (subItem: Menu.MenuOptions) => {
    if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '_blank')
    router.push(subItem.path)
}
</script>

<template>
    <template
        v-for="subItem in menuList"
        :key="subItem.path"
    >
        <ElSubMenu
            v-if="subItem.children?.length"
            :index="subItem.path"
        >
            <template #title>
                <div
                    text="middle center lg"
                    m="r-5px b-1"
                    w="6"
                >
                    <Icon
                        :name="subItem.meta.icon"
                        size="18"
                    />
                </div>

                <span
                    overflow="hidden"
                    text="space-nowrap text-ellipsis sm capitalize"
                >
                    {{ $t(subItem.meta.title) }}
                </span>
            </template>

            <TheMenu :menu-list="subItem.children" />
        </ElSubMenu>

        <ElMenuItem
            v-else
            :index="subItem.path"
            display="flex"
            align="items-center"
            @click="handleClickMenu(subItem)"
        >
            <div
                text="middle center lg"
                m="r-5px b-1"
                w="6"
            >
                <Icon
                    :name="subItem.meta.icon"
                    size="18"
                />
            </div>

            <template #title>
                <span
                    overflow="hidden"
                    text="space-nowrap text-ellipsis sm capitalize"
                >
                    {{ $t(subItem.meta.title) }}
                </span>
            </template>
        </ElMenuItem>
    </template>
</template>
