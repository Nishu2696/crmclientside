import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterserviceService } from '../toasterservice.service';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-addlead',
  templateUrl: './addlead.component.html',
  styleUrls: ['./addlead.component.css']
})
export class AddleadComponent implements OnInit {

  leadDetails: FormGroup;
  displayLoader = true;
  employees = [];
  constructor(
    private fb: FormBuilder,
    private serv: ServicesService,
    private toastService: ToasterserviceService,
    private router: Router
  ) {
    this.serv.getAllUsers().subscribe((data) => {
      this.displayLoader = false;
      this.employees = data['users'];
    }, (err) => {
      this.displayLoader = false;
      this.showDanger(err.error['message']);
    })
    this.leadDetails = this.fb.group({
      owner: this.fb.control('', [Validators.required]),
      company: this.fb.control('', [Validators.required]),
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control(''),
      email: this.fb.control('', [Validators.required, Validators.email]),
      title: this.fb.control('', [Validators.required]),
      phone: this.fb.control(''),
      mobile: this.fb.control('', [Validators.required]),
      leadSource: this.fb.control('', [Validators.required]),
      leadStatus: this.fb.control('', [Validators.required]),
      secondaryEmail: this.fb.control('', []),
    })
  }

  ngOnInit(): void {
  }

  createLead(){
    if(this.leadDetails.valid){
      this.displayLoader=true;
      this.leadDetails.value.ownerName=this.employees[this.leadDetails.value.owner].firstName+" "+this.employees[this.leadDetails.value.owner].lastName;
      this.leadDetails.value.owner=this.employees[this.leadDetails.value.owner].email;
      console.log("createLead function",this.leadDetails);
      this.serv.createLead(this.leadDetails.value).subscribe((data)=>{
        this.displayLoader=false;
        this.showSuccess(data['message']);
        this.router.navigate(['/dashboard/leads']);
      },(err)=>{
        this.displayLoader=false;
        this.showDanger(err.error['message']);
      })
    }else{
      this.showDanger('Enter all required details');
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
