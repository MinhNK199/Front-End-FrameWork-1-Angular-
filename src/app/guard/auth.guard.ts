import { inject } from "@angular/core"
import { Router, type CanActivateFn } from "@angular/router"
import { AuthService } from "../service/auth.service"

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.isLoggedIn()) {
    return true
  }

  // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
  router.navigate(["/login"], { queryParams: { returnUrl: state.url } })
  return false
}

