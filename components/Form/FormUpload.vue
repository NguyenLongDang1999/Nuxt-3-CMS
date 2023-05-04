<script setup lang="ts">

// ** Types Imports
import type { UploadFile, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { genFileId } from 'element-plus'
import { config } from '~/configs'

// ** Props & Emits
interface Props {
    name: string
    isUpload: boolean
}

interface Emits {
    (event: 'file', payload?: File): void
}

const props = defineProps<Props>()

// ** Data
const action = ref<string>('')
const upload = ref<UploadInstance>()
const dialogImageUrl = ref<string>('')
const showDialog = ref<boolean>(false)

const headers = reactive({
    AccessKey: config.bunnyAK,
    'content-type': 'application/octet-stream'
})

// ** Watch
watch(() => props.isUpload, val => {
    if (val) upload.value!.submit()
})

// ** Methods
const handleRemove = () => {
    upload.value!.clearFiles()
}

const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    showDialog.value = true
}

const handleExceed: UploadProps['onExceed'] = files => {
  upload.value!.clearFiles()

  const file = files[0] as UploadRawFile

  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const handleChange = (val) => {
    
    action.value = `${config.uploadCDN}/image-data/${props.name}/123.png`

    // `${config.uploadCDN}/image-data/${name}/${upload}`
}
</script>

<template>
    <div>
        <ElUpload
            ref="upload"
            method="PUT"
            list-type="picture-card"
            :action="action"
            :headers="headers"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false"
            :on-change="handleChange"
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

        <ElDialog v-model="showDialog">
            <NuxtImg
                :src="dialogImageUrl"
                alt="Preview Image"
            />
        </ElDialog>
    </div>
</template>
