const mongoose = require("mongoose");
const uri =
  // dont forget to add this to environment variables dotenv
  "mongodb+srv://sheriffdeenoluwatoyinoni:auth@cluster0.xotpemg.mongodb.net/?retryWrites=true&w=majority";
async function connect() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true });
    console.log("connected to mongodb server");
  } catch (error) {
    console.error(error);
  }
}
connect();
