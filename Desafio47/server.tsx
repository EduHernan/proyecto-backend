// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { contentTypeFilter, createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();

let colores:string[] = []
let visitas:number = 0

app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
        </head>
        <body>
          <h1 style={{color:'blue'}}>Hello Servest con React!!</h1>
          <h2 style={{color:'brown'}}>Visitas: {++visitas}</h2>
          <h3 style={{color:'purple'}}>FyH: {new Date().toLocaleString()}</h3>

          <form className="form" action="/colors" method="post" role="form" autoComplete="off">

            <div className="form-group">
              <input id="color" name="color" placeholder="ingrese un color" className="form-control" type="text" required></input>
            </div>

            <div className="form-group">
              <input className="btn btn-success my-3" type="submit" value="Register"></input>
            </div>
          </form>
        </body>
      </html>
    ),
  });
});


app.listen({ port: 8000 });