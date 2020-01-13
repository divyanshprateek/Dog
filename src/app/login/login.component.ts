import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.authService.login(form.value).subscribe((res: any) => {
      if (res.success == false) {
        console.log('Error in login');
      } else {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  onRegister() {
    this.router.navigateByUrl('/register');
  }
}
