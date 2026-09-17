import { db } from "../config/dbConnect.js";
import { initDB } from "../config/dbConnect.js";
initDB()

export async function createProduc({name, value, description}) {
    const sqlInsert = `insert into produtos (nome, valor, descricao) values ($1, $2, $3)`     
    return await db.query(sqlInsert, [name.toUpperCase().trim(), Number(value), description])            
}

export async function allProductsModel() {
    const sqlAllProducts = `select * from produtos`     
    return await db.query(sqlAllProducts)            
}