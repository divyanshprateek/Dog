import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "",
        loadChildren: "./dashboard/dashboard.module#DashboardModule"
      }
    ]
  },
  {
    path: "login",
    loadChildren: "./login/login.module#LoginModule"
  },
  {
    path: "dashboard",
    loadChildren: "./dashboard/dashboard.module#DashboardModule"
  },
  {
    path: "register",
    loadChildren: "./register/register.module#RegisterModule"
  },
  {
    path: "orders",
    loadChildren: "./dashboard/orders/orders.module#OrdersModule"
  },
  {
    path: "subscriptions",
    loadChildren: "./dashboard/subscriptions/subscriptions.module#SubscriptionsModule"
  },
  {
    path: "services",
    loadChildren: "./dashboard/services/services.module#ServicesModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
