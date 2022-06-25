import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import React, { useEffect } from 'react'
import './Sidebar.css'
import SidebarChat from './SidebarChat';
import { useState } from 'react';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {


    const [rooms, setRooms] = useState([]);
    const [{ user }, dispath] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(Snapshot => (
            setRooms(Snapshot.docs.map(doc =>
            ({
                id: doc.id,
                data: doc.data(),
            })
            ))
        )
        );
        return () => {
            unsubscribe();
        }
    }, []);


    return (
        <div className='sidebar'>

            <div className='sidebar_header'>
                <Avatar src={user?.photoURL}/>
                <div className='sidebar__headerRight'>

                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>

                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>
            </div>

            <div className='sidebar_search'>
                <div className='sidebar_searchContainer'>
                    <SearchOutlinedIcon />
                    <input placeholder='Search or start new chat' type='text' />
                </div>
            </div>

            <div className='sidebar_chat'>
                <SidebarChat addNewChat />
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    );
}

export default Sidebar