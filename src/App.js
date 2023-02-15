import './App.css';
import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Editor from './components/Editor/Editor';
import Split from 'react-split';
import {nanoid} from 'nanoid'


function App() {
  const [notes,setNotes]=React.useState( () => JSON.parse(localStorage.getItem("notes")) || [])
  const [currentNoteId, setCurrentNoteId]=React.useState(
    (notes[0] && notes[0].id) || ""   // daca avem o notita va seta currentNoteId la id-ul primei notite altfel il va lasa gol pt. ca nu avem nicio notita
  )

React.useEffect(()=>{
  localStorage.setItem("notes" , JSON.stringify(notes))
}, [notes])

  function createNewNote(){
    const newNote={
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  //this does not rearrange the notes
  /*
  function updateNote(text){  //actualizeaza ce scriu in note
    setNotes(oldNotes => oldNotes.map(oldNote =>{
      return oldNote.id === currentNoteId
      ? {...oldNote,body:text}
      :oldNote
    }))
  }
*/

  function updateNote(text){  //actualizeaza ce scriu in note
    const rearrangedNotesArray=[]
   setNotes(oldNotes=> {
    for(var i=0; i<oldNotes.length;i++)
      {
        if(oldNotes[i].id === currentNoteId)
          rearrangedNotesArray.unshift({...oldNotes[i],body:text})
        else
          rearrangedNotesArray.push(oldNotes[i])
      }
      return rearrangedNotesArray
   })
    
  }


  function findCurrentNote(){
    return notes.find(note =>{
      return note.id === currentNoteId
    }) || notes[0]
  }

  return (
    <div className="App">
      {
        notes.length > 0
        ?
        <Split 
            sizes={[30,70]}
            direction="horizontal"
            className='split'  
        >
            
            <Sidebar
                notes={notes}
                currentNote={findCurrentNote()}
                setCurrentNoteId={setCurrentNoteId}
                newNote={createNewNote}
            />
            
            {currentNoteId &&
            notes.length > 0 &&
            <Editor
                currentNote={findCurrentNote()}
                updateNote={updateNote}                
            />
            }
        </Split>
        :
        <div className='no-notes'> 
           <h1>You have no notes</h1>
           <button
              className='first-note'
              onClick={createNewNote}
           >Create a new note</button>
        </div>
      }
    </div>
  );
}

export default App;
