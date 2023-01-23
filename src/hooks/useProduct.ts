import { onMounted, ref } from "vue";
import ProductServices from "../services/ProductServices";
import { ProductTy } from "../types/ProductTy";

const productList = ref<Array<ProductTy>>([]);

export default function useProduct() {
  onMounted(() => {
    onGetProduct();
  });
  async function onGetProduct() {
    const res = await ProductServices.getAllProduct();
    if (res.data) {
      productList.value = res.data;
    }
  }

  return {
    onGetProduct,
    productList,
  };
}
