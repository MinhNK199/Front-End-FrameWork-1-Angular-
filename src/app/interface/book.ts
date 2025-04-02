// Define the interfaces for your book data

// Base book interface for retrieved books
export default interface IBook {
  id: string
  title: string
  price: number
  published: boolean
  imageURL: string
  genre: string
}

// Interface for adding a new book (no id required)
export interface BookAdd {
  title: string
  price: number | null
  published: boolean | null
  imageURL: string
  genre: string
}

// Interface for editing a book (all fields optional except id)
export interface BookEdit {
  id: string
  title?: string
  price?: number|null
  published?: boolean|null
  imageURL?: string
  genre?: string
}

