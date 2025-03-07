import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "dashboard",
    loadChildren: () => import("../../components/dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "account",
    loadChildren: () => import("../../components/account/account.module").then((m) => m.AccountModule),
  },
  {
    path: "role",
    loadChildren: () => import("../../components/role/role.module").then((m) => m.RoleModule),
  },
  {
    path: "user",
    loadChildren: () => import("../../components/user/user.module").then((m) => m.UserModule),
  },
  {
    path: "attribute",
    loadChildren: () => import("../../components/attribute/attribute.module").then((m) => m.AttributeModule),
  },
  {
    path: "tag",
    loadChildren: () => import("../../components/tag/tag.module").then((m) => m.TagModule),
  },
  {
    path: "page",
    loadChildren: () => import("../../components/page/page.module").then((m) => m.PageModule),
  },
  {
    path: "file-content",
    loadChildren: () => import("../../components/file-content/file-content.module").then((m) => m.FileContentModule),
  },

  {
    path: "template",
    loadChildren: () => import("../../components/dynamic-template/dynamic-template.module").then((m) => m.DynamicTemplateModule),
  },
  {
    path: "customer",
    loadChildren: () => import("../../components/customers/customer.module").then((m) => m.CustomerModule),
  },
  {
    path: "tax",
    loadChildren: () => import("../../components/tax/tax.module").then((m) => m.TaxModule),
  },
  {
    path: "category",
    loadChildren: () => import("../../components/category/category.module").then((m) => m.CategoryModule),
  },
  {
    path: "shipping",
    loadChildren: () => import("../../components/shipping/shipping.module").then((m) => m.ShippingModule),
  },
  {
    path: "media",
    loadChildren: () => import("../../components/media/media.module").then((m) => m.MediaModule),
  },

  {
    path: "product",
    loadChildren: () => import("../../components/product/product.module").then((m) => m.ProductModule),
  },
  {
    path: "currency",
    loadChildren: () => import("../../components/currency/currency.module").then((m) => m.CurrencyModule),
  },
  {
    path: "wallet",
    loadChildren: () => import("../../components/wallet/wallet.module").then((m) => m.WalletModule),
  },
  {
    path: "point",
    loadChildren: () => import("../../components/point/point.module").then((m) => m.PointModule),
  },
  {
    path: "setting",
    loadChildren: () => import("../../components/setting/setting.module").then((m) => m.SettingModule),
  },
  {
    path: "order",
    loadChildren: () => import("../../components/order/order.module").then((m) => m.OrderModule),
  },
  {
    path: "vendor-wallet",
    loadChildren: () => import("../../components/vendor-wallet/vendor-wallet.module").then((m) => m.VendorWalletModule),
  },
  {
    path: "payment-details",
    loadChildren: () => import("../../components/payout-details/payout-details.module").then((m) => m.PaymentDetailsModule),
  },
  {
    path: "notification",
    loadChildren: () => import("../../components/notification/notification.module").then((m) => m.NotificationModule)
  },
  {
    path: "withdrawal",
    loadChildren: () => import("../../components/withdrawal/withdrawal.module").then((m) => m.WithdrawalModule)
  },
  {
    path: "qna",
    loadChildren: () => import("../../components/questions-answers/questions-answers.module").then((m) => m.QuestionsAnswersModule)
  }
];
