import { OrderTy } from "../types/OrderTy.js";
import Api from "./Api.js";

export default {
  getOrders() {
    return Api.get("/orders");
  },

  getOrderUser(id: string | number) {
    return Api.get(`/orders/user/${id}`);
  },

  createOrder(items: any, user_id: string | number, status: string, payment: string) {
    return Api.post("/orders", {
      user_id: user_id,
      status: status,
      payment: payment,
      order_product: items,
    });
  },
  updateOrder(item: OrderTy, id?: string | number) {
    return Api.put(`/orders/${id}`, {
      ...item,
    });
  },
  removeOrder(id?: string | number) {
    return Api.delete(`/orders/${id}`);
  },
};
