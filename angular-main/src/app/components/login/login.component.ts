import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  errorMessage = '';
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Se já estiver logado, redirecionar
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/consultants']);
      return;
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Pegar URL de retorno
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/consultants';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    const success = this.authService.login(email, password);

    if (success) {
      this.router.navigate([this.returnUrl]);
    } else {
      this.errorMessage = 'Email ou senha inválidos';
    }
  }

  fillAdmin(): void {
    this.loginForm.patchValue({
      email: 'admin@empresa.com',
      password: 'admin123'
    });
  }

  fillUser(): void {
    this.loginForm.patchValue({
      email: 'user@empresa.com',
      password: 'user123'
    });
  }
}
