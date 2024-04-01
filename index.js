import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const API_URL = "https://api.openbrewerydb.org/v1/breweries";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index.ejs", { breweryData: null });
});

app.post("/random", async (req, res) => {
  try {
    const randomBrewery = await axios.get(API_URL + "/random");

    // Construimos un objeto con los datos que queremos pasar a la plantilla
    const breweryData = {
      name: randomBrewery.data[0].name,
      location: `${randomBrewery.data[0].city}, ${randomBrewery.data[0].country}`,
      website: randomBrewery.data[0].website_url || "N/A",
    };

    res.render("index.ejs", { breweryData: breweryData });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error retrieving data from API");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
