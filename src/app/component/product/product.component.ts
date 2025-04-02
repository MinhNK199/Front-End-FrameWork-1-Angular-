import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
   @Input({required: true}) name!: string;
  @Input({required: true}) age!: number;
  @Input({required: true}) products: any; // lấy từ app

  @Output() deleteId= new EventEmitter();
renderStatus(state: boolean) {
    return state ? 'Còn hàng' : 'Hết hàng';
  }

  handleDelete(id: number) {
    this.deleteId.emit(id);
  }

}
