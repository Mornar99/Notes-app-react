import { useEffect, useState } from "react";

const Note = ({id, text, date, handleDeleteNote, handleUpdateNote}) => {
    
    const characterLimit = 200;

    const funkcija = () => {
        handleDeleteNote(id)
    }

    const handleSaveClick = () => {
        handleUpdateNote(id,noteText)
    };
    
    //useState za vrtit footere
    const [isShown, setIsShown] = useState(true);

    const handleClick = () => {
        setIsShown(!isShown)
    };

    //bivsi problem: kod searcha/deleta sve ispravno nade koje i sta ali stalno ispisuje od pocetka, npr ako u searchu triba nac samo 1 notes on ispisuje samo prvi
    //RJ: initial vrijednost se ne minja svaki put kad se props(text) minja pa je problem zato triba koristit useEffect
    const [noteText, setNoteText] = useState(text);
    useEffect(()=>{
        setNoteText(text);
    },[text]);
    //^^ kombinacija useState i useEffect rjesila problem ^^
    //sad kad se u props promini text prominit ce se i initial vrijednost noteText-a

    //stavia sam da su 2 footera: 1 sa datumom i brisanje, a drugi za edit
    const NoteFooter1 = () => {
        return(
            <div className="note-footer">
                <small>{date}</small>              
                <button className='delete-icon' onClick={funkcija}>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                </button>
            </div>
        )
    };

    const NoteFooter2 = () => {
        return(
            <div className="note-footer2">
                <small>{characterLimit - noteText.length} Remaining</small>
                <button className='save-note' onClick={handleSaveClick}>Save</button>
            </div>
        )
    };
    
    const handleChange = (event) => {
        //vamo mora bit event.target.value.length, a ne noteText.length jer se on mijenja tek nakon if a do toga nece doci kad se prode limit
        if((characterLimit - event.target.value.length) >= 0){
            //console.log(characterLimit - event.target.value.length)
            //console.log(event.target.value)
            setNoteText(event.target.value);
        }
        if((characterLimit - event.target.value.length) === 200){//kad note ostane prazan automatski se brise
            funkcija()
        }
        
    }

    return(
        <div className="note">
            <textarea className="note-text" value={noteText} onChange={handleChange}></textarea>
            <button className="switch" onClick={handleClick}>
                <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg"><path d="M4.99255 11.0159C4.44027 11.0159 3.99255 10.5682 3.99255 10.0159C3.99255 9.6585 4.18004 9.3449 4.46202 9.16807L7.14964 6.48045C7.54016 6.08993 8.17333 6.08993 8.56385 6.48045C8.95438 6.87098 8.95438 7.50414 8.56385 7.89467L7.44263 9.0159L14.9926 9.01589C15.5448 9.01589 15.9926 9.46361 15.9926 10.0159C15.9926 10.5682 15.5448 11.0159 14.9926 11.0159L5.042 11.0159C5.03288 11.016 5.02376 11.016 5.01464 11.0159H4.99255Z" fill="currentColor"></path><path d="M19.0074 12.9841C19.5597 12.9841 20.0074 13.4318 20.0074 13.9841C20.0074 14.3415 19.82 14.6551 19.538 14.8319L16.8504 17.5195C16.4598 17.9101 15.8267 17.9101 15.4361 17.5195C15.0456 17.129 15.0456 16.4958 15.4361 16.1053L16.5574 14.9841H9.00745C8.45516 14.9841 8.00745 14.5364 8.00745 13.9841C8.00745 13.4318 8.45516 12.9841 9.00745 12.9841L18.958 12.9841C18.9671 12.984 18.9762 12.984 18.9854 12.9841H19.0074Z" fill="currentColor"></path></svg>
            </button>
            <div className="foot">
                {isShown && <NoteFooter1 />}
                {!isShown && <NoteFooter2 />}
            </div>
        </div>

    )
}

export default Note;
//u textarea noteText mora ic u value !!!