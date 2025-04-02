import { Component } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { RouterLink } from '@angular/router';
import IProduct from '../../interface/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentPage: number = 1; // Trang hiện tại
  pageSize: number = 6; // Số sản phẩm mỗi trang
  paginatedProducts: IProduct[] = []; // Mảng sản phẩm phân trang

  products: IProduct[] = [];
  totalPages: number = 0; // Tổng số trang

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getList().subscribe({
      next: (data) => {
        console.log(data); // Kiểm tra dữ liệu trả về từ API
        this.products = data.map(product => ({
        ...product,
        rating: product.rating || 0 // Gán giá trị mặc định nếu rating không tồn tại
      }));

        this.totalPages = Math.ceil(this.products.length / this.pageSize);
        this.updatePagination();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Hoàn thành');
      }
    });
  }

  // Hàm phân trang
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, startIndex + this.pageSize);
    console.log(this.paginatedProducts); // Kiểm tra mảng sản phẩm hiện tại
  }

  // Thay đổi trang
  changePage(page: number) {
    this.currentPage = page;
    this.updatePagination(); // Cập nhật sản phẩm hiển thị khi đổi trang
  }

  // Tạo mảng phân trang
  get paginationArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1); // Tạo mảng [1, 2, ..., totalPages]
  }
  getStars(rating: number): string[] {
  const fullStars = Math.floor(rating); // Số lượng sao đầy
  const halfStar = rating % 1 !== 0; // Xác định có sao nửa hay không
  const stars: string[] = Array(fullStars).fill('full'); // Tạo mảng sao đầy đủ
  if (halfStar) stars.push('half'); // Thêm sao nửa nếu có
  while (stars.length < 5) stars.push('empty'); // Đảm bảo đủ 5 sao
  return stars; // Trả về danh sách sao
}


  // Hàm tính trung bình rating (nếu cần)
  getStarRating(rating: number): string[] {
    const fullStars = Math.floor(rating); // Số sao đầy đủ
    const halfStar = rating % 1 !== 0; // Có sao nửa không?
    const stars = Array(fullStars).fill('full'); // Tạo danh sách sao đầy đủ
    if (halfStar) stars.push('half'); // Thêm sao nửa
    while (stars.length < 5) stars.push('empty'); // Thêm sao trống để đủ 5 sao
    return stars;
  }

  // Hàm lấy trạng thái sản phẩm
  getProductStatus(status: boolean): string {
    return status ? 'Còn hàng' : 'Hết hàng';
  }

  // Hàm lấy màu trạng thái
  getStatusClass(status: boolean): string {
    return status ? 'text-green-500' : 'text-gray-500 line-through';
  }

  // Hàm tính logic giá hiển thị
  // getPriceDisplay(product: IProduct): { sale: string; original: string } {
  //   const salePrice = product.sale_price ? `${product.sale_price} VND` : null;
  //   const originalPrice = product.sale_price
  //     ? `<span class="line-through text-gray-500">${product.price} VND</span>`
  //     : `${product.price} VND`;
  //   return { sale: salePrice, original: originalPrice };
  // }
}