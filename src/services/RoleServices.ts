import Api from "./Api.js";

export default {
  getAllRoles() {
    return Api.get("/roles");
  },

  createRole(title: string) {
    return Api.post("/roles", {
      role_title: title,
    });
  },
};
