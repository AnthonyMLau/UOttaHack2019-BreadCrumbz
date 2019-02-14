//const functions = require('firebase-functions')
const express = require('express');
const sqlite = require('sqlite3').verbose();
const bodyParser = require("body-parser");
const todayDate = new Date();

var pickupEvents = [];
var url  = "https://www.google.com/maps/dir/45.4289,-75.6844/45.4286132,-75.6908283/45.4014015,-75.7261914/Canada+Agriculture+and+Food+Museum,+Prince+of+Wales+Drive,+Ottawa,+ON/@45.3879612,-75.7092569,17.95z/data=!4m11!4m10!1m0!1m0!1m0!1m5!1m1!1s0x4cce05d4569e7415:0x82d7b7cc06b31338!2m2!1d-75.7093198!2d45.3875416!3e0";

const app = express()
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('MDB-Free_4.7.1'))


app.post('/SuperMarketPublish', (req, res) => {
    //if supermarket publishes pickup request
    var latlong = req.body;
    var location = {
        name:'asd',
        lat: 45.4286132,
        long: -75.6908283
    };
    pickupEvents.push(location);
    console.log('asdf');

    res.status(200).json({});

})

//default final destination
var finalDestination = {
    lat: 40.5613,
    long: 101.264
}

app.post('/SetFinalDestination', (req, res) => {
    finalDestination.lat = req.body.lat;
    finalDestination.long = req.body.long;
});

//add default final destination
pickupEvents.push({
    name: "Jimmy's supermarket",
    lat: 45.1265,
    long: 101.6625
})

app.get('/GetFinalDestination', (req, res) => {
    req.statusCode(200).send(finalDestination);
});

app.get('/GetAllDriverPickup', (req, res) => {
    res.status(200).send(pickupEvents);
});

app.post('/PickDriverPickup', (req, res) => {
    //remove index that 
    var latlong = req.body;
    url = req.body.url;
    for (var i = 0; i < pickupEvents.length(); i++) {
        if (location.lat === latlong.lat && location.long === latlong.long) {
            pickupEvents.splice(i, 1);
        }
    }
    res.status(200).send('ok, removed');
});

app.listen(3000);