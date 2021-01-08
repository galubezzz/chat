import React, {useEffect, useState, useRef} from "react";
import Message from "./Message";
import Moment from "react-moment"

function Room(props) {
    const [message, setMessage] = useState({});
    const [messages, setMessages] = useState([]);
    const textField = useRef();
    const [chatSocket, setChatSocket] = useState();

    function changeMessage(event) {
        setMessage({text: event.target.value});
    }

    function submitMessage() {
        chatSocket.send(JSON.stringify({
            'message': message
        }));
        textField.current.value = "";
    }

    function getOnmessage(messages) {
        return (e) => {
              let data = JSON.parse(e.data);
              // debugger
                let incoming_message = {text: data.message.text, date: data.utc_time};
                // message.date = (message.date).local().format('YYYY-MM-DD HH:mm:ss');
                console.log(messages);
                setMessages([...messages, incoming_message])
        }
        }

    useEffect(() => {
        const roomName = props.location.pathname.substr(1);

        let socketPath = 'ws://127.0.0.1:8000/ws/'
            + roomName + '/';
        console.log(socketPath);
        let webSocket = new WebSocket(socketPath);

        webSocket.onmessage = getOnmessage(messages)

        webSocket.onclose = (e) => {
            console.error('Chat socket closed unexpectedly');
        }

        setChatSocket(webSocket)
    }, [])

    useEffect(()=>{
        if (chatSocket) {
            chatSocket.onmessage = getOnmessage(messages)
        }
    }, [chatSocket, messages])

    return (
        <>
            {messages ?
                messages.map((message, i) => {
                    return <Message i={i} message={message}/>;
                }) : null
            }
            <textarea ref={textField} id="chat-message-input" type="text" cols="100" onChange={changeMessage}/><br/>
            <input id="chat-message-submit" type="button" className="button" value="Send" onClick={submitMessage}/>

        </>
    )
}

export default Room