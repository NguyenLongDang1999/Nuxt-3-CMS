<script setup lang="ts">

// ** Layout
definePageMeta({
    layout: 'login'
})

// ** Validations Imports
import AuthValidate from '~~/validations/auth.validate'

// ** Types Imports
import type { FormInstance } from 'element-plus'
import type { IAuthLogin } from '~/types/auth.type'

// ** Data
const formRef = ref<FormInstance>()

const form = reactive<IAuthLogin>({
    email: 'longdang0412@gmail.com',
    password: 'dang04121999'
})

// ** useHooks
// const { t } = useI18n()
const { isLoading, authLogin } = useAuthLogin()

// ** Methods
const handleLogin = (input?: FormInstance) => {
    if (!input) return

    input.validate(valid => {
        if (valid) authLogin(form)
    })
}
</script>

<template>
    <ElForm
        ref="formRef"
        :model="form"
        :rules="AuthValidate"
        @submit.prevent
    >
        <ElRow
            :gutter="12"
            grid="gap-y-3"
        >
            <ElCol :span="24">
                <FormInput
                    v-model="form.email"
                    type="email"
                    name="email"
                    title="User.Email"
                />
            </ElCol>

            <ElCol :span="24">
                <FormInput
                    v-model="form.password"
                    type="password"
                    name="password"
                    title="User.Password"
                    autocomplete="new-password"
                    show-password
                />
            </ElCol>

            <ElCol :span="24">
                <ElButton
                    type="primary"
                    native-type="submit"
                    :loading="isLoading"
                    @click="handleLogin(formRef)"
                >
                    {{ $t('Btn.Login') }}
                </ElButton>
            </ElCol>
        </ElRow>
    </ElForm>
</template>
