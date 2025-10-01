import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsultantService } from '../../services/consultant.service';
import { Consultant } from '../../models/consultant.model';

@Component({
  selector: 'app-consultant-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consultant-form.component.html',
  styleUrls: ['./consultant-form.component.css']
})
export class ConsultantFormComponent implements OnInit {
  consultantForm!: FormGroup;
  submitted = false;
  isEditMode = false;
  consultantId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private consultantService: ConsultantService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.consultantForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)]],
      specialty: ['', [Validators.required]],
      experience: ['', [Validators.required, Validators.min(0), Validators.max(50)]],
      status: ['active', [Validators.required]]
    });

    // Verificar se é modo de edição
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.consultantId = +params['id'];
        this.loadConsultant(this.consultantId);
      }
    });
  }

  loadConsultant(id: number): void {
    const consultant = this.consultantService.getConsultantById(id);
    if (consultant) {
      this.consultantForm.patchValue(consultant);
    } else {
      this.router.navigate(['/consultants']);
    }
  }

  get f() {
    return this.consultantForm.controls;
  }

  formatPhone(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    
    if (value.length >= 11) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 6) {
      value = value.replace(/^(\d{2})(\d{4,5})/, '($1) $2');
    } else if (value.length >= 2) {
      value = value.replace(/^(\d{2})/, '($1) ');
    }
    
    this.consultantForm.patchValue({ phone: value });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.consultantForm.invalid) {
      return;
    }

    if (this.isEditMode && this.consultantId) {
      this.consultantService.updateConsultant(this.consultantId, this.consultantForm.value);
    } else {
      this.consultantService.addConsultant(this.consultantForm.value);
    }

    this.router.navigate(['/consultants']);
  }

  onCancel(): void {
    this.router.navigate(['/consultants']);
  }
}
