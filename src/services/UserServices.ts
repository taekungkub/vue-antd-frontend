import { FormAddUserTy, UserTy } from "../types/UserTy.js";
import Api from "./Api.js";

export default {
  getAllUser() {
    return Api.get("/users");
  },
  createuser(formUser: FormAddUserTy) {
    return Api.post("/users", {
      user_email: formUser.user_email,
      user_password: formUser.user_password,
      user_confirm_password: formUser.user_confirm_password,
      user_displayname: formUser.user_displayname,
      user_tel: formUser.user_tel,
      is_verify: formUser.is_verify,
      role_id: formUser.role_id,
    });
  },
  userDetail(id: string) {
    return Api.get("/users/" + id);
  },
  removeUser(id: string) {
    return Api.delete("/users/" + id);
  },
  updateUser(formState: FormAddUserTy, id?: string | number) {
    return Api.put("/users/" + id, {
      ...formState,
    });
  },
};
