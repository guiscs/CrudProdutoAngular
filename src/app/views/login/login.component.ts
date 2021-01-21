import { Router } from '@angular/router';
import { LoginService } from './../../components/login/login.service';
import { Login } from './../../components/login/login.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Login = {
    userName: '',
    password: ''
  }

  constructor(private loginService : LoginService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.loginService.Login(this.user).subscribe(obj => {
      if(obj.success){
        this.goToProducts();
      }else{
        this.loginService.showMessage(obj.error, true)
      }
    })
  };

  private goToProducts(): void {
    this.router.navigate(['/products'])
  }

}
