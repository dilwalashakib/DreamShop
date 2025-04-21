import dbConnect from "@/utils/dbConnect";
import MessageBody from "../others/MessageBody";
import ChatUserList from "../others/ChatUserList";
import CustomerSeller from "@/models/CustomerSeller";

const getData = async({ id }) => {
    try {
        dbConnect();
        const seller = await CustomerSeller.findOne({ myId: id });
        return { sellerList: seller?.list}
    } catch(err) {
        return [];
    }
}

export default async function ChatSeller({ user, currId }) {
    const { sellerList } = await getData({ id : user.id});

    return (
        <div className="bg-white rounded-lg p-1 text-black mb-1">
            <div className="max-xs:flex xs:grid xs:grid-cols-7">

                <div className="xs:col-span-2 bg-gray-100 h-[71vh] overflow-auto max-xs:w-[20vw]">
                   <div className="py-3">
                        <h2 className="xs:text-2xl max-xs:text-xl mb-4 text-center">Seller Message</h2>
                        {sellerList?.map((item, i) => (
                            <ChatUserList 
                                key={i}
                                id={item?.id?.toString()}
                                name={item?.name}
                                image={item?.image.url}
                                role={user?.role}
                                currId={currId}
                            />
                        ))}
                   </div>
                </div>

                <div className="xs:col-span-5 h-[71vh] max-xs:w-[80vw] overflow-auto">
                    { currId ? (
                        <MessageBody 
                            userId={user?.id} 
                            userName={user?.name}
                            role={user?.role}
                            currId={currId}
                            customerId={user?.id}
                            sellerId={currId}
                        />
                    ) : (
                        <div className="flex justify-center items-center h-[70vh]">
                            <h2 className="text-3xl">Select Seller</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}