import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import IBook, { BookAdd, BookEdit } from '../interface/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  url = 'http://localhost:3000/books'
  constructor(private http:HttpClient) {
    
   }
    getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${this.url}/books`)
  }
   getList(): Observable<IBook[]>{
   return this.http.get<IBook[]>(this.url)
  };
    getById(id:string): Observable<IBook>{
   return this.http.get<IBook>(`${this.url}/${id}`);
  };
    add(data:BookAdd): Observable<IBook>{
   return this.http.post<IBook>(this.url,data);
  };
    edit(id:string, data:Partial<BookEdit>): Observable<BookEdit>{
   return this.http.put<IBook>(`${this.url}/${id}`,data);
  };
}
