import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  imports: [CommonModule,FormsModule]
  
})
export class ProductDetailComponent implements OnInit {
  id: string | null = null;
  product: any = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.id) {
      this.getProductDetails(this.id);
    }
  }

  getProductDetails(id: string): void {
    this.productService.getById(id).subscribe({
      next: (data) => {
        this.product = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Complete');
      }
    });
  }

  changeMainImage(imageUrl: string): void {
    if (this.product) {
      this.product.imageUrl = imageUrl;
    }
  }

  addToCart(product: any, quantity: number): void {
    console.log('Added to cart:', product, quantity);
  }

  addToWishlist(product: any): void {
    console.log('Added to wishlist:', product);
  }
}