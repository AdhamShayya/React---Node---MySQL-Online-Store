const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors());// to be able to display the data in the front end (connection on diff ports)
app.use(express.json());// to accept a json format  from the user

const db = require('./models');

//Routers

const productsRouter = require('./routes/ProductsRoute');
app.use("/products", productsRouter);
const productRouter = require("./routes/ProductRoute");
app.use("/product", productRouter)
const categoryRouter = require('./routes/CategoryRoute');
app.use("/category", categoryRouter);
const commentsRouter = require('./routes/CommentsRoute');
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/UsersRoute");
app.use("/users", usersRouter);
const likesRouter = require("./routes/LikesRoute");
app.use("/likes", likesRouter);
const CartRouter = require("./routes/CartRoute");
app.use("/cart", CartRouter);
const SearchRouter = require("./routes/SearchRoute");
app.use("/search", SearchRouter);

db.sequelize.sync().then(() => { // we are syncing the model and then update them and if they are not created then they will be created
    app.listen(4000, () => {
        console.log("Server running on 4000");
    })
})