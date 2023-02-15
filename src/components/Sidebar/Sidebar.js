import React from 'react'

const Sidebar = (props) => {
  const noteElements= props.notes.map((note,index)=>(
    <div key={note.id}>
      <div 
          className={`title ${
              note.id === props.currentNote.id ? "selected-note" : ""
          }`}
          onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className='text-snippet' >{(note.body).split('\n')[0]} </h4>
      </div>
    </div>
  ))
  return (
    <div className='pane sidebar'>
      <div className='sidebat--header'>
          <h3>Notes</h3>
          <button className='new-note' onClick={props.newNote}>+</button>
      </div>
      {noteElements}
    </div> 
  )
}

export default Sidebar