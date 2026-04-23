const express =require('express');
const  app= express();
const port = process.env.PORT;

const cors = require('cors');
const  {notesrouter} = require("./api/v1/index");

require("./db");

app.use(express.json());




app.use(cors());
console.log("App starting...");
//root(/)
app.get("/",(request,response)=>{
    response.send("hello world");

})

 

// app.use("/notes",notesrouter);

app.get("/info",(request,response)=>{
    const author ={
        name: "fatik abrar",
        designation : "coder "
    }
    response.json(author);

})

app.listen(port, "0.0.0.0", () => {
  console.log(`notes backend running on port ${port}`);
});

