import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductEdit } from '../../../interface/product';

@Component({
  selector: 'app-product-edit',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: ProductEdit = {
    name: '',
    price: null,
    category: '',
    image: '',
    status: null
  };

  // Mảng danh mục (thay thế việc truy vấn từ DB)
  categories: string[] = [
    'Laptop',
    'Điện thoại',
    'Âm thanh',
    'Đồng hồ thông minh',
    'Phụ kiện',
    'Màn hình',
    'Máy tính bảng',
    'Máy ảnh',
    'Gaming',
    'Thiết bị bay'
  ];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getById(id).subscribe({
        next: (data) => {
          this.product = data as ProductEdit;
        },
        error: (err) => {
          alert('Không thể tải thông tin sản phẩm!');
          console.error(err);
        }
      });
    }
  }

  handleSubmit(form: any): void {
    if (form.invalid) {
      return alert('Vui lòng nhập đầy đủ thông tin!');
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.edit(id, this.product).subscribe({
        next: () => {
          alert('Cập nhật thành công!');
          this.router.navigate(['/admin/product']);
        },
        error: (err) => {
          alert('Cập nhật thất bại!');
          console.error(err);
        }
      });
    }
  }
}