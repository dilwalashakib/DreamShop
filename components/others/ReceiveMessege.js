export default function ReceiveMessege({ imgSrc, avatarSrc, msg, time, timeColor }) {
    return (
        <div className="mb-1 mt-2 ml-1">
            <div className="flex gap-1.5 items-center w-[80%]">
                <img className="h-8 w-8 object-cover rounded-full" src={avatarSrc} alt="avatar" />
                { imgSrc && <img className="w-[300px] h-[300px] object-cover" src={imgSrc}
                alt="imageMessege" /> }
                { msg && <p className="bg-green-800 py-1 px-3 rounded-md text-white text-xl">{msg}</p>}
            </div> 
            <p className={`${timeColor} text-sm ml-14`}>{time}</p>
        </div>
    )
}
