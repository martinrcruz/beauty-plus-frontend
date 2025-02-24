import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../../services/admin-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  errorMessage = '';
  showModal = false;
  selectedUser: any = {}; // Datos del usuario que se creará / editará

  constructor(private adminUserService: AdminUserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminUserService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al obtener usuarios';
      }
    });
  }

  onCreateUser() {
    // Inicializamos selectedUser con valores por defecto
    this.selectedUser = {
      fullName: '',
      email: '',
      role: 'client',
      points: 0,
      dni: '',
      phone: '',
      dateOfBirth: '',  // Podrías guardar en formato 'YYYY-MM-DD'
      address: ''
    };
    this.showModal = true;
  }

  onEditUser(u: any) {
    // Clonar datos para no afectar directamente la tabla
    // e incluir todos los campos a editar
    this.selectedUser = {
      id: u.id,
      fullName: u.fullName,
      email: u.email,
      role: u.role,
      points: u.points || 0,
      dni: u.dni || '',
      phone: u.phone || '',
      // Si en la BD guardaste dateOfBirth como 'YYYY-MM-DD', se asigna directo
      // Si no, podrías parsear al form 'YYYY-MM-DD' para que el <input type="date"> funcione
      dateOfBirth: u.dateOfBirth || '',
      address: u.address || ''
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmitUser() {
    if (this.selectedUser.id) {
      // Editar usuario
      this.adminUserService.updateUser(this.selectedUser.id, {
        fullName: this.selectedUser.fullName,
        email: this.selectedUser.email,
        role: this.selectedUser.role,
        points: this.selectedUser.points,
        dni: this.selectedUser.dni,
        phone: this.selectedUser.phone,
        dateOfBirth: this.selectedUser.dateOfBirth,
        address: this.selectedUser.address
      }).subscribe({
        next: () => {
          this.closeModal();
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado',
            showConfirmButton: false,
            timer: 1500
          })
          this.loadUsers();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar usuario',
            showConfirmButton: false,
            timer: 1500
          })
        }
      });
    } else {
      // Crear usuario
      this.adminUserService.createUser({
        fullName: this.selectedUser.fullName,
        email: this.selectedUser.email,
        role: this.selectedUser.role,
        points: this.selectedUser.points,
        dni: this.selectedUser.dni,
        phone: this.selectedUser.phone,
        dateOfBirth: this.selectedUser.dateOfBirth,
        address: this.selectedUser.address
      }).subscribe({
        next: () => {
          this.closeModal();
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado',
            showConfirmButton: false,
            timer: 1500
          })
          this.loadUsers();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al crear usuario',
            showConfirmButton: false,
            timer: 1500
          })
        }
      });
    }
  }

  onResetPoints(userId: number) {
    const data = { points: 0 };
    this.adminUserService.updateUser(userId, data).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (err) => {
        alert(err.error?.message || 'Error al resetear puntos');
      }
    });
  }
}
