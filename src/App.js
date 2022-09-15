import { useEffect, useState } from "react";
import { nanoid } from "nanoid"; // generira random id-eve
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";
//ovo je obicni import
//viticasti import kad nije default export nego bas named values

const App = () => {

  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "Made by Ivan Mornar\ngithub: https://github.com/Mornar99?tab=repositories",
      date: "12.9.2022."
    },
    {
      id: nanoid(),
      text: "Example note 1",
      date: "12.9.2022."
    },
    {
      id: nanoid(),
      text: "Example note 2",
      date: "12.9.2022."
    },
    {
      id: nanoid(),
      text: "Try to make some more...",
      date: "12.9.2022."
    }

]);//use state hook(funkcija): prima 1 parametar: varijable sa initial vrijednosti(ovo unutar useState), a vraca 2 vrijednosti: trenutno stanje i funkciju kojom mozemo update stanje

  const [searchText, setSearchText] = useState('');//vamo je initial vrijednost prazna
  //console.log(searchText);

  const [darkMode, setDarkMode] = useState(false);//neka za initial vrijednost stoji da nije u dark modu

  //SAVE TO LOCAL STORAGE:(mora prvo u kodu ic getItem pa onda doli setItem inace nece na prvu ucita)
  //useEffect hook(funkcija) se aktivira na prvom renderu i svaki put kad se stanje promini, svrha je da izvede zadani zadatak kad se nesto promini
  //prima 2 argumenta, drugi nije obavezan -> detaljnije: https://www.w3schools.com/react/react_useeffect.asp
  useEffect(()=>{
    const savedNotes = JSON.parse(localStorage.getItem('notes-app-data'));
    if(savedNotes){
      setNotes(savedNotes);
    }

  }, []);//izvodi se samo na prvi render

  useEffect(()=>{
    localStorage.setItem('notes-app-data',JSON.stringify(notes));
  }, [notes]);//izvodi se kad se notes promine
  //local storage: web storage, omogucava trajno spremanje key-value podataka, imitira bazu podataka, ali brise se kad se izbrise cache i lokalna je pa nemogu pristupit drugi korisnici aplikacije pa nemoze zaminit bazu
  //za ocistit local storage: inspect -> application -> local storage -> local host -> clear

  const changeDarkMode = (newDarkMode) => {
    if(newDarkMode === true){
      document.querySelector("body").style.backgroundColor = "black";
      document.querySelector(".header").style.backgroundColor = "black";
      document.querySelector(".header").style.color = "white";

      document.querySelector(".description").style.backgroundColor = "black";
      document.querySelector(".description").style.color = "white";
      setDarkMode(true);
    }
    else{
      document.querySelector("body").style.backgroundColor = "white";
      document.querySelector(".header").style.backgroundColor = "white";
      document.querySelector(".header").style.color = "black";

      document.querySelector(".description").style.backgroundColor = "white";
      document.querySelector(".description").style.color = "black";
      setDarkMode(false);
    }
  }

  const addNote = (text) => {
      //console.log(text);

      const date = new Date();//daje trenutni datum
      const newNote = {
        id: nanoid(),
        text: text,
        date: date.toLocaleDateString()
      }
      const newNotes = [...notes, newNote];//ovako se push(dodaje novi element u niz) u reactu
      setNotes(newNotes);
  }

  const deleteNote = (id) => {
    //filter vraca array bez elemenata koji ne zadovoljavaju uvjet
    const newNotes = notes.filter((note) => note.id !== id)//svi koji imaju razlicit id od poslanog ce ostat u arrayu
    setNotes(newNotes);
  }

  const updateNote = (id, text) => {
    const date = new Date();//daje trenutni datum
      const updatedNote = {
        id: id,
        text: text,
        date: date.toLocaleDateString()
      }

    const updatedNotes = notes.map((note) => {
        if(note.id === id) {
          return updatedNote
        }
        else{
          return note
        }
      
      })
    setNotes(updatedNotes);

    //console.log({newNotes});
  }

  return(
    <div className="container">
      <Header currentDarkMode={darkMode} handleDarkMode={changeDarkMode}/>
      <Search handleSearchNote={setSearchText}/>
      <NotesList 
        //notes={notes} 
        notes={notes.filter((note) => note.text.toLowerCase().trim().includes(searchText.toLowerCase()))}//kako bi prikaziva samo one Note, u NotesList koje sadrze ono sta je pretrazivano; Na ovaj nacin ne minjam originalni notes array nego ga samo filtriram pri ispisu
        handleAddNote={addNote} 
        handleDeleteNote={deleteNote}
        handleUpdateNote={updateNote}
      />
    </div>
  )
}

export default App;

//cili mozak funckija je u App.js pa te funkcije saljem priko komponenti u te fileove pa se one tamo koriste
//ove funkcije su u App.js ako rade promjene na notes, a ako rade samo na toj komponenti onda su unutar komponente