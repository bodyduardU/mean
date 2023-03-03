import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: any = {
    username: null,
    email: null,
    password: null,
  };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe({
      next: (data) => {
        console.log(data);
        if (data.message === 'already exist!!!') {
          alert('Already Exist');
          window.location.reload();
        } else {
          alert('Register Success!!!');
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
      },
    });
  }
}
