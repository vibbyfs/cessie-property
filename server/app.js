const express = require("express")
const app = express()
const cors = require("cors")

const errorHandler = require("./middleware/errorHandler")
const PropertyController = require("./controllers/propertyController")
const CategoryController = require("./controllers/categoryController")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/api/properties", PropertyController.getAllProperties)
app.get("/api/categories", CategoryController.getAllCategories)

app.use(errorHandler)

module.exports = app