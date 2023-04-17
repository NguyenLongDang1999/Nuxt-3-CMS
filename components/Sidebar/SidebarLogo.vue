<script setup lang="ts">

// ** Props & Emits
interface Props {
    collapse: boolean
}

defineProps<Props>()

// ** useHooks
const { settings } = useBasicStore()

// ** Data
const state = reactive({
    title: settings.title,
    logo: 'sidebar-logo'
})

const { title, logo } = toRefs(state)
</script>

<template>
    <div
        class="relative w-full h-[50px] leading-[50px] bg-[#2b2f3a] overflow-hidden text-left pl-[14px]"
        :class="{ collapse: collapse }"
    >
        <NuxtLink
            v-if="collapse"
            class="w-full h-full"
            to="/"
        >
            <SvgIcon
                v-if="logo"
                :icon-class="logo"
            />

            <h1
                v-else
                class="inline-block m-0 font-semibold leading-[50px] text-[14px] align-middle text-white"
            >
                {{ title }}
            </h1>
        </NuxtLink>

        <NuxtLink
            v-else
            to="/"
        >
            <SvgIcon
                v-if="logo"
                :icon-class="logo"
                :class="collapse ? 'mr-0' : 'mr-3'"
                class="text-[#ff9901] w-8 h-8 align-middle"
            />

            <h1 class="inline-block m-0 text-white font-semibold leading-[50px] text-[14px] align-middle">
                {{ title }}
            </h1>
        </NuxtLink>
    </div>
</template>
