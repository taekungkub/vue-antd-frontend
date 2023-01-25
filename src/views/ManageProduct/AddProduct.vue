<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item>
        <router-link to="/manage-product/index"> Manage Product </router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Add Product</a-breadcrumb-item>
    </a-breadcrumb>

    <a-card :style="{ marginTop: '12px' }">
      <a-upload
        list-type="picture"
        v-model:file-list="imageList"
        :multiple="false"
        :max-count="1"
        :before-upload="beforeUpload"
        @change="handleChange"
        @remove="handleRemove"
      >
        <a-button> <upload-outlined></upload-outlined> Upload Max(1)</a-button>
      </a-upload>

      <br />

      <a-form ref="formRef" :model="formState" layout="vertical" @finish="onSubmit">
        <a-form-item name="title" label="Title" :rules="[{ required: true }]">
          <a-input v-model:value="formState.title" />
        </a-form-item>

        <a-form-item name="metaTitle" label="Meta title">
          <a-input v-model:value="formState.metaTitle" />
        </a-form-item>

        <a-form-item name="price" label="Price" :rules="[{ required: true }]">
          <a-input v-model:value="formState.price" />
        </a-form-item>

        <a-form-item name="discount" label="Discount" :rules="[{ required: true }]">
          <a-input v-model:value="formState.discount" />
        </a-form-item>

        <a-form-item name="quantity" label="quantity" :rules="[{ required: true }]">
          <a-input v-model:value="formState.quantity" />
        </a-form-item>

        <a-form-item>
          <a-button html-type="submit" type="primary">{{ mode === enumMode.create ? "Create" : "Update" }}</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { FormInstance, message, Upload } from "ant-design-vue";
import type { UploadChangeParam, UploadProps } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import ProductServices from "../../services/ProductServices";
import { useUserStore } from "../../stores/user";
import { useRoute } from "vue-router";
import { ProductTy } from "../../types/ProductTy";
import router from "../../router";

interface EnumModeTy {
  create: string;
  update: string;
}
const formRef = ref<FormInstance>();
const formState = reactive(<ProductTy>{});
const user = useUserStore();
const imageList = ref<any>([]);
const route = useRoute();
const enumMode: EnumModeTy = {
  create: "create",
  update: "update",
};

let mode = ref<string>(enumMode.create);

onMounted(() => {
  const id: any = route.params.id;
  if (id) {
    mode.value = enumMode.update;
    getProductByID(id);
  }
});

async function getProductByID(id: string) {
  try {
    const res = await ProductServices.getProductById(id);
    if (res) {
      mode.value = "update";
      formState.id = res.data.id;
      formState.title = res.data.title;
      formState.metaTitle = res.data.metaTitle;
      formState.price = res.data.price;
      formState.discount = res.data.discount;
      formState.quantity = res.data.quantity;
      formState.category_id = res.data.category_id;
      formState.userId = res.data.userId;
      formState.image = res.data.image;
    }
  } catch (error) {}
}
const onSubmit = async () => {
  if (mode.value === enumMode.create) {
    try {
      console.log("submit!");
      formState.userId = user.info.id.toString();
      formState.category_id = 1;
      const res = await ProductServices.createProduct(formState);
      if (res.data) {
        formRef.value?.resetFields();
        formState.image = null;
        imageList.value = [];
        message.success("Add successfully");
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.data);
    }
  } else if (mode.value === enumMode.update) {
    try {
      console.log("submit!");
      formState.userId = user.info.id.toString();
      formState.category_id = 1;
      const res = await ProductServices.updateProduct(formState, formState.id);
      if (res.data) {
        router.back();
        message.success("Add successfully");
      }
    } catch (error: any) {
      console.log(error);
      message.error(error);
    }
  }
};

const resetForm = () => {
  formRef.value?.resetFields();
};

const beforeUpload: UploadProps["beforeUpload"] = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG file!");
    return Upload.LIST_IGNORE;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
    return Upload.LIST_IGNORE;
  }

  return false;
};

const handleChange = ({ file, fileList }: UploadChangeParam) => {
  imageList.value = fileList;
  formState.image = file;
  console.log(file);
};
const handleRemove = ({ file, fileList }: UploadChangeParam) => {
  imageList.value = fileList;
  formState.image = null;
};
</script>

<style scoped></style>
