import Api from "./Api.js";
import MockUser from "../mock/user";

export default {
  login(username, password) {
    return new Promise((resolve, reject) => {
      if (
        username === MockUser.data.username &&
        password === MockUser.data.password
      ) {
        resolve(MockUser.data);
      }
      reject("Error");
    });
  },
  register() {},
};
