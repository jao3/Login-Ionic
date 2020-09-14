import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/app/authentication/authentication.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  showPassword = false;
  passwordToggleIcon = "eye";

  constructor(private authServevice: AuthenticationService, 
                  private router: Router, public fb: FormBuilder) {
    this.loginForm = this.fb.group({
      password: new FormControl(null, [Validators.required, Validators.nullValidator ]),
      username: new FormControl(null, [Validators.required, Validators.nullValidator ] )
    })
  }
  

  public togglePassword(){
    this.showPassword = !this.showPassword;

    if(this.passwordToggleIcon == "eye")
    {
      this.passwordToggleIcon = "eye-off"
    }else{
      this.passwordToggleIcon = "eye"
    }
  }

  Login() {
    this.authServevice.login(  this.loginForm.getRawValue() ).subscribe(value => {
      console.log("to aqui")
      this.router.navigate(["tabs"])
      //megaterrarc@gmail.com
      //123
    })  
  }

}
