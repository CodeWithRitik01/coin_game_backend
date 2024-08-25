import "./env.js"
import express from "express"
import cors from "cors"
import TelegramBot from "node-telegram-bot-api";
import supabase, { corsOptions } from "./config.js";

import pointsRoutes from "./routes/pointTrack.routes.js"

const app = express();
const PORT = process.env.PORT || 5000
const BOT_TOKEN = process.env.BOT_TOKEN;

// Initialize the Supabase client connection
supabase

// Middleware to parse JSON and URL-encoded data in requests.
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cors(corsOptions))
let userId 
let username

const GAME_URL =process.env.GAME_URL

// Initialize the Telegram bot with the provided token and enable polling for new messages.
const bot = new TelegramBot(BOT_TOKEN, {polling:true});

// Event listener for incoming messages to the bot.
bot.on("message", (message) =>{
    userId = message.chat.id
    username = message.chat.first_name

    try {
        if(message.text === "/start"){

            bot.sendMessage(message.from.id, "Welcome to TapMe! Click the button below to start the game.", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { 
                                text: "Play TapMe", 
                                url: GAME_URL 
                            }
                        ]
                    ]
                }
            });
    
        }
    } catch (error) {
        console.log(error)
    }

})

// Middleware to attach userId and username to every request if they are set.
app.use((req, res, next) => {
    if (userId && username) {
        req.userId = userId;
        req.username = username;
    }
    next();
});

// Use the pointsRoutes for handling requests to the "/points" endpoint.
app.use("/points", pointsRoutes)

app.get("/", (req, res) =>{
    res.send("hello")
})

// Start the server and listen on the specified port.
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})

