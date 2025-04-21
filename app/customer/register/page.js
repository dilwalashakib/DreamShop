import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import Input from '@/components/others/Input';
import Footer from '@/components/visitor/Footer';
import Header from '@/components/visitor/Header';
import RegisterButton from '@/components/customer/RegisterButton';

export default async function Register() {
    return (
        <div>
            <ToastContainer position='top-center' limit={1} />
        
            <main className="bg-gray-300">
                <Header />
                <form className="flex justify-center items-center gap-4 p-4 w-full">
                    <div className="md:w-[75%] bg-white rounded-lg sm:flex gap-1">
                        <div className="px-8 sm:w-6/12">
                            <h2 className="text-3xl py-4 text-black text-center">Register Account</h2>
                            <Input
                                labelColor="black"
                                inputColor="black"
                                label="Name"
                                name="name"
                                type="text"
                                placeholder="type your name"
                            />
                            <Input
                                labelColor="black"
                                inputColor="black"
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="type your email"
                            />
                            <Input
                                labelColor="black"
                                inputColor="black"
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="type your password"
                            />
                            <div className="text-xl text-black">
                                <input type='checkbox' id='checkbox' />
                                <label htmlFor='checkbox'> I agree to privacy policy & terms</label>
                            </div>

                            <RegisterButton />

                            <p className="text-black text-lg py-2 font-semibold">Already have an account? <Link href="/customer/login" className="text-blue-800 text-xl">login</Link>
                            </p>
                        </div>

                        <div className="max-sm:hidden text-black sm:w-6/12">
                            <img
                                className="h-full w-full object-cover"
                                src="/images/register.jpeg" 
                                alt="image" 
                            />
                        </div>
                    </div>
                </form>
                
                <Footer />
            </main>
        </div>
    )
}
