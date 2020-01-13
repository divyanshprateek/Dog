import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar.component';


@NgModule({
  declarations: [ SidebarComponent ],
  imports: [
    RouterModule, 
    CommonModule, 
    NgbModule
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
