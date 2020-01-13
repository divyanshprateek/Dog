import { Component, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { Subject } from "rxjs";
import { StickService } from "./stick-notes.service";
@Component({
  selector: "app-stick-notes",
  templateUrl: "./stick-notes.component.html",
  styleUrls: ["./stick-notes.component.scss"]
})
export class StickNotesComponent implements OnInit {
  items = [];
  constructor(protected ref: NbDialogRef<StickNotesComponent>, private stickService: StickService) {}

  ngOnInit() {
    this.stickService.items.subscribe(items => {
      this.items = items;
    })
  }

  cancel() {
    this.ref.close();
  }

  submit(name) {
    this.stickService.onAddNote(name.value).subscribe(()=> {
      console.log('added note');
    });
  }
}
