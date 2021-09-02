import { Component,OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'angular-auth';
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private auth_service:AuthService){}

  ngOnInit(): void {
    this.userSub = this.auth_service.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true
      console.log(!user);
      console.log(!!user);
    });
  
}

ngOnDestroy() {
  this.userSub.unsubscribe();
}


}
