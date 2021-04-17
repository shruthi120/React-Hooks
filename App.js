import React, { useState, useEffect } from "react";
import axios from 'axios';

function Displayname() {
    const [Id, setId] = useState(0);
    const [count, setCount] = useState(0);
    const [Show, setShow] = useState(true);
    const [user, setuser] = useState({});
    const [ShowIdClick, setShowIdClick] = useState(0);

    const handleId = () => {
        setShowIdClick(Id)
    }
    const addNameToList = () => {
        setShow(!Show);
    };
    const tick = () => {
        setCount(count + 1);
    }
    useEffect(() => {
        console.log("useEffect called");
        const interval = setInterval(tick, 1000)
        return () => {
            clearInterval(interval)
        }
    });

    useEffect(() => {
        axios.get(`http://jsonplaceholder.typicode.com/users/${ShowIdClick}`)
            .then(response => {
                console.log(response)
                setuser(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [ShowIdClick])
    return (
        <div>
            <h1>ADD NAME</h1>
            <div id="container">
                <input
                    type="text"
                    value={Id}
                    onChange={(event) => setId(event.target.value)}
                />
                <button onClick={() => handleId()}>Add Name</button>
            </div>
            <div id="type">
                <button onClick={() => addNameToList()}>Show</button>
            </div>
            {Show &&
                <div>
                    <h1> Hello {user.name}!</h1>
                    <p>Count : {count}</p>
                    <h2>-----------------</h2>


                </div>
            }
            <div>
                <h2><u>Display Names</u></h2>
                <div>

                    {user.name}
                    <br />
                    {user.username}


                </div>
            </div>

        </div >
    );
}
export default Displayname;

