import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router"
import { AuthService } from "../../service/auth.service"

@Component({
  selector: "app-admin",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: "./admin.component.html",
  styleUrl: "./admin.component.css",
})
export class AdminComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout()
  }
}

