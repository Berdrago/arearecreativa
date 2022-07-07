import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
  img='/assets/SedePN.jpg'
  constructor(private authSvc: AuthService,
              private router: Router ) { }
  async onLogin(email, password ){
    try{
      const user = await this.authSvc.login(email.value, password.value);
      if(user){
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
        console.log(isVerified);
        console.log(user);
      }
    }
    catch(error){
      console.log(error);
    }
  };
  async onLoginGoogle(){
    try{
      const user = await this.authSvc.loginGoogle();
      if(user){
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
        console.log(isVerified);
        console.log(user);
      }
    }
    catch(error){
      console.log(error);
    }
  };
  private redirectUser(isVerified: boolean){
    if(isVerified){
      this.router.navigate(['user']);
    }else{
      this.router.navigate(['verify-email']);
    }
  };

}
