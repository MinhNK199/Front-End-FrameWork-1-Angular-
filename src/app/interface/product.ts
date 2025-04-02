export default interface IProduct {
id:string
name:string
price:number | null
sale_price:number
status:boolean | null
image:string
category:string 
rating:number
}

export type ProductAdd = Omit<IProduct, 'id'|'sale_price'|'rating'>;
export type ProductEdit = Omit<IProduct, 'id'|'sale_price'|'rating'>;