import { api } from "@/service/api";
import { defineStore } from "pinia";
import Cookies from "js-cookie";
const token = Cookies.get("auth");

export const useNotesStore = defineStore("notes", {
  state: () => ({
    notes: null,
  }),
  getters: {},
  actions: {
    // Get All Notes
    async fetchNotes() {
      api
        .get("/note")
        .then((response) => {
          if (response.data && response.data.data) {
            this.notes = response.data.data;
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            window.location.reload();
          }
        });
    },

    // Create Note
  },
});

// api
//         .get("/user")
//         .then((response) => {
//           if (response.data && response.data.data) {
//             this.user = response.data.data;
//           }
//           console.log(
//             `Selamat Datang %c${this.user.username}!.`,
//             "color: green"
//           );
//           console.log(
//             "Organize Work And Life Easily, %cFor Productivity",
//             "background-color: pink; color: black"
//           );
//         })
//         .catch((error) => {
//           if (error.response.status === 401) {
//             localStorage.clear();
//             window.location.reload();
//           }
//         });
