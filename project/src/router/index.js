import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import { auth } from "../firebase";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/register.vue"),
  },
  {
    path: "/login2",
    name: "Login2",
    component: () => import("../views/Login2.vue"),
  },
  {
    path: "/post",
    name: "Post",
    component: () => import("../views/post.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== "/login2" && to.path !== "login" && !auth.currentUser)
    if (
      to.matched.some((record) => record.meta.requiresAuth) &&
      !auth.currentUser
    ) {
      /*  {
    next({path:'/login2'})
    return;
  } */

      next("/login2");
      return;
    }

  next();
});

export default router;
