import Note from "./Note"; //sa importom/exportom mozemo podilit komponente u vise fileova
import AddNote from "./AddNote";

const NotesList = ({ notes , handleAddNote, handleDeleteNote}) => {
    return(
        <div className="notes-list">
            {notes.map((note) => 
                <Note id={note.id} text={note.text} date={note.date} handleDeleteNote={handleDeleteNote}/>
            )}

            <AddNote handleAddNote={handleAddNote}/>
        </div>
    )
}
//map kreira zapravo array, za svaki note koji saljem stvara komponentu Note
//viticaste kad saljemo neki parametar objekta

//AddNote komponenta je na kraju jer prostor za unit novu biljesku stoji uvik na dnu
export default NotesList;