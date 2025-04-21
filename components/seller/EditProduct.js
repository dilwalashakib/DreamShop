import { ToastContainer } from "react-toastify"
import Input from "../others/Input";
import EditProductButton from './EditProductButton';
import Category from '@/models/Category';
import Product from '@/models/Product';
import dbConnect from '@/utils/dbConnect';

// GET Product By Id
const getData = async(productId) => {
    try {
        dbConnect();
        const category = await Category.find({});
        const product = await Product.findOne({_id: productId})
        return { 
            product: JSON.stringify(product), 
            category 
        }
    } catch(err) {
        return {error: "Server Side Error"}
    }
}

export default async function EditProduct({ id }) {
    const data = await getData(id);
    const product = data?.product && JSON.parse(data.product);
    const category = data?.category;

    return (
        <form className="text-lg bg-slate-900 p-3 rounded-lg">
            <div className="sm:grid grid-cols-2 gap-5">
                <div>
                    <Input
                        defaultValue={product?.name}
                        name="name"
                        labelColor="white"
                        inputColor="white"
                        type='text'
                        label="Product Name" 
                        placeholder='Product Name'
                    />
                    <Input
                        defaultValue={product?.price}
                        name='price'
                        labelColor="white"
                        inputColor="white"
                        type='number'
                        label="Price" 
                        placeholder='Price'
                    />
                    <Input
                        defaultValue={product?.brand}
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
                        <select 
                            defaultValue={product?.category} 
                            name='category' 
                            className="w-full rounded-lg p-2 outline-hidden text-xl text-white bg-slate-700">
                            {category?.map((ct) => (
                                <option
                                    key={ct._id} 
                                    value={ct.slug}>
                                    {ct.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <Input
                        defaultValue={product?.stock}
                        labelColor="white"
                        inputColor="white"
                        type='number'
                        name="stock"
                        label="Stock" 
                        placeholder='Stock'
                    />
                    <Input
                        defaultValue={product?.discount}
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
                    defaultValue={product?.description}
                    name="description" 
                    className="w-full min-h-56 rounded-lg mt-2 outline-hidden p-2 text-xl bg-gray-900 text-white border-2 border-gray-300"
                    placeholder="type your description..."
                />
            </div>

            <EditProductButton 
                images={product?.images}
                productId={id}
            />     

            <ToastContainer position='top-right' limit={1} />
        </form>
    )
}