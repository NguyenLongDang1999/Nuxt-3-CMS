<script setup lang="ts">
const userData = JSON.parse(getUserData() || 'null')

</script>

<template>
    <div
        display="flex"
        align="items-center"
        justify="center"
        p="r-25px"
    >
        <span
            text="15px"
            m="y-0 x-5"
        >
            {{ userData.name }}
        </span>

        <TheAvatar />
    </div>
</template>
