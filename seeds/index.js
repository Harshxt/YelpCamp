
const cities = require('./cities')
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () =>{
    console.log("Database connected!")
});

const sample = (arr) => arr[Math.floor(Math.random()* arr.length)];

const seedDB = async() =>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) +10;
       const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://images.unsplash.com/photo-1505635725851-c2cfe9e29112',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price: price
        })
        await camp.save();
        console.log(camp);
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})