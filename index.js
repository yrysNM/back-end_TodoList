import express from "express";
import { ObjectId, MongoClient} from "mongodb";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());
const port = 3000;

const uri =
  "mongodb+srv://yrys_NM:Atom.3@cluster0.azdrbdi.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

client.connect().then(() => {
    console.log("connected!");
}).catch((e) => {
    console.log(e);
});

app.get("/todoList", async (req, res) => {
    const db = client.db("todoList");
    const collection = db.collection("todoList");

    const result = await collection.find({}).toArray();
    // console.log(metaData);
    res.send(result);
});

app.post("/todoList", async(req, res) => {
    const { label, done, chColor } = req.body;  

    const db = client.db("todoList");
    const collection = db.collection("todoList");

    const response = await collection.insertOne({
        label,
        done,
        chColor
    });

    const result = {
        _id: response.insertedId,
        label,
        done 
    };

    res.send(result);
});

app.put("/todoList/:id", async (req, res) => {
    const { label, done, chColor } = req.body;
    const { id } = req.params;

    const db = client.db("todoList");
    const collection = db.collection("todoList");

    await collection.updateOne(
        {
            _id: new ObjectId(id),
        },
        {
            $set: {
                label,
                done,
                chColor
            }
        }
    );

    const result = {
        _id: id, 
        label,
        done,
        chColor
    };
    res.send(result);
});



app.delete("/todoList/:id", async(req, res) => {
    // const {label, done} = req.body
    const {id} = req.params; 

    const db = client.db("todoList");
    const collection = db.collection("todoList");


    await collection.deleteOne(
        {
        _id: new ObjectId(id)
        }, 
    );
    

    // res.send("?/");
});

app.listen(port, () => {
    console.log(`Example app listenng on port ${port}`);
});