//import vue router
import { createRouter, createWebHistory } from "vue-router";

//define a routes
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: { title: "NotusPad - Note & Task Management" },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/auth/RegisterView.vue"),
    meta: { title: "Register - NotusPad" },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/LoginView.vue"),
    meta: { title: "Login - NotusPad" },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/DashboardView.vue"),
    meta: { requiresAuth: true, title: "Dashboard - NotusPad" },
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
  {
    path: "/dashboard/note/:id",
    name: "dashboard.note.detail",
    component: () => import("../views/Dashboard/detail/NoteDetail.vue"),
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
  document.title = to.meta.title;
  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    next({ name: "login" });
  } else if ((to.name === "login" || to.name === "register") && token) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
