import { Component, OnInit } from "@angular/core";
import { NbWindowService, NbDialogService } from "@nebular/theme";
import { NotesEditorComponent } from "../components/notes-editor/notes-editor.component";
import { CalendarComponent } from "../components/calendar/calendar.component";
import { StickNotesComponent } from "../components/stick-notes/stick-notes.component";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import {
  faCoffee,
  faPlusCircle,
  faEdit,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import * as moment from "moment";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  url: string = "http://13.233.55.160";
  faCoffee = faCoffee;
  faPlusCircle = faPlusCircle;
  faEdit = faEdit;
  faTrash = faTrashAlt;
  page: any;
  collection = { count: 100000, data: [] };
 

  constructor(
    private windowService: NbWindowService,
    private dialogService: NbDialogService,
    private http: HttpClient
  ) {}
  

  ngOnInit() {
  }

 

  openNotes() {
    this.dialogService.open(NotesEditorComponent, {
      hasBackdrop: false
    });
  }

  openCal() {
    this.dialogService.open(CalendarComponent, {
      hasBackdrop: false
    });
  }

  openSticky() {
    this.dialogService.open(StickNotesComponent, {
      hasBackdrop: false
    });
  }
}
