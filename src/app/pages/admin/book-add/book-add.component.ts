import { Component } from '@angular/core';
import { BookAdd } from '../../../interface/book';
import { BookService } from '../../../service/book.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-book-add',
  imports: [FormsModule,CommonModule],
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.css'
})
export class BookAddComponent {
 book: BookAdd = {
  // id:'1232',
  title: '',
  price: null,
  published: null,
  imageURL: '',
  genre: ''
 }
 constructor (private bookService:BookService,private router:Router){

 }
  handleSubmit(form:any){
    if(form.invalid){
      return alert("Vui lòng nhập đầy đủ thông tin")
    }
    this.bookService.add(this.book).subscribe({
      next:()=>{
        alert("Thêm sách thành công")
        this.router.navigate(['/admin/book'])
      },
      error: (err) =>{

        console.log(err);
        
        // alert(err)
      }
    })
  }
}
