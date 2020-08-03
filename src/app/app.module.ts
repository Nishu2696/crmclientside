import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgetComponent } from './forget/forget.component';
import { ResetComponent } from './reset/reset.component';
import { AccountverifyComponent } from './accountverify/accountverify.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeadsComponent } from './leads/leads.component';
import { AddleadComponent } from './addlead/addlead.component';
import { UpdateleadComponent } from './updatelead/updatelead.component';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { ToastsComponent } from './toasts/toasts.component';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthGuard } from "./auth.guard";
import { ContactsComponent } from './contacts/contacts.component';
import { AddcontactsComponent } from './addcontacts/addcontacts.component';
import { UpdatecontactsComponent } from './updatecontacts/updatecontacts.component';
import { AddusersComponent } from './addusers/addusers.component';
import { UsersComponent } from './users/users.component';
import { HomeusersComponent } from './homeusers/homeusers.component';
import { ConfirmorderComponent } from './confirmorder/confirmorder.component';
import { ManagerComponent } from './manager/manager.component';
import { ProfileComponent } from './profile/profile.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { ServicerequestComponent } from './servicerequest/servicerequest.component';
import { AddservicerequestComponent } from './addservicerequest/addservicerequest.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgetComponent,
    ResetComponent,
    AccountverifyComponent,
    DashboardComponent,
    LeadsComponent,
    AddleadComponent,
    UpdateleadComponent,
    ToastsComponent,
    ContactsComponent,
    AddcontactsComponent,
    UpdatecontactsComponent,
    AddusersComponent,
    UsersComponent,
    HomeusersComponent,
    ConfirmorderComponent,
    ManagerComponent,
    ProfileComponent,
    UserhomeComponent,
    ServicerequestComponent,
    AddservicerequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [AuthGuard,{provide: LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
