"use client"

import moment from "moment";
import { toast } from "react-toastify";
import SendMessege from "./SendMessege";
import { useRouter } from "next/navigation";
import ReceiveMessege from "./ReceiveMessege";
import { AiOutlinePlus } from "react-icons/ai";
import { useContext, useEffect, useRef, useState } from "react";
import { ActiveUserContext } from "@/context/ActiveUserContext";
import { createMessage, getMessages } from "@/actions/chatActions";

export default function MessageBody({ userId, userName, role, currId, sellerId, customerId }) {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState("");
    const { activeUser, socketMsg, socket } = useContext(ActiveUserContext);
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");
    const scrollRef = useRef();

    useEffect(() => {
        const getMsg = async() => {
            const response = await getMessages({
                role,
                customerId,
                sellerId
            });
            if(response?.success) {
                const parseMessages = JSON.parse(response.messages);
                const parseCurrentUser = JSON.parse(response.currentUser);
                
                setCurrentUser(parseCurrentUser)
                setMessages(parseMessages);
            }
        };
        getMsg();
    }, [currId])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    useEffect(() => {
        if(socketMsg?.senderId === currId && socketMsg?.receiverId === userId) {
            setMessages([...messages, socketMsg]);
        } else {
            socketMsg?.senderName && toast.success(`${socketMsg?.senderName} message you !`)
        }
    }, [socketMsg]);

    const msgCreate = async(e) => {
        if(msg) {
            const response = await createMessage({
                senderId: userId,
                senderName: userName,
                message: msg,
                receiverId: currId,
                role
            });

            if(response?.success) {
                const parseMessage = JSON.parse(response.message);
    
                socket?.emit("sendMessage", parseMessage);
                setMessages([...messages, parseMessage]);
                toast.success("Message Send Success !")
                router.refresh();
                setMsg("");
            }
        } else {
            toast.error("Type your message !")
        }
    }

    return (
        <div>
            <div className={`flex gap-1 items-center text-lg py-1 px-4 ${role === "customer" ? "bg-gray-100" : "bg-slate-900 text-white"}`}>
                <div>
                    <img 
                        className="h-12 w-12 object-cover rounded-full" 
                        src={`${currentUser?.image?.url ? currentUser.image.url : "/images/admin.png"}`} 
                    />
                </div>
                <div className="ml-1">
                    <p className="text-xl">
                        {role === "customer" && currentUser?.shopInfo?.shopName}
                        {role === "seller" && currentUser?.name}
                        {role === "admin" && currentUser?.name}
                    </p>
                    {activeUser[currentUser?._id] ? <p className="mt-[-3px] text-green-600">online</p> : <p className="mt-[-3px] text-slate-400">offline</p>}
                </div>
            </div>
            
            <div className={`${role === "customer" ? "h-[52vh]" : "h-[66vh]"} overflow-auto no-scrollbar`}>
                {messages?.map((item, i) => (
                    <div ref={scrollRef} key={i}>
                        {item?.senderId === userId ? (
                            <SendMessege
                                msg={item?.message} 
                                time={moment(item?.createdAt).startOf('min').fromNow()}
                                timeColor={role === "customer" ? "text-black" : "text-white"}
                            />
                        ): (
                            <ReceiveMessege
                                avatarSrc={`${currentUser?.image?.url ? currentUser.image.url : "/images/admin.png"}`}
                                msg={item?.message} 
                                time={moment(item?.createdAt).startOf('min').fromNow()}
                                timeColor={role === "customer" ? "text-black" : "text-white"}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="flex w-full mt-2">
                <div className={`${role === 'seller' || role === 'admin' ? "bg-slate-950 text-white" : "bg-slate-200 text-black"} flex items-center gap-2 w-full pl-2`}>
                    <button className="p-2 rounded-full text-white text-xl bg-slate-600"><AiOutlinePlus /></button>
                    <input
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        className="w-full py-2 px-3 text-lg outline-hidden"
                        placeholder="type messege"
                        type="text"
                    />
                </div>
                <button onClick={msgCreate} className="px-6 text-white bg-blue-600 text-2xl py-2 hover:bg-blue-800 duration-500 cursor-pointer">Send</button>
            </div>
        </div>
    )
}