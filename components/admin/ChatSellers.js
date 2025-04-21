import Seller from "@/models/Seller";
import dbConnect from "@/utils/dbConnect";
import MessageBody from "../others/MessageBody";
import ChatUserList from "../others/ChatUserList";

const getData = async() => {
    try {
        dbConnect();
        const sellers = await Seller.find({}).sort({updatedAt: -1});
        return sellers;
    } catch(err) {
        return [];
    }
}

export default async function ChatSellers({user, currId}) { 
    const sellers = await getData();

    return (
        <div className="bg-gray-800 rounded-lg p-1 text-white max-md:mt-18">
            <div className="max-xs:flex xs:grid grid-cols-7">

                <div className="max-xs:w-[20vw] col-span-2 bg-gray-900 h-[85vh] overflow-auto">
                   <div className="py-3">
                        <h2 className="max-xs:text-xl xs:text-2xl mb-4 text-center">Seller Message</h2>
                        {sellers?.map((item, i) => (
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

                <div className="max-xs:w-[80vw] col-span-5 h-[85vh]">
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