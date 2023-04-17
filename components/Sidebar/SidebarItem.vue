<script setup lang="ts">

// ** Types Imports
import type { RouteRawConfig } from '~/types/basic.js'

// ** Third-party Imports
import { resolve } from 'path-browserify'

// ** Props & Emits
const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    isNest: {
        type: Boolean,
        default: false
    },
    basePath: {
        type: String,
        default: ''
    }
})

// ** Data
const onlyOneChild = ref()

// ** Methods
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const showSidebarItem = (children = [], parent: any) => {
    const showingChildren = children.filter((item: RouteRawConfig) => {
        return !(item.hidden)
    })

    if (showingChildren.length === 1 && !parent?.alwaysShow) {
        onlyOneChild.value = showingChildren[0]

        return true
    }
    if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noChildren: true }

        return true
    }

    return false
}

const resolvePath = (routePath: string) => {
    if (isExternal(routePath)) {
        return routePath
    }
    if (isExternal(props.basePath)) {
        return props.basePath
    }

    return resolve(props.basePath, routePath)
}
</script>

<template>
    <template v-if="!item.hidden">
        <template v-if="showSidebarItem(item.children, item)">
            <SidebarLink
                v-if="onlyOneChild.meta"
                :to="resolvePath(onlyOneChild.path)"
            >
                <ElMenuItem
                    :index="resolvePath(onlyOneChild.path)"
                    :class="{ 'submenu-title-noDropdown': !isNest }"
                    class="hover:!bg-[#263445]"
                >
                    <Icon
                        :name="onlyOneChild.meta.icon || item.meta.icon"
                        class="mr-1"
                    />

                    <template #title>
                        {{ onlyOneChild.meta?.title }}
                    </template>
                </ElMenuItem>
            </SidebarLink>
        </template>

        <ElSubMenu
            v-else
            :index="resolvePath(item.path)"
            class="hover:!bg-[#263445]"
        >
            <template
                v-if="item.meta"
                #title
            >
                <Icon
                    :name="item.meta.icon"
                    class="mr-1"
                />

                <span>{{ item.meta.title }}</span>
            </template>

            <SidebarItem
                v-for="child in item.children"
                :key="child.path"
                :item="child"
                :base-path="resolvePath(child.path)"
                is-nest
            />
        </ElSubMenu>
    </template>
</template>
