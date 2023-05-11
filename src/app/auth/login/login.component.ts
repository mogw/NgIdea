import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

  login() {
    this.isLoading = true

    this.authService.login(this.username, this.password).subscribe(data => {
      const { result: { token, profile: { id } } } = data as any

      this.authService.setToken(token, id)
      this.isLoading = false
      this.router.navigate(['/ideas'])
    }, error => {
      this.errorMsg = error.error.description
    })
  }
}
