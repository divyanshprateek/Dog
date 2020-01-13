import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.authService.register(form.value).subscribe((res: any) => {
      console.log(res);
      if (res.success == false) {
        console.log('Error in login');
      } else {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

}
