export default function SearchIcon({ click }) {
    // текст этого инпута должен отображаться в инпуте на главной
    // сделать это нужно через стейт
    return(
        <div className='header-controls-pic header-controls-search' data-id='search-expander' onClick={click}></div>
    );
}
