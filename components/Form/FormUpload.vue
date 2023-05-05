<script setup lang="ts">

// ** Types Imports
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { genFileId } from 'element-plus'

// ** useHooks
const { imageURL } = useCategory()

// ** Data
const upload = ref<UploadInstance>()

// ** Methods
const handleRemove = () => {
    upload.value!.clearFiles()
}

const handleExceed: UploadProps['onExceed'] = files => {
    handleRemove()

    const file = files[0] as UploadRawFile

    file.uid = genFileId()
    upload.value!.handleStart(file)
}

</script>

<template>
    <div>
        <ElUpload
            ref="upload"
            method="PUT"
            list-type="picture-card"
            :limit="1"
            action=""
            :auto-upload="false"
            :on-exceed="handleExceed"
            :on-change="file => imageURL = file"
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
                            class="el-upload-list__item-delete"
                            @click="handleRemove"
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
    </div>
</template>
