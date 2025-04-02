export default interface IBook {
id: string
title:string
price:number|null
published:true|null
imageURL:string
genre:string
}

export interface BookAdd {
  title: string
  price: number | null
  published: boolean | null
  imageURL: string
  genre: string
}

export type BookEdit = Omit<IBook,'id'>