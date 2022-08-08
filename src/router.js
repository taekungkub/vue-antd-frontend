import { nextTick } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import { useUserStore } from "./stores/user";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("./views/dashboard/Index.vue"),
    meta: {
      layout: "admin",
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "user",
      requiresUnauth: true,
    },
    component: () => import("./views/auth/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      layout: "user",
      requiresUnauth: true,
    },
    component: () => import("./views/auth/Register.vue"),
  },
  {
    path: "/form/basic",
    name: "FormBasic",
    meta: {
      layout: "admin",
    },
    component: () => import("./views/form/FormBasic.vue"),
  },
  {
    path: "/form/step",
    name: "FormStep",
    meta: {
      layout: "admin",
    },
    component: () => import("./views/form/FormStep.vue"),
  },

  {
    path: "/table/basic",
    name: "TableBasic",
    meta: {
      layout: "admin",
    },
    component: () => import("./views/table/Basic.vue"),
  },

  {
    path: "/profile",
    name: "Profile",

    component: () => import("./views/Profile.vue"),
    meta: { layout: "admin", requiresAuth: true },
  },
  {
    path: "/account/setting",
    name: "Account",
    component: () => import("./views/account/Settings.vue"),
    redirect: "/account/setting/base",
    meta: { layout: "admin", requiresAuth: true },
    children: [
      {
        path: "/account/setting/base",
        name: "Base",
        component: () => import("./views/account/Base.vue"),
      },
      {
        path: "/account/setting/security",
        name: "Security",
        component: () => import("./views/account/Security.vue"),
      },
    ],
  },

  {
    path: "/permission/page",
    component: () => import("./views/permission/Page.vue"),
    name: "PagePermission",
    meta: {
      requiresAuth: true,
      layout: "admin",
      roles: ["bad"],
    },
  },
  {
    path: "/permission/directive",
    component: () => import("./views/permission/Directive.vue"),
    name: "DirectivePermission",
    meta: {
      layout: "admin",
      requiresAuth: true,
    },
  },
  {
    path: "/:notFound(.*)",
    component: import("./views/exception/404.vue"),
  },
  {
    path: "/403",
    component: import("./views/exception/403.vue"),
    meta: {
      layout: "admin",
      requiresAuth: true,
    },
  },

  {
    path: "/exception/403",
    component: import("./views/exception/403.vue"),
    meta: {
      hideBreadcrumb: true,
      layout: "admin",
      requiresAuth: true,
    },
  },
  {
    path: "/exception/404",
    component: import("./views/exception/404.vue"),
    meta: {
      hideBreadcrumb: true,
      layout: "admin",
      requiresAuth: true,
    },
  },

  {
    path: "/component",
    component: import("./views/component/index.vue"),
    meta: {
      layout: "admin",
      requiresAuth: true,
    },
    children: [
      {
        path: "/component/modal",
        component: import("./views/component/Modal.vue"),
      },
      {
        path: "/component/clipboard",
        component: import("./views/component/Clipboard.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const user = useUserStore();

  if (to.meta.requiresAuth && !user.isAuthenticated) {
    return { path: "/login" };
  } else if (to.meta.requiresUnauth && user.isAuthenticated) {
    return { path: "/" };
  } else if (to.meta.requiresAuth && user.isAuthenticated) {
    if (to.meta.roles) {
      if (!to.meta.roles.includes(user.role)) {
        return { path: "/403" };
      }
    }
  }
});

export default router;
