import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import './SidebarChat.css';
import { useEffect } from 'react';
import db from './firebase';
import { Link } from 'react-router-dom';

function SidebarChat({ id, name, addNewChat }) {

    const [speed, setSpeed] = useState("");
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection
            ('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot =>
                setMessages(snapshot.docs.map((doc) => 
                doc.data()))
            ))
        }
    }, [id])

    useEffect(() => {
        setSpeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Please Enter name for Chat room");

        if (roomName) {
            // do some clever database stuff
            db.collection('rooms').add({
                name: roomName,
            });
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${speed}.svg`} />
                <div className='sidebarChat__info'>
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className='sidebarChat'>
            <h1>Add new Chat</h1>
        </div>
    );
}

export default SidebarChat