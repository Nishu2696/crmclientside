import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { ToasterserviceService } from '../toasterservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private serv: ServicesService,
    private toastService: ToasterserviceService
  ) { }

  ngOnInit(): void {
  }

  signOut(){
    this.serv.signOut();
    this.showSuccess('Logged out')
  }
  showStandard(msg) {
    this.toastService.show(msg);
  }
  
  showSuccess(msg) {
    this.toastService.show(msg, { classname: 'bg-success text-light', delay: 5000 });
  }
  
  showDanger(msg) {
    this.toastService.show(msg, { classname: 'bg-danger text-light', delay: 8000 });
  }
}
