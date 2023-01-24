import { defineStore, acceptHMRUpdate } from "pinia";
import { ProductTy } from "../types/ProductTy";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    rawItems: <Array<ProductTy>>[],
    isShowCart: false,
  }),

  actions: {
    toggleShowCart() {
      this.$patch({
        isShowCart: (this.isShowCart = !this.isShowCart),
      });
    },
    addItem(productData: ProductTy) {
      const existingItem = this.rawItems.find((el: ProductTy) => el.id === productData.id);
      if (!existingItem) {
        this.rawItems.push({ ...productData, qty: 1 });
      } else {
        existingItem.qty++;
      }
    },
    removeItem(productData: ProductTy) {
      const i = this.rawItems.lastIndexOf(productData);
      if (i > -1) this.rawItems.splice(i, 1);
    },
    purchaseItems() {},
    clearItems() {
      this.rawItems = [];
    },
  },
  getters: {
    items: (state) => state.rawItems,
    totalPrice: (state) => state.rawItems.reduce((items, el) => items + el.qty * el.price, 0),
  },
});
