const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://zulfahmifjr:123@prak-sbd.r0bm57q.mongodb.net/noteapp?appName=prak-sbd')
  .then(() => console.log('Database nyambung nih!'))
  .catch(err => console.log(err));

const noteSchema = new mongoose.Schema({ text: String });
const Note = mongoose.model('Note', noteSchema);

app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post('/notes', async (req, res) => {
  const newNote = new Note({ text: req.body.text });
  await newNote.save();
  res.json(newNote);
});

app.delete('/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note dihapus' });
});

app.listen(5000, () => {
  console.log('Server jalan di port 5000');
});