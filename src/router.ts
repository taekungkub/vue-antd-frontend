import { computed, nextTick, toRefs } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import { useUserStore } from "./stores/user";
import useRolePermission from "./config/useRolePermission";
const { ROLE_PERMISSION } = useRolePermission();

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/",
    name: "Home",
    component: () => import("./layout/DashboardLayout.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("./views/dashboard/Index.vue"),
      },
      {
        path: "/profile",
        name: "Profile",
        component: () => import("./views/Profile.vue"),
      },
      {
        path: "/shop",
        name: "Shop",
        component: () => import("./views/Shopping/index.vue"),
      },

      {
        path: "/manage-user",
        name: "ManageUser",
        component: () => import("./views/ManageUser/index.vue"),
        meta: {
          roles: ROLE_PERMISSION.PAGE.MANAGE_USER.CAN_SEE,
        },
      },
      {
        path: "/manage-role",
        name: "ManageRole",
        component: () => import("./views/ManageRole/index.vue"),
        meta: {
          roles: ["admin"],
        },
      },
      {
        path: "/manage-product/index",
        name: "ManageProduct",
        component: () => import("./views/ManageProduct/index.vue"),
        meta: {
          roles: ["admin", "staff"],
        },
      },
      {
        path: "/manage-product/add/:id?",
        name: "AddProduct",
        component: () => import("./views/ManageProduct/AddProduct.vue"),
        meta: {
          name: "Add product",
          roles: ["admin", "staff"],
        },
      },
      {
        path: "/manage-order/add/",
        name: "AddOrder",
        component: () => import("./views/Order/AddOrder.vue"),
        meta: {
          name: "Add order",
          roles: ["admin", "staff"],
        },
      },
      {
        path: "/manage-order/index",
        name: "ManageOrder",
        component: () => import("./views/Order/index.vue"),
        meta: {
          roles: ["admin", "staff"],
        },
      },
      {
        path: "/orders",
        name: "OrderUser",
        component: () => import("./views/Order/OrderUser.vue"),
        meta: {
          roles: ["admin", "staff", "user"],
        },
      },

      {
        path: "/permission/admin",
        name: "PermissionAdmin",
        component: () => import("./views/permisstion/Admin.vue"),
        meta: {
          roles: ["admin"],
        },
      },
      {
        path: "/permission/staff",
        name: "PermissionStaff",
        component: () => import("./views/permisstion/Staff.vue"),
        meta: {
          roles: ["admin", "staff"],
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("./views/auth/Login.vue"),
    meta: {
      layout: "user",
      requiresUnauth: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("./views/auth/Register.vue"),
    meta: {
      layout: "user",
      requiresUnauth: true,
    },
  },
  {
    path: "/forgotpassword",
    name: "Forgotpassword",
    component: () => import("./views/auth/Forgotpassword.vue"),
    meta: {
      layout: "user",
      requiresUnauth: true,
    },
  },
  {
    path: "/verify/:code",
    name: "Verify",
    component: () => import("./views/auth/Verify.vue"),
    meta: {
      layout: "user",
      requiresUnauth: true,
    },
  },
  {
    path: "/403",
    name: "403",
    component: () => import("./views/exception/403.vue"),
    meta: {
      layout: "empty",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to: any, from: any) => {
  const user = useUserStore();

  user.checkTokenExpired();

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
