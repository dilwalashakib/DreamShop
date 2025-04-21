import jwt from "jsonwebtoken";
import Banner from "@/models/Banner";
import { cookies } from "next/headers";
import Category from "@/models/Category";
import dbConnect from "@/utils/dbConnect";
import ProductModel from "@/models/Product";
import { ToastContainer } from "react-toastify";
import Slider from "@/components/visitor/Slider";
import Footer from "@/components/visitor/Footer";
import Header from "@/components/visitor/Header";
import Product from "@/components/visitor/Product";
import CategorySlider from "@/components/visitor/CategorySlider";

const getProducts = async() => {
  try {
    dbConnect();
    const products = await ProductModel.find({}).limit(16).sort({createdAt: -1});
    const banner = await Banner.aggregate([{ $sample: { size: 3 } }]);   
    const categorys = await Category.find();
    
    return { products, banner, categorys };
  } catch(err) {
    console.log(err.message);
    return {error: "Server Side Error"};
  }
}

const getUserInfo = async() => {
  const cookie = await cookies();
  const info = cookie.get("userInfo");
  if(info?.value) {
    const userInfo = jwt.verify(info.value, process.env.TOKEN_SECRET_KEY);
    return userInfo
  }
}

export default async function Home() {
  const data = await getProducts();
  const products = data?.products;
  const banner = data?.banner;
  const categorys = data?.categorys;
  const user = await getUserInfo();
  
  return (
    <main className="w-full bg-white">
      <Header id="/" />
      <ToastContainer position="top-right" limit={1} />
      <section className="w-full px-8">
        { banner && <Slider image={JSON.stringify(banner)} />}
      </section>

      <section className="max-lg:hidden mt-4 py-4 px-8">
        {categorys?.[0]?.name && <CategorySlider categorys={JSON.stringify(categorys)} />}
      </section>

      <section className="mt-2 py-4 px-8">
        <h2 className="text-black text-4xl text-center mb-4">Featured Products</h2>

        <div className="py-6 sm:grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products?.map((item, i) => (
            <Product
              key={i}
              userId={user?.id}
              productId={item?._id?.toString()}
              title={item?.name}
              price={item?.price}
              rating={item?.rating}
              imgUrl={item?.images[0].url}
              discount={item?.discount}
            />
          ))}
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
