import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const apiKey ="afba75828c7f5601f815c55825985577";

app.get("/",(req,res) => {
    res.render("index.ejs",{ content: "Waiting for data..." })
})

app.post("/", async (req,res) =>{
    try {const city = req.body.cityName;
    const unit = req.body.unit
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`)
    console.log(result);
    JSON.stringify(result.data)
    res.render("index.ejs",{content:  JSON.stringify(result.data.main.temp)});
}
 catch(error) {
    console.error("Failed to make request:", error.message);
    res.render("index.js", {
      error: error.message,
    });
  }})








app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})