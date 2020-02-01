import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { NavbarModule } from 'src/app/navbar/navbar.module';
import { FooterModule } from 'src/app/footer/footer.module';


export const OrdersRoutes: Routes = [
  {
    path: '',
    component: OrdersComponent
  }
];

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(OrdersRoutes),
    FontAwesomeModule,
    NgxPaginationModule,
    NavbarModule,
    FooterModule
  ],
  entryComponents: []
})
export class OrdersModule { }
