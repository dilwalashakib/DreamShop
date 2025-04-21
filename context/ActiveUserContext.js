'use client'

import io from "socket.io-client";
import { createContext, useEffect, useRef, useState } from "react";

// create cart context
export const ActiveUserContext = createContext();

const ActiveUserProvider = ({ children, userInfo }) => {  
    const [activeUser, setActiveUser] = useState({});
    const [socketMsg, setSocketMsg] = useState("");
    const socketRef = useRef(null);

    useEffect(() => {
        if(userInfo?.id) {
            if(!socketRef.current) {
                socketRef.current = io(process.env.SERVER, {
                    query: {
                        userId: userInfo.id
                    }
                });
            }

            socketRef.current.on('connect', () => {
                socketRef.current.on("getUsers", (users) => {
                    setActiveUser(users);
                });
                socketRef.current.on("getMessage", (msg) => {
                    setSocketMsg(msg);
                });      
            });
        }
    }, [userInfo]);

    return (
        <ActiveUserContext.Provider value={{ 
            activeUser,
            socketMsg,
            socket: socketRef?.current
        }}>        
            {children}
        </ActiveUserContext.Provider>
    )
}

export default ActiveUserProvider;