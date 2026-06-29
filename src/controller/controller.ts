import { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import { IProduct } from "../types/product.type";
import { parseBody } from "../utlity/parse.Body";

export const poductController = async(
    req: IncomingMessage,
    res: ServerResponse
) => {
    
    const url = req.url
    const method = req.method


    const urlParts = url?.split("/");

    const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

    // console.log(id,"id");


    if (url === "/products" && method === "GET") {  //grt all products

        const products = readProduct();

        // console.log(products, "p");
        

        res.writeHead(200, ({ "content-type": "application/json" }))
        res.end(
            JSON.stringify({
                message: "products...", 
                data: products
            })
        )
    } else if (method === "GET" && id !== null) {  //get single product

        const products = readProduct();
        const product = products.find((p: IProduct) => p.id === id)

        // console.log(product);

        res.writeHead(200, ({ "content-type": "application/json" }))
        res.end(
            JSON.stringify({
                message: "product...",
                data: product
            })
        )

    } else if (method === "POST" && url === '/products') {

        const body = await parseBody(req);
        const products = readProduct();

        const newProduct = {
            id: Date.now(),
            ...body
        }
        // console.log(newProduct,"new");
        products.push(newProduct);

        insertProduct(products)
        // console.log(products);

        res.writeHead(200, ({ "content-type": "application/json" }))
        res.end(
            JSON.stringify({
                message: "product create successfully...",
                data: insertProduct,
            })
        )
    }else if (method=== "PUT"  && id !==null) {
        const body = await parseBody(req)
        const products = readProduct()

        const index = products.findIndex((p : IProduct) =>p.id === id);
        console.log(index,"index")

        if(index <0){

            res.writeHead(404, ({ "content-type": "application/json" }))
            res.end(
                JSON.stringify({
                    message: "product not found...",
                    data: null,
                })
            )
        }
        // console.log(products[index]);
        products[index] = {id: products[index].id, ...body}

        insertProduct(products)

        res.writeHead(200, ({ "content-type": "application/json" }))
        res.end(
            JSON.stringify({
                message: "product updated...",
                data: products[index],
            })
        )
        
        
    }

}