const express = require('express')
const cors = require('cors')
const app = express();
const mongoose = require('mongoose')
const database = require('./graphql/schema')

const { graphqlHTTP } = require('express-graphql')

app.use('/graphql', graphqlHTTP({
    schema: database,
    graphiql: true

}));
mongoose.connect("mongodb+srv://Test2:Db@test.8zhgx.mongodb.net/test?w=majority&retryWrites=true ", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    })
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

app.use(cors())
app.listen(5000, () => console.log("server is running  at port 5000"))