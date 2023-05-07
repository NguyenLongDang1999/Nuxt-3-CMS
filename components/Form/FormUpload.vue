<script setup lang="ts">

// ** Types Imports
import type { UploadInstance, UploadProps, UploadRawFile, UploadUserFile } from 'element-plus'
import { genFileId } from 'element-plus'

// ** Props & Emits
interface Props {
    name?: string
    urlFile?: string
}

const props = defineProps<Props>()

// ** useHooks
const { imageURL } = useUpload()

// ** Data
const upload = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>()

// ** Watch
watchEffect(() => {
    if (props.name) {
        fileList.value = [{
            name: props.name as string,
            url: props.urlFile
        }]
    }
})

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
    <ElUpload
        ref="upload"
        :file-list="fileList"
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
</template>
