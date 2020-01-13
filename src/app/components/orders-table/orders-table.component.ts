import { Component, OnInit } from '@angular/core';
import { faCoffee,faPlusCircle,faEdit,faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
  faCoffee = faCoffee;
  faPlusCircle = faPlusCircle;
  faEdit = faEdit;
  faTrash = faTrashAlt;
  num = [1,2,3,4,5,6,7,8,9,10];
  constructor(){}

  ngOnInit() {}
}
