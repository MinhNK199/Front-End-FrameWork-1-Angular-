import { Component } from '@angular/core';
import { HeaderComponent } from './component/header/header.component';
import { UserComponent } from './component/user/user.component';
import { TodolistComponent } from "./component/todolist/todolist.component";
import { ProductComponent } from "./component/product/product.component";
import { LifeCycleComponent } from "./component/life-cycle/life-cycle.component";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // // title = 'web2081';
  // isVisible = true
  //  myName= 'minhnkph51915'
  // myAge= 24
  // handleDisplay(){
  //   this.isVisible = !this.isVisible
  // }
  // product = [
  //   {
  //     id: 1,
  //     name: 'Laptop Dell XPS 15',
  //     price: 35000000,
  //     inStock: true,
  //     category: 'LT',
  //     rating: 4.5,
  //   },
  //   {
  //     id: 2,
  //     name: 'iPhone 14 Pro Max',
  //     price: 29000000,
  //     inStock: false,
  //     category: 'MB',
  //     rating: 4.8,
  //   },
  //   {
  //     id: 3,
  //     name: 'Samsung Galaxy S23',
  //     price: 22000000,
  //     inStock: true,
  //     category: 'MB',
  //     rating: 4.6,
  //   },
  //   {
  //     id: 4,
  //     name: 'Tai nghe Sony WH-1000XM4',
  //     inStock: true,
  //     category: 'PK',
  //     rating: 4.7,
  //   },
  //   {
  //     id: 5,
  //     name: 'Bàn phím cơ Keychron K8',
  //     price: 2500000,
  //     inStock: false,
  //     category: 'PK',
  //     rating: 4.3,
  //   },
  // ];

  // receiveId(id: number){
  //   this.product = this.product.filter((item) => item.id != id)
  // }
  
}