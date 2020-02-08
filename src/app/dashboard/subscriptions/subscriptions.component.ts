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
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  url: string = "http://13.233.55.160";
  faCoffee = faCoffee;
  faPlusCircle = faPlusCircle;
  faEdit = faEdit;
  faTrash = faTrashAlt;
  page: any;
  collection1 = { count: 100000, data: [] };
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
    this.config1 = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.collection1.data.length
    };
    setInterval(this.ngOnInit, 180000);
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
  }

  pageChanged1(event) {
    this.config1.currentPage = event;
  }

}
