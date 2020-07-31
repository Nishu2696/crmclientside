import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { ToasterserviceService } from '../toasterservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: FormGroup;
  displayLoader = false;

  constructor(
    private fb: FormBuilder,
    private serv: ServicesService,
    private toastService: ToasterserviceService,
    private router: Router
  ) {
    document.body.className = "body-class";
    this.credentials = this.fb.group({
      email: this.fb.control('', [Validators.email, Validators.required]),
      password: this.fb.control('', [Validators.required])
    })
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.body.className = "";
  }
  login() {
    if (this.credentials.valid) {
      console.log("classname",document.body.className);
      // console.log("hello");
      this.displayLoader = true;
      this.serv.login(this.credentials.value).subscribe((data) => {
        this.displayLoader = false;
        // console.log(data);
        this.showSuccess(data["message"]);
        this.serv.setToken(data['token']);
        this.serv.setEmail(data['email']);
        this.serv.userType = data['userType'];
        this.router.navigate(['/dashboard']);
      }, (err) => {
        this.displayLoader = false;
        console.log("54",err);
        this.showDanger(err.error["message"]);
      });
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
