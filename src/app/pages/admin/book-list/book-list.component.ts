import { Component, OnInit } from '@angular/core';
import IBook from '../../../interface/book';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-book-list',
  imports: [RouterLink,CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
books: IBook[]= [];
constructor (private http:HttpClient){

}
 ngOnInit():void{
  this.getBooks();
 }
 getBooks():void{
  this.http.get<IBook[]>('http://localhost:3000/books').subscribe(
    (data) =>{
      this.books = data;
    },
  (error) =>{
    console.error('Thất bại khi lấy dữ liệu sách',error);
  }
  )
 }
 deleteBook(id:string) :void{
  if(confirm("Bạn có chắc muốn xóa không???")){
    alert("Xóa thành công");
    this.http.delete(` http://localhost:3000/books/${id}`).subscribe(() => {
      this.books = this.books.filter((book) => book.id !== id);
    })
  }
 }



}
