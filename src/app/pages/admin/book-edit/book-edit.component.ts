import { Component, OnInit } from '@angular/core';
import { BookEdit } from '../../../interface/book'; // Sử dụng BookEdit thay vì BookAdd
import { BookService } from '../../../service/book.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent implements OnInit {
  book: BookEdit = {
    title: '',
    price: null,
    published: null,
    imageURL: '',
    genre: ''
  };
  private bookId: string | null = null; // Lưu trữ ID từ route

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Lấy ID từ route parameters
    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.bookService.getById(this.bookId).subscribe({
        next: (data) => {
          this.book = data; // Gán dữ liệu sách từ API vào biến book
        },
        error: (err) => {
          console.log(err);
          alert('Không tìm thấy sách');
          this.router.navigate(['/admin/book']);
        }
      });
    } else {
      alert('ID sách không hợp lệ');
      this.router.navigate(['/admin/book']);
    }
  }

  handleSubmit(form: any) {
    if (form.invalid) {
      return alert('Vui lòng nhập đầy đủ thông tin');
    }
    if (!this.bookId) {
      return alert('ID sách không hợp lệ');
    }

    this.bookService.edit(this.bookId, this.book).subscribe({
      next: () => {
        alert('Cập nhật sách thành công');
        this.router.navigate(['/admin/book']);
      },
      error: (err) => {
        console.log(err);
        alert('Có lỗi xảy ra khi cập nhật sách');
      }
    });
  }
}