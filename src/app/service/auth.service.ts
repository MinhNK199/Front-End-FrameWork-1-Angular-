import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable, tap } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router"

// Định nghĩa các interface
export interface User {
  id?: string
  username: string
  email: string
  password?: string
  fullName?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  fullName?: string
}

export interface AuthResponse {
  user: User
  token: string
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:3000"
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  public currentUser = this.currentUserSubject.asObservable()

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // Kiểm tra nếu đã có token trong localStorage
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser))
    }
  }

  // Getter để lấy thông tin người dùng hiện tại
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value
  }

  // Đăng ký người dùng mới
  register(registerData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, registerData).pipe(
      tap((response) => {
        // Lưu thông tin người dùng và token vào localStorage
        localStorage.setItem("currentUser", JSON.stringify(response.user))
        localStorage.setItem("token", response.token)
        this.currentUserSubject.next(response.user)

        // Điều hướng đến trang admin sau khi đăng ký thành công
        this.router.navigate(["/admin/book"])
      }),
    )
  }

  // Đăng nhập
  login(loginData: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginData).pipe(
      tap((response) => {
        // Lưu thông tin người dùng và token vào localStorage
        localStorage.setItem("currentUser", JSON.stringify(response.user))
        localStorage.setItem("token", response.token)
        this.currentUserSubject.next(response.user)

        // Điều hướng đến trang admin sau khi đăng nhập thành công
        this.router.navigate(["/admin/book"])
      }),
    )
  }

  // Đăng xuất
  logout(): void {
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem("currentUser")
    localStorage.removeItem("token")
    this.currentUserSubject.next(null)

    // Điều hướng đến trang đăng nhập sau khi đăng xuất
    this.router.navigate(["/login"])
  }

  // Kiểm tra xem người dùng đã đăng nhập chưa
  isLoggedIn(): boolean {
    return !!this.currentUserValue
  }

  // Lấy token xác thực
  getToken(): string | null {
    return localStorage.getItem("token")
  }
}

