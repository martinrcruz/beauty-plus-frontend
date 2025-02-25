import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/modules/auth/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  password: string = '';
  confirmPassword: string = '';

  avatarPreview:any;

  errorMessage = '';
  successMessage = '';

  @ViewChild('fileInput') fileInput!: ElementRef; // para referenciar el input de archivo

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.userService.getProfile().subscribe({
      next: (res: any) => {
        console.log(res)
        // Asigna campos, si no existen => valores vacíos
        this.user = {
          id: res.id,
          fullName: res.fullName,
          email: res.email,
          dni: res.dni || '',
          phone: res.phone || '',
          dateOfBirth: res.dateOfBirth || '',
          address: res.address || '',
          points: res.points,
          level: res.level,
          avatar: res.avatar || '',
          qrCodeImage: res.qrCodeImage || '' 

        };
      },
      error: (err:any) => {
        this.errorMessage = err.error?.message || 'Error al obtener perfil';
      }
    });
  }

  onChangeAvatar() {
    // Dispara el click del input de archivo
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // Vista previa (opcional)
    const reader = new FileReader();
    reader.onload = (e) => {
      this.avatarPreview = e.target?.result;
    };
    reader.readAsDataURL(file);

    // Almacena en user.avatar o en una variable temporal
    // Podrías enviar este file en updateProfile, o hacer un endpoint separate
    this.user.selectedAvatarFile = file; 
  }

  updateProfile() {
    // Validar password
    if (this.password && this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    // Arma el form data para enviar
    const formData = new FormData();
    formData.append('fullName', this.user.fullName || '');
    formData.append('email', this.user.email || '');
    formData.append('dni', this.user.dni || '');
    formData.append('phone', this.user.phone || '');
    formData.append('dateOfBirth', this.user.dateOfBirth || '');
    formData.append('address', this.user.address || '');

    // Si se ingresó password
    if (this.password) {
      formData.append('password', this.password);
    }

    // Si se seleccionó un nuevo avatar
    if (this.user.selectedAvatarFile) {
      formData.append('avatar', this.user.selectedAvatarFile);
    }

    // Llamada al servicio
    this.userService.updateProfile(formData).subscribe({
      next: (res: any) => {
        this.successMessage = 'Perfil actualizado con éxito';
        this.errorMessage = '';
        // Actualiza la vista
        this.getProfile();
        this.password = '';
        this.confirmPassword = '';
        this.avatarPreview = null;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al actualizar perfil';
      }
    });
  }

  onCancel() {
    // Reinicia el form o vuelve a cargar el perfil original
    this.getProfile();
    this.avatarPreview = null;
    this.password = '';
    this.confirmPassword = '';
  }
}
