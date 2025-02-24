import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/auth/services/user.service';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent {
  userPoints: number = 0;
  userLevel: string = 'Blanco'; // 'Blanco', 'Silver', 'Gold', 'Platinum'
  dateOfCheck: string = '';  // Fecha en la que se hace la consulta
  nextLevelNeeded: number = 0; // Puntos necesarios para el siguiente nivel
  nextLevelName: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // 1) Llamamos a un método para cargar los datos reales
    this.loadUserData();
    
    // 2) Definimos la fecha de la consulta
    // (puedes formatearla con pipe date en el template también)
    const today = new Date();
    this.dateOfCheck = today.toLocaleDateString(); // Ej: "17/01/2025"
  }

  loadUserData(): void {
    this.userService.getProfile().subscribe({
      next: (res: any) => {
        console.log(res)
        this.userLevel = res.level
        this.userPoints =res.points


      },
      error(err: any) {
        console.log(err)
      }
    })

    // Calculamos cuántos puntos faltan para el siguiente nivel
    this.computeNextLevelNeeded();
  }

  // Calcula cuántos puntos faltan para el siguiente nivel
  computeNextLevelNeeded(): void {
    // Lógica de niveles: 
    //  Blanco: 0–999
    //  Silver: 1000–1999
    //  Gold: 2000–3999
    //  Platinum: 4000+
    // Ajusta según la definición que uses en tu proyecto
    
    switch (this.userLevel) {
      case 'Blanco':
        this.nextLevelName = 'Silver';
        this.nextLevelNeeded = 1000 - this.userPoints;
        break;
      case 'Silver':
        this.nextLevelName = 'Gold';
        this.nextLevelNeeded = 2000 - this.userPoints;
        break;
      case 'Gold':
        this.nextLevelName = 'Platinum';
        this.nextLevelNeeded = 4000 - this.userPoints;
        break;
      case 'Platinum':
        this.nextLevelName = 'Platinum';
        this.nextLevelNeeded = 0; 
        break;
      default:
        // Si no matchea, asumimos Blanco
        this.userLevel = 'Blanco';
        this.nextLevelName = 'Silver';
        this.nextLevelNeeded = 1000 - this.userPoints;
        break;
    }

    // Asegura que no aparezca un valor negativo si supera Platinum
    if (this.nextLevelNeeded < 0) {
      this.nextLevelNeeded = 0;
    }
  }

  goToCoupons(): void {
    this.router.navigate(['/cliente/coupons']);
  }
}
