const express = require('express');
const morgan = require('morgan');
const morganBody = require('morgan-body');
const helmet = require('helmet');
const app = express();
const PORT = 3001;
const cors = require("cors");
const { getRandomInt } = require("./utils");

let soldiers = require("./soldiers.json")
let cities = require("./cities.json")
cities.sort((a, b) => a.city > b.city ? 1 : -1);

morganBody(app);
app.use(helmet());
app.use(morgan('dev'));
app.use(cors())
app.use(express.json())

//global auth middleware
app.use((req, res, next) => {  
  console.log(req.headers.user_mispar_ishi);
    const user_mispar_ishi = req.headers.user_mispar_ishi;
    const user_name = req.headers.user_name;
    if (!user_mispar_ishi || !user_name) {
        return res.status(401).end();
    }
    const soldierInfo = soldiers.find(s => s.Mispar_Ishi === user_mispar_ishi && s.User_Name === user_name)
    if (soldierInfo) {
        console.log("Validated successfully!")
        req.user = soldierInfo;
        next();
    }
    else {
        return res.status(401).json({ error: "Error in validating user!" })
    }
});

//routes
app.post('/login', (req, res) => {
    res.status(200).send(req.user)
})

app.get('/getAllSoldiers', (_req, res) => {
    res.status(200).send(soldiers)
})

app.get('/getAllCities', (_req, res) => {
    const citiesData = cities.map(cityData => {
        const { country, city, continent } = cityData;
        return {
            country, city, continent
        }
    })
    res.status(200).send(citiesData)
})


app.put('/updateMadorSoldiers', (req, res) => {
    if (!req.body?.newSoldiers) return res.status(400).json({ error: "Bad Data!" })
    const { newSoldiers } = req.body;
    if (!Array.isArray(newSoldiers)) return res.status(400).json({ error: "Bad Data!" })
    const random = getRandomInt(3);
    if (random === 0) return res.status(500).json({ error: "נאחס!" })
    soldiers = [...newSoldiers];
    return res.status(200).end();
})

app.get('/cities/:cityName', (req, res) => {
    const cityName = req.params.cityName;

    const cityData = cities.find(c => c.city === cityName)
    if (!cityData) {
        return res.status(404).json({ error: "Not Found!" })
    }
    const { latitude, longitude } = cityData;
    res.status(200).send({ latitude, longitude })
})

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);