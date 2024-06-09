import { api } from "@/service/api";
import { defineStore } from "pinia";
import Cookies from "js-cookie";
const token = Cookies.get("auth");

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  getters: {},
  actions: {
    async fetcUser() {
      api.defaults.headers.common["Authorization"] = token;
      try {
        const response = await api.get("/user");
        const { data } = response.data;

        this.user = data;
        this.isAuthenticated = true;
      } catch (error) {
        this.user = null;
        this.isAuthenticated = false;
      }
    },
  },
});
