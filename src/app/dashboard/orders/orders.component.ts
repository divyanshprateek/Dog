import { Component, OnInit, OnChanges } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import {
  faCoffee,
  faPlusCircle,
  faEdit,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import * as moment from "moment";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  
  url: string = "http://13.233.55.160";
  faCoffee = faCoffee;
  updateStatus = false;
  faPlusCircle = faPlusCircle;
  faEdit = faEdit;
  faTrash = faTrashAlt;
  page: any;
  collection = { count: 100000, data: [] };
  newOrder: any;
  config: any;
  orders: any[] = [];
  total: any;
  subscriptions: any;
  config1: any;
  activeAppointment: any;
  services: any;
  config2: any;

  constructor(private http: HttpClient, private router: Router, private orderService: AuthService) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.collection.data.length
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
    console.log(this.http);
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
  }

  refresh() {
    this.orderService.getData().subscribe(data => {
      this.newOrder = data.orders.sort(function(a, b) {
        a = new Date(a.createdDate);
        b = new Date(b.createdDate);
        return a > b ? -1 : a < b ? 1 : 0;
      });
      this.collection.data = [];
      for (let order of this.newOrder) {
        this.collection.data.push({
          id: order._id,
          ...order
        });
      }

    });
  }


  pageChanged(event) {
    this.config.currentPage = event;
  }

  onUpdate(order, select) {
    this.updateStatus = false;
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("ACCESS_TOKEN");

    var index = token.indexOf(" ");
    var tokenstr = token.substr(index + 1);

    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer validToke."
    });
    console.log(this.http);
    this.http
      .post(`${this.url}/api/updateOrderDog/`, {
        orderId: order._id,
        token: tokenstr,
        id: user._id,
        contactNum: order.contactNum,
        status: select.value
      })
      .subscribe((data: any) => {
        this.updateStatus = true;
        this.refresh();
      });
  }

  onFilter(data) {
    const result = this.collection.data.filter(obj => {
      return obj.userName.toLowerCase().includes(data.value.toLowerCase());
    });

    this.collection.data = result;
    console.log(this.collection.data);
  }

  changeStatus() {
    this.updateStatus = false;
  }
}
