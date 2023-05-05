<script setup lang="ts">

// ** Types Imports
import type { FormInstance } from 'element-plus'
import type { ICategorySearch } from '~/types/category.type'

// ** useHooks
const { search } = useCategory()
const { categoryList } = useCategoryList()

// ** Data
const formRef = ref<FormInstance>()
const searchTemp = reactive<ICategorySearch>(_clone(search))

// ** Methods
const handleSearch = () => _assign(search, searchTemp)

const handleReset = (formEl?: FormInstance) => {
    if (!formEl) return
    formEl.resetFields()

    _assign(search, searchTemp)
}
</script>

<template>
    <ElForm
        ref="formRef"
        :model="searchTemp"
        @submit.prevent
    >
        <ElCard shadow="never">
            <template #header>
                <h5 class="text-xl font-medium leading-none tracking-tight text-dark capitalize">
                    {{ $t('Search') }}
                </h5>
            </template>

            <ElRow
                :gutter="12"
                grid="gap-y-3"
            >
                <ElCol
                    :md="6"
                    :sm="12"
                >
                    <FormInput
                        v-model="searchTemp.name"
                        name="name"
                        title="Category.Name"
                    />
                </ElCol>

                <ElCol
                    :md="6"
                    :sm="12"
                >
                    <FormSelect
                        v-model="searchTemp.parent_id"
                        name="parent_id"
                        title="Category.Parent"
                        :options="categoryList"
                    />
                </ElCol>

                <ElCol
                    :md="6"
                    :sm="12"
                >
                    <FormSelect
                        v-model="searchTemp.status"
                        name="status"
                        title="Status.Name"
                        :options="optionStatus()"
                    />
                </ElCol>

                <ElCol
                    :md="6"
                    :sm="12"
                >
                    <FormSelect
                        v-model="searchTemp.popular"
                        name="popular"
                        title="Popular.Name"
                        :options="optionPopular()"
                    />
                </ElCol>

                <ElCol :span="24">
                    <div class="flex justify-center">
                        <ElButton
                            type="primary"
                            native-type="submit"
                            :icon="ElIconSearch"
                            @click="handleSearch"
                        >
                            {{ $t('Btn.Search') }}
                        </ElButton>

                        <ElButton
                            type="info"
                            native-type="reset"
                            :icon="ElIconRefresh"
                            @click="handleReset(formRef)"
                        >
                            {{ $t('Btn.Reset') }}
                        </ElButton>
                    </div>
                </ElCol>
            </ElRow>
        </ElCard>
    </ElForm>
</template>
