const express = require("express");
const app = express();
const port = 3000;
const { router } = require("./app/routers/index");
// const { errorHandler } = require("./app/utils/middleware/errorHandling");
// const { logger } = require("./app/utils/middleware/morgan");
// const morgan = require("morgan");
// const Sentry = require("@sentry/node");
// const Tracing = require("@sentry/tracing");
// const cors = require("cors");


app.use(express.json());
app.use(router)
// const corsOptions = {
//   origin: "https://expressjs.com",
// };

// app.use(cors(corsOptions));

// app.use(logger);
// app.use(morgan(`dev`));

// Sentry.init({
//   dsn:
//     "https://9458c0afa32c49adab3ff0e7438986ac@o551742.ingest.sentry.io/5675447",
//   integrations: [
// //     // enable HTTP calls tracing
//     new Sentry.Integrations.Http({ tracing: true }),
// //     // enable Express.js middleware tracing
//     new Tracing.Integrations.Express({ app }),
//   ],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
// //   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

// app.use(Sentry.Handlers.requestHandler());
// // TracingHandler creates a trace for every incoming request
// app.use(Sentry.Handlers.tracingHandler());

// router.use("/api/v1", [
//   routerVehicle,
//   routerType,
//   routerUser,
//   routerAuth,
//   routerRental
// ]);
// app.use(router);

// app.use(Sentry.Handlers.errorHandler());
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});