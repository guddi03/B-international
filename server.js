const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/cs-messaging-app', { useNewUrlParser: true, useUnifiedTopology: true });

const messageSchema = new mongoose.Schema({
  text: String,
  customerName: String,
  createdAt: Date
});

const Message = mongoose.model('Message', messageSchema);

app.use(bodyParser.json());

app.post('/api/messages', (req, res) => {
  const message = new Message(req.body);
  message.save((err, message) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(message);
    }
  });
});

app.get('/api/messages', (req, res) => {
  Message.find().then(messages => {
    res.send(messages);
  }).catch(err => {
    res.status(500).send(err);
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});