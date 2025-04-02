import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { AuthService } from "../../service/auth.service"


@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-900">Quản lý sách</h1>
        
        <div class="flex items-center space-x-4">
          <ng-container *ngIf="authService.currentUserValue; else loginButtons">
            <span class="text-sm text-gray-700">Xin chào, {{ authService.currentUserValue.username }}</span>
            <button 
              (click)="logout()" 
              class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Đăng xuất
            </button>
          </ng-container>
          
          <ng-template #loginButtons>
            <a [routerLink]="'/login'" class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Đăng nhập</a>
            <a [routerLink]="'/register'" class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Đăng ký</a>
          </ng-template>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout()
    // Không cần điều hướng ở đây vì đã được xử lý trong AuthService
  }
}

