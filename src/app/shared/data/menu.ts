import { Menu } from "../interface/menu.interface";

export const menu: Menu[] = [
  {
    id: 1,
    title: "dashboard",
    path: "/dashboard",
    active: false,
    icon: "ri-home-line",
    type: "sub",
    level: 1
  },
  {
    id: 2,
    title: "users",
    active: false,
    icon: "ri-contacts-line",
    type: "sub",
    level: 1,
    acl_permission: ["user.index","role.index"],
    children: [
      {
        parent_id: 2,
        title: "add user",
        path: "/user/create",
        type: "link",
        level: 2,
        permission: ["user.create"],
      },
      {
        parent_id: 2,
        title: "all users",
        path: "/user",
        type: "link",
        level: 2,
        permission: ["user.index"],
      },
      {
        parent_id: 2,
        title: "role",
        path: "/role",
        type: "link",
        level: 2,
        permission: ["role.index"],
      }
    ],
  },
  {
    id: 3,
    title: "products",
    active: false,
    icon: "ri-store-3-line",
    type: "sub",
    level: 1,
    acl_permission: ["product.index","product.create","category.index","tag.index","template.index"],
    children: [
      {
        parent_id: 3,
        title: "add product",
        path: "/product/create",
        type: "link",
        level: 2,
        permission: ["product.create"]
      },
      {
        parent_id: 3,
        title: "all products",
        path: "/product",
        type: "link",
        badgeType: 'badge bg-warning text-dark ml-3',
        badgeValue: 'total_products',
        level: 2,
        permission: ["product.index"]
      },
      {
        parent_id: 3,
        title: "categories",
        path: "/category",
        type: "link",
        badgeType: 'badge bg-warning text-dark ml-3',
        badgeValue: 'total_categories',
        level: 2,
        permission: ["category.index"]
      },
      {
        parent_id: 3,
        title: "tags",
        path: "/tag",
        type: "link",
        level: 2,
        permission: ["tag.index"]
      },
      {
        parent_id: 3,
        title: "templates",
        path: "/template",
        type: "link",
        level: 2,
        permission: ["template.index"]
      }
    ],
  },
  {
    id: 5,
    title: "orders",
    active: false,
    icon: "ri-list-unordered",
    type: "sub",
    level: 1,
    acl_permission: ["order.index","order.create"],
    children: [
      {
        parent_id: 5,
        title: "all orders",
        path: "/order",
        badgeType: 'badge bg-warning text-dark ml-3',
        badgeValue: 'total_orders',
        type: "link",
        level: 2,
        permission: ["order.index"]
      },
      {
        parent_id: 5,
        title: "create order",
        path: "/order/create",
        type: "link",
        level: 2,
        permission: ["order.create"]
      }
    ],
  },

  {
    id: 6,
    icon: "ri-group-line",
    title: "customers",
    active: false,
    path: "/customer",
    type: "sub",
    level: 1,
    permission: ["consumer.index"]
  },


  {
    id: 7,
    title: "media",
    path: "/media",
    active: false,
    icon: "ri-image-line",
    type: "sub",
    level: 1,
    permission: ["media.index"]
  },
  {
    id: 8,
    title: "taxes",
    path: "/tax",
    active: false,
    icon: "ri-percent-line",
    type: "sub",
    level: 1,
    permission: ["tax.index"]
  },
  {
    id: 9,
    title: "pages",
    active: false,
    icon: "ri-list-unordered",
    type: "sub",
    level: 1,
    acl_permission: ["page.index","page.create"],
    children: [
      {
        parent_id: 9,
        title: "pages",
        path: "/page",
        type: "link",
        level: 2,
        permission: ["page.index"]
      },
      {
        parent_id: 9,
        title: "files",
        path: "/file-content",
        type: "link",
        level: 2,
        permission: ["page.index"]
      },
      {
        parent_id: 9,
        title: "all qan",
        path: "/qna",
        type: "link",
        level: 2,
        permission: ["page.index"]
      }
    ],
  },

  {
    id: 10,
    title: "settings",
    path: "/setting",
    active: false,
    icon: "ri-settings-3-line",
    type: "sub",
    level: 1,
    permission: ["setting.index"]
  }
];
