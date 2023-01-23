import Api from "./Api.js";
let config: any = {
  isUploadFile: true,
};

export default {
  getAllProduct() {
    return Api.get("/products");
  },
  getProductById(id: string) {
    return Api.get("/products/" + id);
  },
  createProduct(data: any) {
    return Api.post("/products", data, config);
  },
  updateProduct(data: any, id: string) {
    return Api.put(`/products/${id}`, data, config);
  },
  deleteProduct(id: string) {
    return Api.delete("/products/" + id);
  },
};
