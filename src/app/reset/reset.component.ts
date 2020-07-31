import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ServicesService } from '../services.service';
import { ToasterserviceService } from '../toasterservice.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  resetpasswords;
  displayLoader = false;
  passwordResetToken;

  constructor(
    private fb: FormBuilder,
    private serv: ServicesService,
    private toastService: ToasterserviceService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    document.body.className = "body-class";
    this.resetpasswords = this.fb.group({
      password: this.fb.control('', [Validators.required]),
      confirm_password: this.fb.control('', [Validators.required]),
      passwordResetToken: this.activeRoute.snapshot.params.token,
      email: this.activeRoute.snapshot.params.email
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.body.className = "";
  }
  reset() {
    if (this.resetpasswords.valid && this.resetpasswords.value.password === this.resetpasswords.value.confirm_password) {
      this.displayLoader = true;
      this.serv.resetPassword(this.resetpasswords.value).subscribe((data) => {
        this.displayLoader = false;
        this.showSuccess(data['message']);
        this.router.navigate(['/']);
      }, (err) => {
        this.displayLoader = false;
        if (err.error) {
          this.showDanger(err.error['message']);
          this.router.navigate(['/forgotpassword']);
        }
        else
          console.log(err);
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
