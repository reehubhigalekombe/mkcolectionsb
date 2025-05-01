const express =  require("express");
const cors = require("cors");
const connectDB = require("./db");
const path = require("path");
const Subscriber = require("./models/Subscriber");
const authRoutes = require("./routes/auth");
require('dotenv').config();


const app = express();
connectDB();

const PORT = process.env.PORT || 5500;

app.use(cors({
    origin: 'https://vbbb.netlify.app',
    credentials: true
}));
app.use(express.json());

app.post("/api/subscribe", async (req, res) => {
    const {firstName, lastName, email, phone, interests} = req.body;
    try {
        
        const newSubscriber = new Subscriber({
            firstName, 
            lastName, 
            email, 
            phone,
             interests});
        await newSubscriber.save();

        return res.status(201).json({message: "Subscribed succesfully"})
    } catch(error) {
        console.error("Failed to Subscribe:", error);
        return res.status(500).json({message: "Server Error"})
    }

})

app.use("/api", authRoutes)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.get("/", (req, res) => {
    res.send("Hello higal ther server is connected")
})
app.listen( PORT, () => {
    console.log(`Server is connected to port ${PORT}`)
});

