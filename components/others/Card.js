export default function Card({bgColor, textColor, textSize, count, text, icon }) {
    return (
        <div className={`flex justify-between items-center shadow-xs shadow-yellow-300 bg-${bgColor} py-6 px-5 rounded-md text-${textSize} mb-2`}>
            <div className={`text-${textColor}`}>
                <h2 className="font-semibold">{count}</h2>
                <p>{text}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-700 hover:bg-blue-500 duration-500">
                { icon }
            </div>
        </div>
    )
}