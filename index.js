require("dotenv").config();
const PORT = process.env.PORT || 6000;

const server = require("./api/server");

server.listen(PORT, () =>
  console.log(`Shhhhh, \n \nlistening on port ${PORT}`)
);
