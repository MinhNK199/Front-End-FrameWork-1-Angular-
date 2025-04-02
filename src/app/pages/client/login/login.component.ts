import { Component } from "@angular/core"
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { AuthService } from "../../../service/auth.service"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    rememberMe: new FormControl(false),
  })

  submitted = false
  isSubmitting = false
  errorMessage = ""

  constructor(private authService: AuthService) {}

  // Getter để dễ dàng truy cập các trường form
  get f() {
    return this.loginForm.controls
  }

  handleSubmit(): void {
    this.submitted = true
    this.errorMessage = ""

    // Dừng nếu form không hợp lệ
    if (this.loginForm.invalid) {
      return
    }

    this.isSubmitting = true

    const loginData = {
      email: this.loginForm.get("email")?.value || "",
      password: this.loginForm.get("password")?.value || "",
    }

    this.authService.login(loginData).subscribe({
      next: () => {
        // Điều hướng đã được xử lý trong AuthService
      },
      error: (err) => {
        this.isSubmitting = false
        this.errorMessage = err.error?.message || "Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu."
      },
      complete: () => {
        this.isSubmitting = false
      },
    })
  }
}

