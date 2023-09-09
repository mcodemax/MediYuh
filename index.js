const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = import('cors')
const dotenv = require('dotenv')
const multer = require('multer')
const helmet = require('helmet')
const morgan = require('morgan')
const path = import('path')
const { fileURLToPath } = require('url')

/* CONFIGS */
const __filename = fileURLToPath(import.meta.url)
