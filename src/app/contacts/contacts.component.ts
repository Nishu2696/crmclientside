import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ServicesService } from '../services.service';
import { ToasterserviceService } from '../toasterservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  faPencilAlt = faPencilAlt;
  faCheck = faCheck;
  contacts = [];
  displayLoader = true;
  selectedContact = [];
  selectAllContacts = false;
  updateLeadStatus = false;
  activeLeadStatus = '';
  activeLead = '';

  constructor(
    private fb: FormBuilder,
    private serv: ServicesService,
    private toastService: ToasterserviceService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.loadContacts();
  }

  ngOnInit(): void {
  }

  loadContacts() {
    this.serv.getAllContacts().subscribe((data) => {
      this.displayLoader = false;
      this.contacts = data['contacts'].reverse().map(lead => { lead.selected = false; return lead });
      // console.log(this.leads);
    }, (err) => {
      this.displayLoader = false;
      console.log(err);
    });
  }
  getSelectedContacts() {
    this.selectedContact = this.contacts.filter(item => { if (item.selected) return item['_id'] });
    // console.log(this.selectedLead);
  }
  selectAll() {
    if (this.selectAllContacts) {
      this.contacts = this.contacts.map(lead => { lead.selected = true; return lead });
      this.getSelectedContacts();
    } else {
      this.contacts = this.contacts.map(lead => { lead.selected = false; return lead });
      this.getSelectedContacts();
    }
  }
  deleteContact() {
    let cnfrm = confirm("Do you really want to delete the selected leads?");
    if (cnfrm) {
      if (this.selectedContact.length != 0) {
        for (let i of this.selectedContact) {
          this.displayLoader = true;
          this.serv.deleteContact(i['_id']).subscribe((data) => {
            this.showSuccess(data['message']);
            this.selectAllContacts = false;
            this.selectedContact = [];
            this.loadContacts();
          }, (err) => {
            console.log(err);
            this.showDanger(err.error['message']);
            this.loadContacts();
          })
        }
      }
    }
  }
  updateStatus(index, leadId, leadStatus, currentStatus) {
    if (leadStatus !== currentStatus) {
      // this.displayLoader=true;
      let oldStatus = this.contacts[index]['leadStatus'];
      this.contacts[index]['leadStatus'] = leadStatus;
      this.updateLeadStatus = !this.updateLeadStatus;
      this.activeLead = '';
      this.activeLeadStatus = '';
      this.serv.updateLeadStatus({ leadId, leadStatus }).subscribe((data) => {
        this.showSuccess(data['message']);
        // this.loadLeads();
      }, (err) => {
        console.log(err);
        this.showDanger(err.error['message']);
        this.contacts[index]['leadStatus'] = oldStatus;
      })
    } else {
      this.activeLead = '';
      this.activeLeadStatus = '';
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
