import React from "react";

function Message(props) {
    return (
        <>
            <div key={props.i} id="message" className="card">
                <div className="cell large-4">{props.message.text}</div>
                <div className="cell large-2 text-right"><small>{props.message.date}</small></div>
            </div>
        </>
    )
}

export default Message;