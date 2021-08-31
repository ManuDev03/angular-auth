import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface AuthResponseData{
  idToken : string
  email : string
  refreshToken: string
  expiresIn : string
  localId : string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { }

  signup(email:string, password:string){
    this._http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4cEzpl-HnmLiJgAy8pAVxw869vWBWl7E",{
      email : email,
      password : password,
      returnSecureToken : true
    })
  }
}
