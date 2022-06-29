import { MongoClient } from "mongodb";


// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://yrys_NM:Atom.3@cluster0.azdrbdi.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

let db, collection, metaData;
async function run() {
  try {

    await client.connect();

    db = client.db("todoList");
    collection = db.collection('todoList');

    metaData = await collection.find({}).toArray();

    console.log("Connected");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  } 
}
run().catch(console.dir);

export {db, collection, metaData};
