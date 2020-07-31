import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicesService } from '../services.service';
import { ToasterserviceService } from '../toasterservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accountverify',
  templateUrl: './accountverify.component.html',
  styleUrls: ['./accountverify.component.css']
})
export class AccountverifyComponent implements OnInit {

  email;
  verificationToken;
  verificationDone = false;
  constructor(
    private serv: ServicesService,
    private toastService: ToasterserviceService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    document.body.className = "body-class";
    this.verificationToken = this.activeRoute.snapshot.params.token;
    this.email = this.activeRoute.snapshot.params.email;
    this.serv.verifyAccount({ verificationToken: this.verificationToken, email: this.email }).subscribe((data) => {
      this.showSuccess(data['message']);
      this.verificationDone = true;
    }, (err) => {
      if (err.error) {
        this.showDanger(err.error['message']);
      }
      else
        console.log(err);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    document.body.className = "";
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
