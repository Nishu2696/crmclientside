import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { ToasterserviceService } from '../toasterservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  email = "";
  displayLoader = false;
  constructor(
    private serv: ServicesService,
    private toastService : ToasterserviceService,
    private router : Router,
    private activeRouter: ActivatedRoute
  ) { 
    document.body.className="body-class";
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    document.body.className="";
  }
  forgetpassword(){
    if(this.email!==''){
      this.displayLoader=true;
      this.serv.forgetPassword(this.email).subscribe((data)=>{
        this.displayLoader=false;
        this.showSuccess(data['message']);
        this.router.navigate(['/']);
      },(err)=>{
        this.displayLoader=false;
        this.showDanger(err.error['message'])
      })
    }
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
