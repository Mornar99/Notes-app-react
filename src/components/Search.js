const Search = ({handleSearchNote}) => {
    return(
        <div className="search">
            <input onChange={(event) => handleSearchNote(event.target.value)} type="text" className="search-bar" placeholder="Search..."></input>
        </div>
    )
}

export default Search;