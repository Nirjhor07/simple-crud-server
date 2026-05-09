const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const app = express();

const cors = require("cors");
const port = process.env.PORT || 8000;
//middleware
app.use(cors());
//convert express backend data into json format---important
app.use(express.json());

const uri =
  "mongodb+srv://simple-crud-test:P9UbQKgYww_ChiG@cluster0.7z0ydvr.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //different way of data fetching
    const db = client.db("simpleCrud");
    const myColl = db.collection("users");

    // create a api for this
    app.get("/users", async (req, res) => {
      const cursor = myColl.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    //create api for dynamic clicked user id route
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;

      const query = {
        _id: new ObjectId(id),
      };
      const user = await myColl.findOne(query);
      res.send(user);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`express port running at ${port}`);
});

//simple-crud-test
//8tWcJ4pnhHLOuU89
//mongodb+srv://simple-crud-test:8tWcJ4pnhHLOuU89@cluster0.7z0ydvr.mongodb.net/?appName=Cluster0
