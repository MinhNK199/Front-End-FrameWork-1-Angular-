import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from 'express';
import IProduct from '../../../interface/product';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = []; // Danh sách sản phẩm, mặc định là mảng rỗng

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProducts(); // Gọi hàm để lấy dữ liệu khi component được tải
  }

  getProducts(): void {
    this.http.get<IProduct[]>('http://localhost:3000/products').subscribe(
      (data) => {

        this.products = data; // Gán dữ liệu lấy được vào mảng products
      },
      (error) => {
        console.error('Không thể lấy dữ liệu:', error);
      },
      

    );
  }

  deleteProduct(id: string): void {
    if(confirm("Bạn có chắc muốn xóa???")){
      alert("Xóa thành công");
this.http.delete(`http://localhost:3000/products/${id}`).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id); // Cập nhật danh sách sau khi xóa
    });
    }

  }
}

