import { defineStore } from "pinia"
import jwt_decode from "jwt-decode"
import { UserTy } from "../types/UserTy"
import AuthServices from "../services/AuthServices"
import { LogTy } from "../types/LogTy"

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    token: "",
    refresh_token: "",
    role: "",
    info: {} as UserTy,
    logList: [] as Array<LogTy>,
    isLoadingUser: Boolean(false),
  }),

  actions: {
    login(email: string, password: string) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await AuthServices.login(email, password)
          if (res.data) {
            const { access_token, refresh_token } = res.data
            this.updateToken(access_token, refresh_token)
            resolve(res.data)
          }
        } catch (error) {
          reject(error)
        }
      })
    },

    tryAutoLogin() {
      return new Promise((resolve, reject) => {
        const authData = localStorage.getItem("auth_data")
        if (!authData) return
        const { access_token, refresh_token } = JSON.parse(authData)

        if (access_token) {
          this.updateToken(access_token, refresh_token)

          resolve(access_token)
        }
      })
    },
    logout() {
      window.localStorage.removeItem("auth_data")
      this.$patch({
        token: "",
        refresh_token: "",
        info: {},
        role: "",
        logList: [],
      })
    },
    updateProfile(userData: any) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await AuthServices.changeProfile(userData)
          if (res.data) {
            resolve("done")
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    async getUserInfo() {
      try {
        this.isLoadingUser = true
        const res = await AuthServices.profile()
        const userData: UserTy = res.data
        this.$patch({
          role: userData.role_title,
          info: {
            ...userData,
          },
        })
        this.isLoadingUser = false
        return Promise.resolve(this.info)
      } catch (error) {
        this.isLoadingUser = false

        return Promise.reject(error)
      }
    },
    changePassword(password: string, cfPassword: string) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await AuthServices.changePassword(password, cfPassword)
          if (res.data) {
            resolve(res.data)
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    isExpired(token: string) {
      let { exp }: any = jwt_decode(token)
      if (Date.now() > exp * 1000) return true
      else return false
    },

    updateToken(token: string, refresh_token: string) {
      this.$patch({
        token: token,
        refresh_token: refresh_token,
      })

      window.localStorage.setItem(
        "auth_data",
        JSON.stringify({
          access_token: token,
          refresh_token: refresh_token,
        })
      )
    },
    async getLogUser() {
      try {
        const res = await AuthServices.profileLog()
        this.logList = res.data
      } catch (error) {}
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
})
