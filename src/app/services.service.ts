import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  userType = "";
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  login(credentials) {
    return this.http.post("http://localhost:3000/login", credentials);
  }

  register(register_details) {
    return this.http.post("http://localhost:3000/register", register_details);
  }

  verifyAccount(verify_details) {
    return this.http.post("http://localhost:3000/accountverification", verify_details);
  }

  resetPassword(reset_details) {
    return this.http.post("http://localhost:3000/resetpassword", reset_details);
  }

  forgetPassword(email_details) {
    return this.http.post("http://localhost:3000/forget", email_details);
  }

  createLead(lead_details) {
    return this.http.post("http://localhost:3000/creatingLead", lead_details, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  getAllLeads() {
    return this.http.get(`https://localhost:3000/listofLeads`, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  deleteLead(id) {
    return this.http.delete(`https://localhost:3000/deletingLead/${id}`, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  updateLeadStatus(details) {
    return this.http.put(`https://localhost:3000/updatingleadstatus`, details, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  updateLead(lead_details) {
    return this.http.put("https://localhost:3000/updatingLead", lead_details, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  getLeadById(lead_id) {
    return this.http.get(`https://localhost:3000/listofLeads/${lead_id}`, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  confirmLead(lead_details) {
    return this.http.put(`https://localhost:3000/leadconfirmed`, lead_details, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  getAllUsers() {
    return this.http.get("http://localhost:3000/getusers", {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  getAllContacts() {
    return this.http.get(`http://localhost:3000/listofContacts`, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  getContactById(id) {
    return this.http.get(`http://localhost:3000/listofContacts/${id}`, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  createContact(details) {
    return this.http.post(`http://localhost:3000/creatingContact`, details, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  updateContact(details) {
    return this.http.put(`http://localhost:3000/updatingCcontact`, details, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  deleteContact(id) {
    return this.http.delete(`http://localhost:3000/deletingCcontact/${id}`, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  getAllEmployees() {
    return this.http.get(`http://localhost:3000/getusers/employees`, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  getAllManagers() {
    return this.http.get(`http://localhost:3000/getusers/managers`, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  addUser(details) {
    return this.http.post(`http://localhost:3000/register/adduser`, details, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      })
    });
  }

  updateAccesRights(details) {
    return this.http.put(`http://localhost:3000/updateaccessrights`, details, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  updateUserType(details) {
    return this.http.put(`http://localhost:3000/updateusertype`, details, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  updateProfile(details) {
    return this.http.put(`http://localhost:3000/updateprofile`, details, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  deleteUser(id) {
    return this.http.delete(`http://localhost:3000/deletingUser/${id}`, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  changePassword(details) {
    details.email = this.getEmail();
    return this.http.post(`http://localhost:3000/changepassword`, details, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      })
    });
  }

  confirmOrder(details){
    return this.http.post(`http://localhost:3000/orderconfirmed`,details,{
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  cancelOrder(details){
    return this.http.post(`http://localhost:3000/ordercancelled`,details,{
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  managerConfirmed(details){
    return this.http.post(`http://localhost:3000/managerconfirmed`,details,{
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  managerCancelled(details){
    return this.http.post(`http://localhost:3000/managercancelled`,details,{
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }
  setToken(token) {
    localStorage.setItem("token", window.btoa(token));
  }

  getToken() {
    return window.atob(localStorage.getItem('token'))
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  setEmail(email) {
    localStorage.setItem("email", window.btoa(email));
  }

  getEmail() {
    return window.atob(localStorage.getItem('email'))
  }

  removeEmail() {
    localStorage.removeItem('email');
  }

  setUserData(details) {
    details = JSON.stringify(details);
    localStorage.setItem('userData', window.btoa(details));
  }

  getUserData() {
    return JSON.parse(window.atob(localStorage.getItem('userData')));
  }

  removeUserDetails() {
    localStorage.removeItem('userData');
  }

  signOut() {
    this.removeToken();
    this.removeEmail();
    this.removeUserDetails();
    this.router.navigate(['/']);
  }

}
