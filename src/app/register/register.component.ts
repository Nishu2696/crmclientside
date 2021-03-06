import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ServicesService } from '../services.service';
import { ToasterserviceService } from '../toasterservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: FormGroup;
  displayLoader = false;
  constructor(
    private fb: FormBuilder,
    private serv: ServicesService,
    private toastService: ToasterserviceService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    document.body.className = "body-class";
    this.register = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control(''),
      phone: this.fb.control(''),
      mobile: this.fb.control('', [Validators.required]),
      userType: this.fb.control('admin', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      confirmPassword: this.fb.control('', [Validators.required]),
      dob: this.fb.control(''),
      company: this.fb.control('', [Validators.required])
    })
  }

  ngOnDestroy(): void {
    document.body.className = "";
  }

  ngOnInit(): void {
  }

  registered() {
    if (this.register.valid) {
      console.log("49", this.register.value);
      let company = this.register.value.email.split("@");
      company = company[1].split(".")[0];
      if (company !== this.register.value.company) {
        this.showDanger("Enter a company Email Id");
        return;
      }
      if (this.register.value.password === this.register.value.confirmPassword) {
        delete this.register.value.confirmPassword;
        this.register.value.company=this.register.value.company.split(" ").join("");
        this.displayLoader = true;
        this.serv.register(this.register.value).subscribe((data) => {
          this.displayLoader = false;
          this.showSuccess(data['message']);
          this.router.navigate(['/']);
        }, (err) => {
          this.displayLoader = false;
          if (err.error) {
            this.showDanger(err.error['message']);
          }
          else
            console.log(err);
        })
      } else {
        alert("Password does not match");
      }
    } else {
      alert("Fill all fileds");
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
