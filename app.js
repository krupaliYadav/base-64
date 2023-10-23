const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require("path")
const connectDatabase = require("./config/dbConnection")
const routes = require("./routes/index")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1/users", routes)
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('Hello World!'))

connectDatabase()

app.listen(port, async () => {
    console.log(`Server is running on ${port}`);
})
