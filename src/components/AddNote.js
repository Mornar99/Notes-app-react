import { useState } from "react";

const AddNote = ({handleAddNote}) => {

    const [noteText, setNoteText] = useState('');

    const characterLimit = 200;

    //kad nesto upisemo/brisemo u textarea to se pohranjuje u noteText
    const handleChange = (event) => {
        //vamo mora bit event.target.value.length, a ne noteText.length jer se on mijenja tek nakon if a do toga nece doci kad se prode limit
        if((characterLimit - event.target.value.length) >= 0){
        //console.log(event.target.value);
        setNoteText(event.target.value);
        }
    }

    //kako bi AddNote(child) radia promjene u App(parent) napravit funckiju u App
    //kad se klikne button save aktivira se funkcija handleSaveClick koja aktivira funkciju handleAddNote, koju vucemo kroz fileove(komponente) NotesList i App kroz parametre kako bi se u App aktivirala funkcija AddNote
    //ovo se zove provlacenje funkcije kroz komponente dok ne dode di triba
    const handleSaveClick = () => {
        if(noteText.trim().length > 0)//da neradi novi notes ako je sve prazno(npr samo razmaci), funkcija trim mice sve razmake 
            {
                handleAddNote(noteText);
                setNoteText('');//ponovo vrati text za dodat novu na prazno
            }
    }


    return(
        <div className="note new">
            <textarea rows = '9' cols = '10' placeholder = 'Type to add note...' onChange={handleChange} value={noteText}></textarea>

            <div className="note-footer">
                <small>{characterLimit - noteText.length} Remaining</small>
                <button className='save' onClick={handleSaveClick}>Save</button>
            </div>
        
        </div>
    )
}
//textarea se koristi obicno kad korisnik unosi svoj komentar, velicina odredena brojem redaka i stupaca
//textarea kad se promini (onChange) aktivira se dana funkcija pa sve sta je uneseno ide na useState

export default AddNote;