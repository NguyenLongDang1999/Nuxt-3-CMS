<script setup lang="ts">

// ** Types Imports
import type { UploadFile } from 'element-plus'

// ** Data
const dialogImageUrl = ref<string>('')
const showDialog = ref<boolean>(false)

// ** Methods
const handleRemove = (file: UploadFile) => {
    console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    showDialog.value = true
}
</script>

<template>
    <div>
        <ElUpload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
        >
            <Icon
                name="ep:plus"
                class="text-xl"
            />

            <template #file="{ file }">
                <div>
                    <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url"
                    >
                    <span class="el-upload-list__item-actions">
                        <span
                            class="el-upload-list__item-preview"
                            @click="handlePictureCardPreview(file)"
                        >
                            <Icon
                                name="ep:zoom-in"
                                class="text-xl"
                            />
                        </span>

                        <span
                            class="el-upload-list__item-delete"
                            @click="handleRemove(file)"
                        >
                            <Icon
                                name="ep:delete"
                                class="text-xl"
                            />
                        </span>
                    </span>
                </div>
            </template>
        </ElUpload>

        <ElDialog v-model="showDialog">
            <img
                w-full
                :src="dialogImageUrl"
                alt="Preview Image"
            >
        </ElDialog>
    </div>
</template>
