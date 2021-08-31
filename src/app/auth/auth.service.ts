import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

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

  signup(email:string, password:string):Observable<any>{
    return this._http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4cEzpl-HnmLiJgAy8pAVxw869vWBWl7E",{
      email : email,
      password : password,
      returnSecureToken : true
    }).pipe(catchError(errRes =>{
      let errMessage = 'An unknown error occurred!'
      if(!errRes.error || !errRes.error.error){
        return throwError(errMessage)
      }
      switch(errRes.error.error.message){
        case 'EMAIL_EXISTS':
          errMessage = 'This email already exists'

      }
      return throwError(errMessage)

    }))
  }
}