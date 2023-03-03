import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: any = {
    email: null,
    password: null,
  };
  isLoggedIn = localStorage.getItem('isLoggedIn');
  constructor(private authservice: AuthService) {}

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn')) {
    }
  }

  async onSubmit() {
    const { email, password } = this.form;
    await this.authservice.login(email, password).then((data: any) => {});
  }
}
