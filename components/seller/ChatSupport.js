"use client"

import moment from "moment";
import { toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
import SendMessege from "../others/SendMessege";
import ReceiveMessege from "../others/ReceiveMessege";
import { useContext, useEffect, useRef, useState } from "react";
import { ActiveUserContext } from "@/context/ActiveUserContext";
import { createSupportMessage, getSupportId, getSupportMessage } from "@/actions/chatActions";

export default function ChatSupport({ user }) {
    const { activeUser, socketMsg, socket } = useContext(ActiveUserContext);
    const [supportId, setSupportId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");
    const scrollRef = useRef();

    useEffect(() => {
        if(!supportId) {
            const getSupportData = async() => {
                const response = await getSupportId();
                setSupportId(response?.supportId);
            }
            getSupportData();
        }
    }, [supportId])

    useEffect(() => {
        const getMsg = async() => {
            const response = await getSupportMessage({
                myId: user?.id
            });
            if(response?.success) {
                const parseMessages = JSON.parse(response?.messages);
                setMessages(parseMessages);
            }
        };
        getMsg();
    }, [])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    useEffect(() => {
        if(socketMsg?.senderId === supportId && socketMsg?.receiverId === user?.id) {
            setMessages([...messages, socketMsg]);
        }
    }, [socketMsg]);

    const msgCreate = async(e) => {
        if(msg) {
            const response = await createSupportMessage({
                senderId: user?.id,
                senderName: user?.name,
                message: msg,
                receiverId: supportId,
            });

            if(response?.success) {
                const parseMessage = JSON.parse(response.message);
    
                socket?.emit("sendMessage", parseMessage);
                setMessages([...messages, parseMessage]);
                setMsg("");
                toast.success("Message Send Success!")
            }
        } else {
            toast.error("Type your message !")
        }
    }

    return (
        <div>
            <div className="flex gap-1 items-center text-lg py-1 bg-slate-900 text-white pl-2">
                <div><img className="h-12 w-12 object-cover rounded-full" src="/images/admin.png" /></div>
                <div className="ml-1">
                    <p className="text-xl">Support</p>
                    {activeUser[supportId] ? <p className="mt-[-3px] text-green-600">online</p> : <p className="mt-[-3px] text-slate-400">offline</p>}
                </div>
            </div>
        
            <div className={"h-[65vh] no-scrollbar overflow-auto bg-slate-950 mt-3"}>
                {messages?.map((item, i) => (
                    <div ref={scrollRef} key={i}>
                        {item?.senderId === user?.id ? (
                            <SendMessege
                                msg={item?.message} 
                                time={moment(item?.createdAt).startOf('min').fromNow()}
                                timeColor="text-white"
                            />
                        ): (
                            <ReceiveMessege
                                avatarSrc="/images/admin.png"
                                msg={item?.message} 
                                time={moment(item?.createdAt).startOf('min').fromNow()}
                                timeColor="text-white"
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="flex w-full mt-2 bg-slate-700">
                <div className="flex items-center gap-2 w-full pl-2">
                    <button className="p-2 rounded-full text-black text-xl bg-slate-400"><AiOutlinePlus /></button>
                    <input
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        className="w-full py-3 px-3 text-lg outline-hidden text-white bg-slate-900"
                        placeholder="type messege"
                        type="text"
                    />
                </div>
                <button onClick={msgCreate} className="px-6 text-white bg-blue-700 text-2xl py-2 hover:bg-green-600 duration-500">Send</button>
            </div>
        </div>
    )
}