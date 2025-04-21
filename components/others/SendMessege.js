export default function SendMessege({ imgSrc, msg, time, timeColor }) {
    return (
        <div className="flex flex-col items-end w-full text-white mt-2">
            {imgSrc && <img className="w-[300px] h-[300px] object-cover" src={imgSrc} alt="image" />}
            {msg && <p className="bg-blue-700 py-1 px-3 rounded-l-xl text-xl max-w-[80%]">{msg}</p>}
            
            <p className={`${timeColor} text-sm`}>{time}</p>
        </div>
    )
}
