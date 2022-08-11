const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const events = require('./events');
const app = express();
const PORT = 8080;

app.use(express.json());
app.get('/api/v3/app/events', (req, res) => {
    res.send(events);
});

app.get('/api/v3/app/events/:uid', (req, res) => {
    if(uid = req.params.uid) {
        res.send(findIndex(events));
    }
    
});

app.post('/api/v3/app/events', (req, res) => {
    var data = req.body;
    events.push(data);
    res.send("Data Sent");
    
})

app.put('/api/v3/app/events/:uid', (req, res) => {
    let uid = req.params.uid
    let type = req.body.type
    
    let index = events.findIndex((events) => {
        return (events.uid == Number.parseInt(uid))
    })

    if (index >= 0) {
        let std = events[index]
        std.type = type
        res.send(std)
    } else {
        res.status(404)
    }
})

app.delete('/api/v3/app/events/:uid', (req, res) => {
    let uid = req.params.uid;
    let index = events.findIndex((events) => {
        return (events.uid == Number.parseInt(uid))
    })
    if (index >= 0) {
        let std = events[index]
        events.splice( index , 1)
        res.send(std)
    } else {
        res.status(404)
    }
})

app.listen(PORT, () => console.log(`App is listening on port http://localhost:${PORT}`));