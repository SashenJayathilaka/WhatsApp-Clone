import React, { useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core';
import { useState } from 'react';
import AttachFile from '@material-ui/icons/AttachFile';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import { useStateValue } from './StateProvider';
import MoreVert from '@material-ui/icons/MoreVert';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import './Chat.css'
import { useParams } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import db from './firebase';

function Chat() {

    const [input, setInput] = useState("");
    const [speed, setSpeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomName
                    (snapshot.data().name));

            db.collection('rooms')
                .doc(roomId)
                .collection("messages")
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) =>
                    doc.data()))
                );
        }
    }, [roomId])

    useEffect(() => {
        setSpeed(Math.floor(Math.random() * 5000))
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('you type >>>>', input)

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");

    }

    return (
        <div className='chat'>

            <div className='chad_header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${speed}.svg`} />
                <div className='chat__headerInfo'>
                    <h3>{roomName}</h3>
                    <p>Last seen {" "}
                    {new Date(
                        messages[messages.length -1]?.
                        timestamp?.toDate()
                    ).toUTCString()}
                    </p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className='chat__body'>
                {messages.map((message) => (
                    <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'} `}>
                        <span className='chat__name'>{message.name}</span>
                        {message.message}
                        <span className='chat__timestamp'>
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}

            </div>

            <div className='chat__footer'>

                <EmojiEmotionsIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder='Type a message' type='text' />
                    <button onClick={sendMessage} type='submit' className='iconButton'><SendIcon /></button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
}

export default Chat