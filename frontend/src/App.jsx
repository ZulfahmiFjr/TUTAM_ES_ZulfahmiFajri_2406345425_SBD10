import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [notes, setNotes] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    axios.get('https://tutam-sbd10-8bda03ad23a7.herokuapp.com/notes')
      .then(res => setNotes(res.data))
      .catch(err => console.log(err))
  }, [])

  const addNote = () => {
    if (!text) return;
    axios.post('https://tutam-sbd10-8bda03ad23a7.herokuapp.com/notes', { text })
      .then(res => {
        setNotes([...notes, res.data])
        setText('')
      })
  }

  const deleteNote = (id) => {
    axios.delete(`https://tutam-sbd10-8bda03ad23a7.herokuapp.com/notes/${id}`)
      .then(() => {
        setNotes(notes.filter(note => note._id !== id))
      })
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Tugas Tambahan Modul 10</h2>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Tulis note disini..."
        style={{ padding: '5px', marginRight: '10px' }}
      />
      <button onClick={addNote} style={{ padding: '5px 10px' }}>Tambah</button>

      <ul>
        {notes.map(note => (
          <li key={note._id} style={{ margin: '10px 0' }}>
            {note.text} 
            <button onClick={() => deleteNote(note._id)} style={{ marginLeft: '10px' }}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App