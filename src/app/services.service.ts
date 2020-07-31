import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  userType = "";
  constructor(
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

  getAllUsers() {
    return this.http.get("http://localhost:3000/getusers", {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  getAllLeads(){
    return this.http.get(`https://localhost:3000/listofLeads`,{
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  deleteLead(id){
    return this.http.delete(`https://localhost:3000/deletingLead/${id}`,{
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  updateLeadStatus(details){
    return this.http.put(`https://localhost:3000/updatingleadstatus`,details,{
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  updateLead(lead_details){
    return this.http.put("https://localhost:3000/updatingLead", lead_details, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  getLeadById(lead_id){
    return this.http.get(`https://localhost:3000/listofLeads/${lead_id}`, {
      headers: new HttpHeaders({
        authorization: this.getToken(),
      }),
    });
  }

  setToken(token) {
    localStorage.setItem("token", token);
  }

  setEmail(email) {
    localStorage.setItem("email", email);
  }

  getEmail(){
    return localStorage.getItem('email')
  }
  removeEmail(){
    localStorage.removeItem('email');
  }

  removeToken(){
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem("token");
  }
  
}
