import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ServicerequestComponent } from '../servicerequest/servicerequest.component';
import { ToasterserviceService } from '../toasterservice.service';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  faPencilAlt = faPencilAlt;
  faCheck = faCheck;
  faTimes = faTimes;
  active = 'employees';
  users = {
    'allusers': [],
    'employees': [],
    'managers': [],
    'admins': [],
  };
  changeAccessRights = true;
  indexOfSelectedManager = 0;
  displayLoader = true;
  selectedLead = [];
  selectAllLeads = false;
  editUserType = false;
  activeUserType = '';
  activeUser = '';
  activeUserForAccessRights = '';

  constructor(
    private fb: FormBuilder,
    private serv: ServicesService,
    private toastService: ToasterserviceService,
    private router: Router
  ) {
    this.loadUsers();
  }

  ngOnInit(): void {
  }

  loadUsers() {
    this.serv.getAllUsers().subscribe((data) => {
      this.users.allusers = data['users'].reverse().map(lead => { lead.selected = false; return lead });
      this.users.employees = data['users'].reverse().filter(lead => {
        if (lead.userType === 'employee') {
          lead.selected = false;
          return lead;
        }
      });
      // console.log(this.users.employees)
      this.users.managers = data['users'].reverse().filter(lead => {
        if (lead.userType === 'manager') {
          lead.teamRevenue = 0;
          lead.team = data['users'].filter(user => {
            if (user.manager === lead.email) {
              lead.teamRevenue += user.totalRevenue;
              return user;
            }
          });
          lead.selected = false;
          return lead
        }
      });
      this.users.admins = data['users'].reverse().filter(lead => {
        if (lead.userType === 'admin') {
          lead.selected = false;
          return lead;
        }
      });
      this.users.employees.sort((a, b) => {
        if (a['firstName'] > b['firstName']) {
          return -1;
        }
        if (a['firstName'] < b['firstName']) {
          return -1;
        }
        return 0;
      });
      this.users.managers.sort((a, b) => a['firstName'] - b['firstName']);
      this.users.admins.sort((a, b) => a['firstName'] - b['firstName']);
      this.displayLoader = false;
      // console.log(this.leads);
    }, (err) => {
      this.displayLoader = false;
      console.log(err);
    });
  }
  getSelectedUsers() {
    this.selectedLead = this.users[this.active].filter(item => {
      // console.log(item);
      if (item.selected) {
        if (item.isRootUser) {
          item.selected = false;
          alert("root user cannot be deleted");
        } else {
          return item['_id'];
        }
      }
    });
    // console.log(this.selectedLead);
  }
  selectAll() {
    if (this.selectAllLeads) {
      this.users[this.active] = this.users[this.active].map(lead => { lead.selected = true; return lead });
      this.getSelectedUsers();
    } else {
      this.users[this.active] = this.users[this.active].map(lead => { lead.selected = false; return lead });
      this.getSelectedUsers();
    }
  }
  deleteLead() {
    let cnfrm = confirm("Do you really want to delete the selected Users?");
    if (cnfrm) {
      let cnfrm2 = confirm("The action cannot be undone, Do you want to continue?");
      if (cnfrm2) {
        if (this.selectedLead.length != 0) {
          for (let i of this.selectedLead) {
            this.displayLoader = true;
            this.serv.deleteUser(i['_id']).subscribe((data) => {
              this.showSuccess(data['message']);
              this.selectAllLeads = false;
              this.selectedLead = [];
              this.loadUsers();
            }, (err) => {
              console.log(err);
              this.showDanger(err.error['message']);
            })
          }
        }
      }
    }
  }
  updateUpdateAccess(userId, accessRights) {
    let details = {
      userId,
      accessRights
    }
    //  console.log(details)
    this.activeUser = '';
    this.serv.updateAccesRights(details).subscribe((data) => {
      this.showSuccess(data['message']);
      // this.displayLoader=true;
      this.loadUsers();
    }, (err) => {
      console.log(err);
      this.showDanger(err.error['message']);
    })
  }
  changeAccess(id, oldAccessRights, newAccess) {
    let index = oldAccessRights.indexOf(newAccess);
    if (index > -1) {
      oldAccessRights.splice(index, 1);
    } else {
      oldAccessRights.push(newAccess);
    }
    // console.log(oldAccessRights)
  }
  updateUserType(index, userId, userType, currentType, activeTab) {
    let oldType = currentType;
    if (userType !== currentType) {
      // this.displayLoader=true;
      console.log(this.users[activeTab][index])
      this.users[activeTab][index]['userType'] = userType;
      this.editUserType = !this.editUserType;
      this.activeUserForAccessRights = '';
      this.activeUserType = '';
      this.serv.updateUserType({ userId, userType }).subscribe((data) => {
        this.showSuccess(data['message']);
        this.loadUsers();
      }, (err) => {
        console.log(err);
        this.showDanger(err.error['message']);
        this.users[activeTab][index]['userType'] = oldType;
        // this.leads[index]['leadStatus']=oldStatus;
      })
    } else {
      this.activeUserForAccessRights = '';
      this.activeUserType = '';
      this.editUserType = !this.editUserType;
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
