import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  users = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      age: 25,
      gender: true,
      isActive: true,
      role: 'admin',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
      age: 30,
      gender: false,
      isActive: false,
      role: 'admin',
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@example.com',
      age: 22,
      gender: true,
      isActive: true,
      role: 'member',
    },
  ];
}
