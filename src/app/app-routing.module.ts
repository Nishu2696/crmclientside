import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetComponent } from './forget/forget.component';
import { RegisterComponent } from './register/register.component';
import { AccountverifyComponent } from './accountverify/accountverify.component';
import { ResetComponent } from './reset/reset.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrmhomeComponent } from './crmhome/crmhome.component';
import { LeadsComponent } from './leads/leads.component';
import { AddleadComponent } from './addlead/addlead.component';
import { UpdateleadComponent } from './updatelead/updatelead.component';
import { AuthGuard } from './auth.guard';
import { LoginGuardGuard } from './login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AddcontactsComponent } from './addcontacts/addcontacts.component';
import { UpdatecontactsComponent } from './updatecontacts/updatecontacts.component';
import { UsersComponent } from './users/users.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { AddusersComponent } from './addusers/addusers.component';
import { UserGuardGuard } from './user-guard.guard';
import { ConfirmorderComponent } from './confirmorder/confirmorder.component';
import { ManagerComponent } from './manager/manager.component';
import { ServicerequestComponent } from './servicerequest/servicerequest.component';


const routes: Routes = [{
  path: "",
  component: LoginComponent,
  canActivate: [LoginGuardGuard]
}, {
  path: "forget",
  component: ForgetComponent
}, {
  path: "register",
  component: RegisterComponent
}, {
  path: "accountverify/:token/:email",
  component: AccountverifyComponent
}, {
  path: "reset/:token/:email",
  component: ResetComponent
}, {
  path: "dashboard",
  component: DashboardComponent,
  canActivate: [AuthGuard],
  children: [{
    path: "",
    component: CrmhomeComponent
  }, {
    path: "leads",
    component: LeadsComponent
  }, {
    path: "addlead",
    component: AddleadComponent
  }, {
    path: "updatelead/:id",
    component: UpdateleadComponent
  }, {
    path: "profile",
    component: ProfileComponent
  }, {
    path: "contacts",
    component: ContactsComponent
  }, {
    path: "addcontacts",
    component: AddcontactsComponent
  }, {
    path: "updatecontact/:id",
    component: UpdatecontactsComponent
  }, {
    path: "users",
    component: UserhomeComponent,
    children: [{
      path: "",
      component: UsersComponent
    }, {
      path: "addusers",
      component: AddusersComponent
    }],
    canActivate: [UserGuardGuard]
  }, {
    path: "servicerequest",
    component: ServicerequestComponent
  }]
}, {
  path: "confirmorder/:company/:id",
  component: ConfirmorderComponent
}, {
  path: "verifyorder/:company/:id",
  component: ManagerComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
