import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCouponService } from '../../services/admin-coupon.service';

@Component({
  selector: 'app-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.scss']
})
export class CouponFormComponent implements OnInit {
  couponId?: number;
  coupon: any = {
    title: '',
    image: '',
    costInPoints: 0,
    discountBlanco: 0,
    discountSilver: 0,
    discountGold: 0,
    discountPlatinum: 0,
    isHighlighted: false,
    isActive: true,
    productType: '',
    productDescription: '',
    invoiceNumber: '',
    redemptionDate: '',
    imageURL: '' // URL que viene desde el backend para la imagen real
  };

  selectedFile: File | null = null;
  selectedFileName: string = '';
  imagePreview: any = null;

  errorMessage = '';
  successMessage = '';

  @ViewChild('fileInput') fileInput!: ElementRef; // referencia al <input type="file">

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminCouponService: AdminCouponService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.couponId = +params['id'];
        this.loadCoupon(this.couponId);
      }
    });
  }

  loadCoupon(id: number) {
    // Podrías tener un método getCouponById en tu servicio
    this.adminCouponService.getCouponById(id).subscribe({
      next: (found: any) => {
        if (found) {
          this.coupon = { ...found };
          // Convertir la redemptionDate a 'YYYY-MM-DD' si existe
          if (this.coupon.redemptionDate) {
            this.coupon.redemptionDate = new Date(this.coupon.redemptionDate).toISOString().split('T')[0];
          }
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al cargar cupón';
      }
    });
  }

  onSelectImage() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
      // Generar previsualización
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    // Usar FormData si deseas enviar archivo + datos
    const formData = new FormData();

    formData.append('title', this.coupon.title || '');
    formData.append('costInPoints', this.coupon.costInPoints);
    formData.append('discountBlanco', this.coupon.discountBlanco);
    formData.append('discountSilver', this.coupon.discountSilver);
    formData.append('discountGold', this.coupon.discountGold);
    formData.append('discountPlatinum', this.coupon.discountPlatinum);
    formData.append('isHighlighted', this.coupon.isHighlighted);
    formData.append('isActive', this.coupon.isActive);
    formData.append('productType', this.coupon.productType || '');
    formData.append('productDescription', this.coupon.productDescription || '');
    formData.append('invoiceNumber', this.coupon.invoiceNumber || '');
    formData.append('redemptionDate', this.coupon.redemptionDate || '');

    // Si el cupón ya tiene un 'imageURL' (del backend) y no subimos archivo nuevo, 
    // podrías enviarlo también, o no, según tu backend
    if (this.coupon.imageURL) {
      formData.append('imageURL', this.coupon.imageURL);
    }

    // Archivo a subir
    if (this.selectedFile) {
      formData.append('couponImage', this.selectedFile);
    }

    if (this.couponId) {
      // Actualizar
      this.adminCouponService.updateCouponFormData(this.couponId, formData).subscribe({
        next: (res: any) => {
          this.successMessage = res.message;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error al actualizar cupón';
        }
      });
    } else {
      // Crear
      this.adminCouponService.createCouponFormData(formData).subscribe({
        next: (res: any) => {
          this.successMessage = res.message;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error al crear cupón';
        }
      });
    }
  }

  onBack() {
    this.router.navigate(['/admin/coupons']);
  }
}
