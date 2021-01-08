import React, {useState} from "react"

function Main() {
    const [link, setLink] = useState("");

    function generateLink() {
        console.log("aaaa")
        setLink(window.location.href + Math.random().toString(36).substring(7));
    }

    return (
        <>
            {link ?
                <a href={link}>{link}</a> :
                <button onClick={generateLink}>Generate link</button>}
        </>
    )
}

export default Main;