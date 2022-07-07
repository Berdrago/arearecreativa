import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage  {

  constructor(private authSvc: AuthService,
              private router: Router) { }
  async onRegister(email, password ){
    try{
      const user = await this.authSvc.register(email.value, password.value);
      if(user){
        console.log( user);
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
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
