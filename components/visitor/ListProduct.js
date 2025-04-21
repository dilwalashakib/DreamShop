'use client';

export default function ListProduct({  imgUrl, title, price, category }) {

    return (
        <div className="flex items-center gap-2 p-2 border-2 border-gray-200 shadow-xl shadow-gray-200 mb-2 rounded-lg cursor-pointer hover:ml-[-12px] duration-500 w-full bg-white">
            <img
                className="w-28 h-[15vh] rounded-lg object-cover"
                src={imgUrl}
                alt="Product"
            />
            
            <div>
                <h3 className="text-lg text-green-700 hover:text-blue-700 duration-500">{title?.slice(0, 38)}</h3>
                <p className="text-gray-800 text-lg">{category}</p>
                <p className="font-semibold text-gray-800">${price}</p>
            </div>
        </div>
    )
}