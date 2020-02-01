import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarModule } from 'src/app/navbar/navbar.module';
import { FooterModule } from 'src/app/footer/footer.module';

export const ServicesRoutes: Routes = [
  {
    path: '',
    component: ServicesComponent
  }
];


@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ServicesRoutes),
    FontAwesomeModule,
    NgxPaginationModule,
    NavbarModule,
    FooterModule
  ]
})
export class ServicesModule { }
