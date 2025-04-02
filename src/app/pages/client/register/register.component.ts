import { Component, type OnInit } from "@angular/core"
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { Router, RouterLink } from "@angular/router"
import { AuthService } from "../../../service/auth.service"

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl("", [Validators.required]),
    fullName: new FormControl(""),
  })

  submitted = false
  isSubmitting = false
  errorMessage = ""

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Kiểm tra xác nhận mật khẩu
    this.registerForm.get("confirmPassword")?.valueChanges.subscribe(() => {
      this.validateConfirmPassword()
    })

    this.registerForm.get("password")?.valueChanges.subscribe(() => {
      this.validateConfirmPassword()
    })
  }

  // Getter để dễ dàng truy cập các trường form
  get f() {
    return this.registerForm.controls
  }

  // Xác thực mật khẩu xác nhận
  validateConfirmPassword(): void {
    const confirmPasswordControl = this.registerForm.get("confirmPassword")
    const passwordControl = this.registerForm.get("password")

    if (confirmPasswordControl?.value === passwordControl?.value) {
      confirmPasswordControl?.setErrors(null)
    } else {
      confirmPasswordControl?.setErrors({ mismatch: true })
    }
  }

  handleSubmit(): void {
    this.submitted = true
    this.errorMessage = ""

    // Dừng nếu form không hợp lệ
    if (this.registerForm.invalid) {
      return
    }

    this.isSubmitting = true

    const registerData = {
      username: this.registerForm.get("username")?.value || "",
      email: this.registerForm.get("email")?.value || "",
      password: this.registerForm.get("password")?.value || "",
      fullName: this.registerForm.get("fullName")?.value || "",
    }

    this.authService.register(registerData).subscribe({
      next: () => {
        this.router.navigate(["/admin/book"])
      },
      error: (err) => {
        this.isSubmitting = false
        this.errorMessage = err.error?.message || "Đăng ký thất bại. Vui lòng thử lại."
      },
      complete: () => {
        this.isSubmitting = false
      },
    })
  }
}

