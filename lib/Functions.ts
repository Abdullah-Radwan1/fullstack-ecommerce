import { db } from "./db"

export const getBestSold = async () => { 

const products = await db.product.findMany()

console.log(products)
 }