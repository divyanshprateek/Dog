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
  collection = { count: 1000000, data: [] };
  collection1 = { count: 1000000, data: [] };
  collection2 = { count: 1000000, data: [] };
  newOrder: any;
  config: any;
  orders: any[] = [];
  total: any;
  subscriptions: any;
  config1: any;
  activeAppointment: any;
  services: any;
  config2: any;

  constructor(
    private windowService: NbWindowService,
    private dialogService: NbDialogService,
    private http: HttpClient
  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
    
    this.config1 = {
      itemsPerPage: 10,
      currentPage: 1
    };

    this.config2 = {
      itemsPerPage: 10,
      currentPage: 1
    };

  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("ACCESS_TOKEN");
    var index = token.indexOf(" ");
    var tokenstr = token.substr(index + 1);

    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer validToke."
    });

    this.http
      .get(`${this.url}/api/getDogOrders/` + user._id + "/" + tokenstr)
      .subscribe((data: any) => {
        console.log(data);
        this.newOrder = data.orders.sort(function(a, b) {
          a = new Date(a.createdDate);
          b = new Date(b.createdDate);
          return a > b ? -1 : a < b ? 1 : 0;
        });
        for (let order of this.newOrder) {
          this.collection.data.push({
            id: order._id,
            ...order
          });
        }
      });
      this.http
      .get(`${this.url}/api/getActiveSubscriptionDog/` + user._id + "/" + tokenstr)
      .subscribe((data: any) => {
        console.log(data);
        this.subscriptions = data.subscriptions.sort(function(a, b) {
          a = new Date(a.createdDate);
          b = new Date(b.createdDate);
          return a > b ? -1 : a < b ? 1 : 0;
        });
        for (let sub of this.subscriptions) {
          this.collection1.data.push({
            id: sub._id,
            ...sub
          });
        }
      });

      this.http
      .get(`${this.url}/api/getAppointmentDog/` + user._id + "/" + tokenstr)
      .subscribe((data: any) => {
        if (data.success === true) {

          this.activeAppointment = data.odata;
          for (let i = 0; i < this.activeAppointment.length; i++) {
            let date = this.activeAppointment[i].createdDate;
            var a = moment(date).format("DD MMM, hh:mm a");

            this.activeAppointment[i].styleDate = a;
          }
          console.log(this.activeAppointment);
        }

        this.services = this.activeAppointment.sort(function(a, b) {
          a = new Date(a.createdDate);
          b = new Date(b.createdDate);
          return a > b ? -1 : a < b ? 1 : 0;
        });
        for (let service of this.services) {
          service.time = new Date(service.time).toLocaleTimeString();
          this.collection2.data.push({
            id: service._id,
            ...service
          });
        }
      });
  }

  onFilterService(name) {
    const result = this.collection2.data.filter(obj => {
      return obj.userName.toLowerCase().includes(name.value.toLowerCase());
    });

    this.collection2.data = result;
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

  pageChanged(event) {
    this.config.currentPage = event;
  }

  pageChanged1(event) {
    this.config1.currentPage = event;
  }

  pageChanged2(event) {
    this.config1.currentPage = event;
  }

  onUpdate(order, select) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("ACCESS_TOKEN");

    var index = token.indexOf(" ");
    var tokenstr = token.substr(index + 1);

    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer validToke."
    });
    this.http
      .post(`${this.url}/api/updateOrderDog/`, {
        orderId: order._id,
        token: tokenstr,
        id: user._id,
        contactNum: order.contactNum,
        status: select.value
      })
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  onUpdateService(service,selectService) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("ACCESS_TOKEN");

    var index = token.indexOf(" ");
    var tokenstr = token.substr(index + 1);

    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer validToke."
    });
    this.http
      .post(`${this.url}/api/updateServiceDog/`, {
        orderId: service._id,
        token: tokenstr,
        id: user._id,
        contactNum: service.contactNum,
        status: selectService.value
      })
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  onFilter(data) {
    const result = this.collection.data.filter(obj => {
      return obj.userName.toLowerCase().includes(data.value.toLowerCase());
    });

    this.collection.data = result;
    console.log(this.collection.data);
  }

  // refresh() {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const token = localStorage.getItem("ACCESS_TOKEN");

  //   var index = token.indexOf(" ");
  //   var tokenstr = token.substr(index + 1);

  //   const httpHeaders = new HttpHeaders({
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer validToke."
  //   });
  //   this.http
  //     .get(`${this.url}/api/getDetailsDog/` + user._id + "/" + tokenstr)
  //     .subscribe((data: any) => {
  //       console.log(data);
  //       this.newOrder = data.newOrder.sort(function(a, b) {
  //         a = new Date(a.createdDate);
  //         b = new Date(b.createdDate);
  //         return a > b ? -1 : a < b ? 1 : 0;
  //       });
  //       for (let order of this.newOrder) {
  //         this.collection.data = [];
  //         this.collection.data.push({
  //           id: order._id,
  //           ...order
  //         });
  //       }
  //     });
  // }
}
