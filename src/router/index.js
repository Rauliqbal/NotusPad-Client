//import vue router
import { createRouter, createWebHistory } from "vue-router";

//define a routes
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/auth/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/LoginView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/profile",
    name: "dashboard.profile",
    component: () => import("../views/Dashboard/ProfileView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/task",
    name: "dashboard.task",
    component: () => import("../views/Dashboard/TaskView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/note",
    name: "dashboard.note",
    component: () => import("../views/Dashboard/NoteView.vue"),
    meta: { requiresAuth: true },
  },
  //  {
  //     path: "/admin/users/:id",
  //     name: "admin.users.edit",
  //     component: () =>
  //        import(/* webpackChunkName: "home" */ "../views/admin/users/edit.vue"),
  //     meta: { requiresAuth: true }, // <-- Add meta field
  //  },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access_token");
  // Jika rute tujuan membutuhkan otentikasi dan pengguna tidak memiliki token
  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    // Alihkan pengguna ke halaman login
    next({ name: "login" });
  }
  // Jika rute tujuan adalah halaman login atau register dan pengguna sudah login
  else if ((to.name === "login" || to.name === "register") && token) {
    // Alihkan pengguna ke halaman dashboard
    next({ name: "dashboard" });
  }
  // Jika tidak ada kondisi khusus, izinkan navigasi ke rute tujuan
  else {
    next();
  }
});

export default router;
