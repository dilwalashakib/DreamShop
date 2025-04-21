import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

export default function Rating({ ratingNum, showNum }) {
    return (
        <div className="flex items-center gap-1 py-2 text-[#ffb829] font-semibold">
            { ratingNum >= 0.5 && ratingNum < 1 ? <BsStarHalf /> : ratingNum > 0.5 ? <BsStarFill /> : <BsStar />}

            { ratingNum >= 1.1 && ratingNum < 2 ? <BsStarHalf /> : ratingNum > 1.5 ? <BsStarFill /> : <BsStar />}

            { ratingNum >= 2.1 && ratingNum < 3 ? <BsStarHalf /> : ratingNum > 2.5 ? <BsStarFill /> : <BsStar />}

            { ratingNum >= 3.1 && ratingNum < 4 ? <BsStarHalf /> : ratingNum > 3.5 ? <BsStarFill /> : <BsStar />}

            { ratingNum >= 4.1 && ratingNum < 5 ? <BsStarHalf /> : ratingNum > 4.5 ? <BsStarFill /> : <BsStar />}
            

            {showNum && (
                <span style={{color: "rgb(49, 47, 47)", fontSize: "1.2rem"}}> 
                    <b> • </b> {ratingNum}
                </span>
            )}
        </div>
    )
}