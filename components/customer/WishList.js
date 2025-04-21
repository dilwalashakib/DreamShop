import Product from "../visitor/Product";
import dbConnect from "@/utils/dbConnect";
import Wishlist from "@/models/Wishlist";

const getWishlists = async({ id }) => {
    try {
        dbConnect();
        const wishlist = await Wishlist.find({ userId: id }).populate("productId")
        return wishlist
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}

export default async function WishList({ user }) {
    const wishlist = await getWishlists({id: user.id});
    return (
        <div className="sm:grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-white px-2 pb-4 pt-1 rounded-lg mb-3">
            {wishlist?.length > 0 && wishlist?.map((item, i) => (
                <Product
                    key={i}
                    userId={user?.id}
                    wishlistId={item?._id?.toString()}
                    productId={item?.productId?._id?.toString()}
                    title={item?.productId.name}
                    price={item?.productId.price}
                    rating={item?.productId.rating}
                    imgUrl={item?.productId.images[0]}
                    discount={item?.productId.discount}
                />
            ))}
        </div>
    )
}