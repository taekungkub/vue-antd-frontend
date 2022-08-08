import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {},
    token: "",
    role: "",
  }),

  actions: {
    async login(userData) {
      this.$patch({
        user: {
          ...userData,
        },
        token: userData,
        role: userData.role,
      });

      window.localStorage.setItem(
        "auth_data",
        JSON.stringify({
          token: userData,
        })
      );
    },
    tryLoginUserAccount() {
      const authData =
        localStorage.getItem("auth_data");

      if (!authData) return;
      const { token } = JSON.parse(authData);
      if (token) {
        this.$patch({
          token: token,
          role: token.role,
        });
      }
    },
    logout() {
      window.localStorage.removeItem("auth_data");

      this.$patch({
        user: {},
        token: "",
        role: "",
      });
    },
    updateRole(role) {
      this.$patch({
        role: role,
      });
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
