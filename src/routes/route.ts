import { IncomingMessage, ServerResponse } from "http";
import { poductController } from "../controller/controller";

export const routeHandler =  (req : IncomingMessage, res : ServerResponse)=>{
    const url = req.url
    const method = req.method

    if (url === "/" && method === "GET") {

        // console.log("server is running in console...");

        res.writeHead(200, ({ "content-type": "application/json" }))
        res.end(JSON.stringify({ message: "this is route route" }))

    } else if (url?.startsWith("/products")) {
        poductController(req, res)
    } else {
        res.writeHead(404, ({ "content-type": "application/json" }))
        res.end(JSON.stringify({ message: " route not found" }))
    }
}