const Header = ({currentDarkMode,handleDarkMode}) => {
    //console.log(currentDarkMode)
    return(
        <div className="header">
            <h1 className="title">Notes</h1>
            <div className="button-container">
                <button onClick={() => handleDarkMode(!currentDarkMode)} className="dark-button">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.53 10.53a7 7 0 01-9.058-9.058A7.003 7.003 0 008 15a7.002 7.002 0 006.53-4.47z" clip-rule="evenodd"></path></svg>
                </button>
                <span className="description">Dark mode</span>
            </div>
        </div>
    )
}

export default Header;
//kod handleDarkMode saljem darkMode koji zelim(novi) tako da saljem trenutni pa ga negiram u novi