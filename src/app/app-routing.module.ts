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


const routes: Routes = [{
  path: "",
  component: LoginComponent
},{
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
  children:[{
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
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
