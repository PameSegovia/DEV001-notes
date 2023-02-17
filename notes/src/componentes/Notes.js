import '../hojas-de-estilo/wallStyle.css'


function NotesForm(props){

    return(
        <div className="note-conteiner">
            <form 
        className="note-form">
            <div className="note-info">
                <p className="note-title">Titulo</p>
                <p className="note-time">Hora</p>
            </div>
            <textarea
            className="note-textarea"
            type="text"
            placeholder="Escribe una Nota"
            name="texto"
            />
            <button className="note-btn">
                Agregar Nota
            </button>
            </form>
        </div>
    );
    }

export default NotesForm;
