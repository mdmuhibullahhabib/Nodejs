import { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
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
        console.log(body,"body");
        

        res.writeHead(200, ({ "content-type": "application/json" }))
        res.end(
            JSON.stringify({
                message: "product create successfully...",
            })
        )

    }

}