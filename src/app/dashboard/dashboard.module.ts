import { NgModule, InjectionToken } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DashboardRoutes } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";

import { NotesEditorComponent } from "../components/notes-editor/notes-editor.component";
import {
  NbWindowModule,
  NbCardModule,
  NbDialogModule,
} from "@nebular/theme";

import { NgxTinymceModule } from "ngx-tinymce";
import { CalendarComponent } from "../components/calendar/calendar.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { StickNotesComponent } from "../components/stick-notes/stick-notes.component";
import { OrdersTableComponent } from '../components/orders-table/orders-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NotesEditorComponent,
    CalendarComponent,
    StickNotesComponent,
    OrdersTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    HttpClientModule,
    NbWindowModule.forChild(),
    NbCardModule,
    NbDialogModule.forChild(),
    NgxPaginationModule,
    NgxTinymceModule.forRoot({
      baseURL: "//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/"
    }),
    FullCalendarModule,
    FontAwesomeModule
  ],
  providers: [],
  entryComponents: [
    NotesEditorComponent,
    CalendarComponent,
    StickNotesComponent,
    OrdersTableComponent
  ]
})
export class DashboardModule {}
