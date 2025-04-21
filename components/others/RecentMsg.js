import Image from "next/image";

export default function RecentMsg({ image, name, time }) {
    return (
        <div className="bg-gray-900 p-2 mt-2 rounded-lg">
            <div className="flex">
                <div className="p-2">
                    <Image
                        className="rounded-full w-[40px] h-[40px]"
                        src={image}
                        width={50}
                        height={50}
                        alt="Dream Shop"
                    />
                </div>
                <div className="w-10/12">
                    <p>{name}</p>
                    <p className="text-gray-300 mb-1">{time}</p>
                    <input 
                        className="py-1 px-2 rounded-lg outline-hidden bg-gray-700 w-full"
                        type="text" 
                        placeholder="messge type..." 
                    />
                </div>
            </div>
        </div>
    )
}