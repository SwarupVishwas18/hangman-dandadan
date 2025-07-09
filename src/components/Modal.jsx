function Modal({ msg, path }) {
    return (
        <div className="modal-ctr">
            <div className="modal">
                <h2 className="msg">{msg}</h2>
                <div className="btns">
                    <a href="/">Go to home</a>
                    <a href={`\\hangman-dandadan\\${path}`}>Try Again</a>
                </div>
            </div>
        </div>
    )
}

export default Modal