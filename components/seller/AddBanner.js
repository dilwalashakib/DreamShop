import Banner from "@/models/Banner";
import dbConnect from "@/utils/dbConnect";
import BannerButton from "./BannerButton";

const getBannerById = async({ id }) => {
    try {
        dbConnect();
        const banner = await Banner.findOne({productId: id});
        return { url: banner?.url }
    } catch(err) {
        return { error: "Server Side Error !"}
    }
}

export default async function AddBanner({ id }) {
    const { url } = await getBannerById({ id });

    return (
        <form className="text-lg bg-slate-900 p-2 mr-1 rounded-lg">
            <div>
                <h2 className="text-white text-3xl text-center">Add Banner</h2>

                <BannerButton url={url} id={id} />
            </div>
        </form>
    )
}