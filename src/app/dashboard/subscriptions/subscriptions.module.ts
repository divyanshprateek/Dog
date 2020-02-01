import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionsComponent } from './subscriptions.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarModule } from 'src/app/navbar/navbar.module';
import { FooterModule } from 'src/app/footer/footer.module';

export const SubscriptionsRoutes: Routes = [
  {
    path: '',
    component: SubscriptionsComponent
  }
];

@NgModule({
  declarations: [SubscriptionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SubscriptionsRoutes),
    NgxPaginationModule,
    FontAwesomeModule,
    NavbarModule,
    FooterModule
  ]
})
export class SubscriptionsModule { }
