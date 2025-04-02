import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../../../service/book.service';
import { BookEdit } from '../../../interface/book';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent implements OnInit {
  bookForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    published: new FormControl<boolean | null>(null, [Validators.required]),
    imageURL: new FormControl('', [Validators.required, Validators.pattern('https?://.*')]),
    selectedGenre: new FormControl('', [Validators.required]),
    customGenre: new FormControl('')
  });
  
  availableGenres: string[] = ['Programming', 'Self-help'];
  bookId: string | null = null;
  submitted = false;
  isSubmitting = false;
  
  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit() {
    // Set up dynamic validation for customGenre
    this.bookForm.get('selectedGenre')?.valueChanges.subscribe(value => {
      const customGenreControl = this.bookForm.get('customGenre');
      if (value === 'other') {
        customGenreControl?.setValidators([Validators.required]);
      } else {
        customGenreControl?.clearValidators();
      }
      customGenreControl?.updateValueAndValidity();
    });
    
    // Load available genres first
    this.loadGenres();
    
    // Get book ID from route parameters
    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.loadBook(this.bookId);
    } else {
      alert('ID sách không hợp lệ');
      this.router.navigate(['/admin/book']);
    }
  }
  
  // Getter for easy access to form fields
  get f() { 
    return this.bookForm.controls; 
  }
  
  loadGenres(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        // Extract unique genres
        const genres = new Set<string>();
        books.forEach(book => {
          if (book.genre) {
            genres.add(book.genre);
          }
        });
        
        // Update available genres
        this.availableGenres = Array.from(genres);
      },
      error: (err) => {
        console.error('Error loading genres:', err);
      }
    });
  }
  
  loadBook(id: string): void {
    this.bookService.getById(id).subscribe({
      next: (data) => {
        // Update form values with book data
        this.bookForm.patchValue({
          title: data.title,
          price: data.price,
          published: data.published,
          imageURL: data.imageURL
        });
        
        // Handle genre selection
        if (data.genre) {
          if (this.availableGenres.includes(data.genre)) {
            this.bookForm.get('selectedGenre')?.setValue(data.genre);
          } else {
            // If the genre is not in the available list, select "Other" and set custom genre
            this.bookForm.get('selectedGenre')?.setValue('other');
            this.bookForm.get('customGenre')?.setValue(data.genre);
          }
        }
      },
      error: (err) => {
        console.log(err);
        alert('Không tìm thấy sách');
        this.router.navigate(['/admin/book']);
      }
    });
  }
  
  onGenreChange(): void {
    const selectedGenre = this.bookForm.get('selectedGenre')?.value;
    
    if (selectedGenre === 'other') {
      // Clear the custom genre when "Other" is selected
      this.bookForm.get('customGenre')?.setValue('');
    } else {
      // Clear the custom genre validation errors
      this.bookForm.get('customGenre')?.clearValidators();
      this.bookForm.get('customGenre')?.updateValueAndValidity();
    }
  }
  
  handleSubmit(): void {
    this.submitted = true;
    
    // Stop if form is invalid
    if (this.bookForm.invalid) {
      return;
    }
    
    if (!this.bookId) {
      return alert('ID sách không hợp lệ');
    }
    
    // Prepare book data
    const bookData: BookEdit = {
      id: this.bookId,
      title: this.bookForm.get('title')?.value || '',
      price: this.bookForm.get('price')?.value,
      published: this.bookForm.get('published')?.value,
      imageURL: this.bookForm.get('imageURL')?.value || '',
      genre: ''
    };
    
    // Set the genre based on selection
    const selectedGenre = this.bookForm.get('selectedGenre')?.value;
    if (selectedGenre === 'other') {
      const customGenre = this.bookForm.get('customGenre')?.value;
      if (!customGenre) {
        return; // Should not happen due to validation
      }
      
      bookData.genre = customGenre;
      
      // Add the new genre to available genres if it's not already there
      if (!this.availableGenres.includes(customGenre)) {
        this.availableGenres.push(customGenre);
      }
    } else if (selectedGenre) {
      bookData.genre = selectedGenre;
    }
    
    // Submit the book
    this.isSubmitting = true;
    this.bookService.edit(this.bookId, bookData).subscribe({
      next: () => {
        alert('Cập nhật sách thành công');
        this.router.navigate(['/admin/book']);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.log(err);
        alert('Có lỗi xảy ra khi cập nhật sách');
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
