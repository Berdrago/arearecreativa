import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage  {
  user$: Observable<User> = this.authSvc.afAuth.user;
  constructor(private authSvc: AuthService,
              private router: Router) { }

  async onSendEmail(email , password): Promise<void> {
    try{
      await this.authSvc.sendVerifcationEmail();

    } catch(error){
      console.log(error);
    }
  }
  sendVerifcationEmail(){
    this.router.navigate(['login']);
  }
  ngOnDestro(): void {
  this.authSvc.logout();
  };
}
