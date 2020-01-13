import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AdminComponent } from "./admin/admin.component";
import { NavbarModule } from "./navbar/navbar.module";
import { SidebarModule } from "./sidebar/sidebar.module";
import { FooterModule } from "./footer/footer.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { CoreModule } from "./@core/core.module";
import {
  NbLayoutModule,
  NbThemeModule,
  NbWindowModule,
  NbOverlayModule,
  NbDialogModule
} from "@nebular/theme";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [AppComponent, AdminComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    NavbarModule,
    SidebarModule,
    FooterModule,
    DashboardModule,
    NbLayoutModule,
    NbThemeModule.forRoot(),
    NbWindowModule.forRoot(),
    NbDialogModule.forRoot(),
    NbOverlayModule.forRoot(),
    CoreModule.forRoot(),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbEvaIconsModule,
  ],
  providers: [],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
