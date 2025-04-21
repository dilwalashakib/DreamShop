"use client";

import { useState } from "react";
import { BsStarFill } from "react-icons/bs";

export default function RatingCreate({ count, rating, setRating }) {
    const [hover, setHover] = useState(0);
    
    const result = [];
    for(let i = 1; i <= count; i++) {
        result[i] = (
            <label key={i} className="cursor-pointer">
                <input 
                    type="radio" 
                    value={rating}
                    onClick={(e) => setRating(i)}
                    hidden
                />
                <BsStarFill 
                    className={`${i <= (hover || rating) ? "text-[#ffc107]" : "text-#e4e5e9]"}`}
                    onMouseEnter={(e) => setHover(i)}
                    onMouseLeave={(e) => setHover(0)}
                />
            </label>
        )
    }

    return (
        <div className="flex gap-1">{result}</div>
    );
}