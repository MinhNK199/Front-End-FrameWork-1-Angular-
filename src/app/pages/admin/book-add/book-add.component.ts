import { Component, type OnInit } from "@angular/core"
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"
import { BookService } from "../../../service/book.service"
import type { BookAdd } from "../../../interface/book"

@Component({
  selector: "app-book-add",
  standalone: true, // Add standalone: true since you're using imports
  imports: [ReactiveFormsModule, CommonModule], // Change FormsModule to ReactiveFormsModule
  templateUrl: "./book-add.component.html",
  styleUrl: "./book-add.component.css",
})
export class BookAddComponent implements OnInit {
  // Create a FormGroup instead of direct model binding
  bookForm!: FormGroup

  // For genre selection
  availableGenres: string[] = ["Programming", "Self-help"]
  submitted = false

  constructor(private bookService: BookService,private router: Router,) {}

  ngOnInit(): void {
    // Initialize the form in ngOnInit
    this.initForm()

    // Load genres if needed
    this.loadGenres()
  }

  // Initialize the form with validators
  initForm(): void {
    this.bookForm = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(3)]),
      price: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
      published: new FormControl<boolean | null>(null, [Validators.required]),
      imageURL: new FormControl("", [Validators.required, Validators.pattern("https?://.*")]),
      genre: new FormControl("", [Validators.required]),
    })
  }

  // Getter for easy access to form controls
  get f() {
    return this.bookForm.controls
  }

  // Load genres from your service
  loadGenres(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        // Extract unique genres
        const genres = new Set<string>()
        books.forEach((book) => {
          if (book.genre) {
            genres.add(book.genre)
          }
        })

        // Update available genres
        this.availableGenres = Array.from(genres)
      },
      error: (err) => {
        console.error("Error loading genres:", err)
      },
    })
  }

  // Handle form submission
  handleSubmit(): void {
    this.submitted = true

    // Check if the form is valid
    if (this.bookForm.invalid) {
      return alert("Vui lòng nhập đầy đủ thông tin")
    }

    // Create book object from form values
    const book: BookAdd = {
      title: this.bookForm.value.title,
      price: this.bookForm.value.price,
      published: this.bookForm.value.published,
      imageURL: this.bookForm.value.imageURL,
      genre: this.bookForm.value.genre,
    }

    // Submit to service
    this.bookService.add(book).subscribe({
      next: () => {
        alert("Thêm sách thành công")
        this.router.navigate(["/admin/book"])
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
}

