import { OrderTy } from "../types/OrderTy.js";
import Api from "./Api.js";

export default {
  getOrders() {
    return Api.get("/orders");
  },

  getOrderUser(id: string | number) {
    return Api.get(`/orders/user/${id}`);
  },

  createOrder(items: any, user_id: string | number, status: string, payment: string, totalPrice: string | number) {
    return Api.post("/orders", {
      user_id: user_id,
      status: status,
      payment: payment,
      total: totalPrice,

      order_product: items,
    });
  },
  updateOrder(item: OrderTy, id?: string | number) {
    return Api.put(`/orders/${id}`, {
      ...item,
    });
  },
  removeOrder(id: string | number, order: OrderTy) {
    console.log(order);
    return Api.post(`/orders/${id}`, {
      order: order,
    });
  },
};
