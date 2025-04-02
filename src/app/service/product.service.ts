import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import IProduct, { ProductAdd, ProductEdit } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  // Lấy danh sách sản phẩm
  getList(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url);
  }

  // Lấy sản phẩm theo id
  getById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }

  // Thêm sản phẩm mới
  add(data: ProductAdd): Observable<IProduct> {
    return this.http.post<IProduct>(this.url, data);
  }

  // Chỉnh sửa sản phẩm
edit(id: string, data: Partial<ProductEdit>): Observable<ProductEdit> {
  return this.http.put<ProductEdit>(`${this.url}/${id}`, data);
}
}