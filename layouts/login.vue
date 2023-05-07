<script setup lang="ts">

// **
</script>

<template>
    <div
        display="flex"
        justify="center"
        align="items-center"
        h="100vh min-550px"
        style="background-image: url('/assets/svg/login_bg.svg');"
    >
        <div
            pos="relative"
            display="flex"
            align="items-center"
            justify="around"
            w="[96.5%]"
            h="[94%]"
            p="y-0 x-50px"
            bg="[#fffc]"
            border="rounded-xl"
        >
            <div
                w="[800px]"
                m="r-10px"
                display="<xl:hidden"
            >
                <NuxtImg
                    src="/images/login_left.png"
                    w="full"
                    h="full"
                    alt="Login"
                />
            </div>

            <div
                w="[490px] <sm:[97%]"
                p="t-50px x-10 b-45px"
                bg="white"
                border="rounded-xl"
                shadow="xl"
            >
                <div
                    display="flex"
                    justify="center"
                    align="items-center"
                    m="b-45px"
                >
                    <NuxtImg
                        src="/svg/logo.svg"
                        w="15"
                        h="13"
                        alt="Logo"
                    />

                    <h2
                        p="0 l-25px"
                        m="0"
                        text="42px [#34495e] space-nowrap"
                        font="semibold"
                    >
                        Geeker-Admin
                    </h2>
                </div>

                <slot />
            </div>
        </div>
    </div>
</template>
