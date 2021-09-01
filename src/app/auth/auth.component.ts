import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { User } from './user.model'


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  user = new Subject<User>()
  isLoginMode = true
  isLoading = false
  error:string = null

  constructor(private auth_service:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
 onSwitchMode(){
   this.isLoginMode = !this.isLoginMode
 }
 onSubmit(form:NgForm)
 {
 if(!form.valid){
   return
 }
  const email = form.value.email
  const password = form.value.password
  this.isLoading = true
  let authObs:Observable<AuthResponseData>

  if(this.isLoginMode){

    authObs =  this.auth_service.login(email,password)
  }
  else 
  {
    authObs = this.auth_service.signup(email,password)
  
  }


  authObs.subscribe(resData => {
    console.log(resData)
  this.isLoading = false
  this.router.navigate(['/home'])

  },
  errMessage =>{
    console.log(errMessage)
    this.error = errMessage
    this.isLoading = false

  })
 
  form.reset()
 }


}