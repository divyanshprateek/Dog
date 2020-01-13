import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { NbDialogRef } from '@nebular/theme';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  entryComponents: [],
})
export class CalendarComponent implements OnInit {
  close = faTimesCircle;
  calendarPlugins = [dayGridPlugin];

  constructor(protected ref: NbDialogRef<CalendarComponent>) {}

  ngOnInit() {
  }

  onClose() {
    this.ref.close();
  }
}
