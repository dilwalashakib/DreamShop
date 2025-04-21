import Input from "../others/Input";
import Category from "@/models/Category";
import dbConnect from "@/utils/dbConnect";
import ProductAddButton from "./ProductAddButton";
import { ToastContainer } from "react-toastify";

const getCateogys = async() => {
    try {
        dbConnect();
        const category = await Category.find({});
        return { category };
    } catch(err) {
        return {error: "Server Side Error"}
    }
}

export default async function AddProduct({ userInfo }) {
    const { category } = await getCateogys();

    return (
        <form className="text-lg bg-slate-900 px-6 py-2 rounded-lg">
            <div className="sm:grid grid-cols-2 gap-5">
                <div>
                    <Input
                        labelColor="white"
                        inputColor="white"
                        type='text'
                        name="name"
                        label="Product Name" 
                        placeholder='Product Name'
                    />
                    <Input
                        labelColor="white"
                        inputColor="white"
                        type='number'
                        name="price"
                        label="Price" 
                        placeholder='Price'
                    />
                    <Input
                        labelColor="white"
                        inputColor="white"
                        type='text'
                        name="brand"
                        label="Brand" 
                        placeholder='Brand'
                    />
                </div>

                <div>
                    <div className="mb-4">
                        <label className="text-white text-xl mb-1 block font-semibold">Category</label>
                        <select name='category' className="w-full rounded-lg p-2 outline-hidden bg-gray-700 text-xl text-white">
                            <option value="select-category">Select Category</option>
                            {category?.map((ct) => (
                                <option
                                    key={ct._id} 
                                    value={ct.slug}>
                                    {ct.name}
                                </option>
                            )) }
                        </select>
                    </div>
                    
                    <Input
                        labelColor="white"
                        inputColor="white"
                        type='number'
                        name="stock"
                        label="Stock" 
                        placeholder='Stock'
                    />
                    <Input
                        labelColor="white"
                        inputColor="white"
                        type='number'
                        name="discount" 
                        label="Discount" 
                        placeholder='Discount'
                    />
                </div>
            </div>
            
            <div>
                <label className="text-white font-semibold">Description</label>
                <textarea
                    name="description" 
                    className="w-full h-56 rounded-lg mt-2 outline-hidden p-2 text-xl bg-slate-900 border-2 border-gray-300 text-white"
                    placeholder="type your description..."
                />
            </div>

            <ProductAddButton sellerId={userInfo?.id} shopName={userInfo?.shopInfo?.shopName} />

            <ToastContainer position='top-right' limit={1} />
        </form>
    )
}