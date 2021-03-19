const express = require("express");
const app = express();
const router = express.Router();
const port = 5000 || process.env.PORT
const cors = require("cors");
const morgan = require("morgan");
const { errorHandler } = require("./app/utils/middleware/errorHandling");
const {notFound} = require("./app/utils/middleware/notFound")
const { router: routerIndex } = require("./app/routes/index");


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get('/',(req, res)=>{
   res.json({message:"Hello World"});
})

router.use("/api/v1", routerIndex);
app.use(router);
app.use(notFound);
app.use(errorHandler);


app.listen(process.env.PORT||5000, () => {
  console.log(`Server started on port ${port}`);
});