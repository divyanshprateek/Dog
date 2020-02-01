import { Component, OnInit } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import {
  faCoffee,
  faPlusCircle,
  faEdit,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import * as moment from "moment";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  url: string = "http://13.233.55.160";
  faCoffee = faCoffee;
  faPlusCircle = faPlusCircle;
  faEdit = faEdit;
  faTrash = faTrashAlt;
  page: any;
  collection2 = { count: 100000, data: [] };
  newOrder: any;
  config: any;
  orders: any[] = [];
  total: any;
  subscriptions: any;
  config1: any;
  activeAppointment: any;
  services: any;
  config2: any;

  constructor(private http: HttpClient) { 
    this.config2 = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.collection2.data.length
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

  pageChanged2(event) {
    this.config2.currentPage = event;
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


  onFilterService(name) {
    const result = this.collection2.data.filter(obj => {
      return obj.userName.toLowerCase().includes(name.value.toLowerCase());
    });

    this.collection2.data = result;
  }


}
