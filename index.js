const express =require('express');
const  app= express();
const port = process.env.PORT || 5000;

const cors = require('cors');
const  {notesrouter} = require("./api/v1/index");

require("./db");

app.use(express.json());



app.use(cors());
//root(/)
app.get("/",(request,response)=>{
    response.send("hello world");

})

 

app.use("/notes",notesrouter);

app.get("/info",(request,response)=>{
    const author ={
        name: "fatik abrar",
        designation : "coder "
    }
    response.json(author);

})

app.listen(port, () => {
  console.log(`notes backend running on port ${port}`);
});
