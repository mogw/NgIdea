import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username: string
  password: string
  isLoading: boolean
  errorMsg: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signup() {
    this.isLoading = true

    this.authService.signup(this.username, this.password).subscribe(data => {
      const { result: { token } } = data as any

      this.authService.setToken(token)
      this.isLoading = false
      this.router.navigate(['/ideas'])
    }, error => {
      this.errorMsg = error.error.description
    })
  }
}
