import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/auth/services/user.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  userRole: any;
  userFullName: any;
  userPoints: any;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      // Decodificar token o llamar a un endpoint para obtener datos del usuario
      this.userRole = this.authService.getUserRole();
      this.getUserData()

    }
  }

  getUserData() {
    this.userService.getProfile().subscribe({
      next: (res: any) => {
        console.log(res)
        this.userFullName = res.fullName
        this.userPoints =res.points


      },
      error(err: any) {
        console.log(err)
      }
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
