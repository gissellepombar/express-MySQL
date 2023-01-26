import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2';

const app = express();
app.use( express.json() );
app.use(cors() );
dotenv.config();

const PORT = process.env.PORT || 3030;
const CREDENTIAL = JSON.parse(process.env.CREDENTIAL);
const mysqlTable = 'MOCK_DATA';

const db = mysql.createConnection(CREDENTIAL);

//check
db.connect((err) => {
    if(err) {
        //console.log(err);
        process.exit(1)
    }
    console.log(`MySQL connected!`)
}) 

// Get: Root
app.get('/', (req, res) => {
    console.log('MySQL: I am root');
    res.send('MySQL: I am root');
})

// Get: All
app.get('/gettable', (req, res) => {
    // Query
    const query = "SELECT * FROM mock_data ORDER BY id DESC LIMIT 10"
    // Send the Query
    db.query(query, (err, result) => {
        if(err) {process.exit(1);}

        console.table(result);
        res.send('Query Sent!');
    })
})

//GET by ID
app.get('/class/:id', (req, res) => {
    //Parameter and Query
    const parameter = Number(req.params.id);
    const query = `SELECT * FROM ${mysqlTable} WHERE id=?`;

    //Send Query
    db.query(query, [parameter], (err, result) => {
        if(err) { process.exit(1); }

    //Result
    console.table(result);
    res.send(`Query Sent!`);
    });
}) ;


//POST
app.post('/post', (req, res) => {
    //parameter and query
    //const parameter = {id: null, first_name: 'Anthony', last_name: 'Styles', email: 'Style@fashion.com', gender: 'm', ip_adress: 'Yourmom'};
    const parameter = req.body;
    const query = `INSERT INTO ${mysqlTable} SET ?`;
    
    //send query 
    db.query(query, parameter, (err, result) => {
        if(err) { 
            console.error(err)
            process.exit(1); 
        }
        //Result
        console.log(result);
        res.send('Post Added');
    });
});

//DELETE
app.delete('/delete/:id', (req, res) => {
    //parameter and query
    const parameter = Number(req.params.id);
    const query = `DELETE FROM ${mysqlTable} WHERE id=?`;

    //send query 
     db.query(query, [parameter], (err, result) => {
        if(err) { 
            console.error(err)
            process.exit(1); 
        }
        //Result
        console.log(result);
        res.send('Post Deleted');
    });
});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
});


// Delete
export async function deleteRestaurant(req, res) {
    const { restId } = req.params
    const db = dbConnect()
    await db.collection(collectionName).doc(restId).delete()
    res.send("Restaurant Deleted")
  }
