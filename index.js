import express, { response } from 'express';
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from 'dotenv';
const app = express();
const port = 3001;

app.listen(port, ()=>{

  console.log(`listening on ${port}`);
  
  });

 
dotenv.config();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



const yourBearerToken=process.env.bearer_tocken;

app.get("/", async (req, res) => {
  try {
    // Fetch data initially
    const initialDataResponse = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": yourBearerToken, // Corrected header format
        },
      }
    );

    const initialData = initialDataResponse.data;


    // Render the template with the initial data
    res.render("home.ejs", { data: initialData });
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});



app.get("/home",async (req,res)=>{
  try {
    // Fetch data initially
    const initialDataResponse = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": yourBearerToken, // Corrected header format
        },
      }
    );

    const initialData = initialDataResponse.data;

  //  console.log(initialData);

    // Render the template with the initial data
    res.render("home.ejs", { data: initialData });
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});








app.get("/contact",async (req,res)=>{
  res.render("contact.ejs");

});




app.get("/topcryptos", async (req, res) => {
  try {
    // Fetch data initially
    const initialDataResponse = await axios.get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,USDT,BNB,XRP,USDC,ADA,DOGE,SOL,TRX&tsyms=USD");
    const initialData = initialDataResponse.data;
   

    const initialDataResponse1 = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": yourBearerToken, // Corrected header format
        },
      }
    );

    const initialData1 = initialDataResponse1.data;
    // Render the template with the initial data
    res.render("topcryptos.ejs", { data: initialData, data1:initialData1});

  } catch (error) {
    console.error("Failed to make request:", error.message);
    
  }
});



app.get("/marketnews", async (req, res) => {
  try {
    const response = await axios.get("https://min-api.cryptocompare.com/data/v2/news/?lang=EN");
    const result = response.data;
    
    // Get the first 10 objects from the Data array
    const first10Data = result.Data.slice(0, 10);

    res.render("marketnews.ejs", { data: first10Data });

  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("marketnews.ejs", {
      error: error.message,
    });
  }
});


 
  

