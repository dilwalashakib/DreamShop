import MessageBody from "../others/MessageBody";
import ChatUserList from "../others/ChatUserList";
import CustomerSeller from "@/models/CustomerSeller";

const getData = async({ id }) => {
    try {
        const customer = await CustomerSeller.findOne({ myId: id });
        return { customerList: customer?.list}
    } catch(err) {
        return [];
    }
}

export default async function ChatCustomer({ user, currId}) {
    const { customerList } = await getData({ id : user.id});
    // const [addSocketCustomer, setAddSocketCustomer] = useState("");

    // useEffect(() => {
    //     socket?.on("getCustomer", (data) => {
    //         setAddSocketCustomer(data);
    //     })
    // }, [socketMsg]);

    // useEffect(() => {
    //     if(addSocketCustomer) {
    //         setCustomerList([...customerList, addSocketCustomer]);
    //     }
    // }, [addSocketCustomer]);

    return (
        <div className="bg-gray-800 rounded-lg p-1 text-white">
            <div className="max-xs:flex xs:grid grid-cols-7">
                <div className="xs:col-span-2 bg-gray-900 h-[85vh] overflow-auto max-xs:w-[20vw]">
                    <div className="py-3">
                        <h2 className="max-xs:text-xl xs:text-2xl mb-4 text-center">Customer Message</h2>
                        {customerList?.map((item, i) => (
                            <ChatUserList 
                                key={i}
                                id={item?.id?.toString()}
                                name={item?.name}
                                image={item?.image}
                                role={user?.role}
                                currId={currId}
                            />
                        ))}
                    </div>
                </div>

                <div className="xs:col-span-5 max-h-[80vh] max-xs:w-[80vw]">
                    { currId ? (
                        <MessageBody 
                            userId={user?.id} 
                            userName={user?.name}
                            role={user?.role}
                            currId={currId}
                            sellerId={user?.id}
                            customerId={currId}
                        />
                    ) : (
                        <div className="flex justify-center items-center h-[70vh]">
                            <h2 className="text-3xl">Customer Select</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}