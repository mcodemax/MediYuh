const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const multer = require('multer')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const { fileURLToPath } = require('url') //lets you set path when config dirs
import { register } from "./controllers/auth.js"

/* CONFIGS */
//const __filename = fileURLToPath(import.meta.url) var predefined in node.js
//const __dirname = path.dirname(__filename)
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); //store images locally but deployed want it on something like s3

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function(req, file, cb) { //anytime someone uploads file onto website will be saved in this destination
        cb(null, "public/assets")
    },
    filename: function(req, file, cb){
        cb(filename.originalname)
    }
})
const upload = multer({ storage }); //use this var anytime need to upload a file

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture", register))

/* MONGOOSE SETUP */
PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`SERVER PORT ${PORT}`));
}).catch((error) => console.log(`${error}, did not connect`))

/*
windows firewall blocking node?
C:\users\max\appdata\local\packages\canonicalgrouplimited.ubuntuonwindows_79rhkp1fndgsc\localstate\rootfs\home\nospammax\.nvm\versions\node\v20.6.0\bin\node
*/