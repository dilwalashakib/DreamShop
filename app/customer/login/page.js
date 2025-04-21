import Link from 'next/link';
import Input from '@/components/others/Input';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/visitor/Header';
import LoginButton from '@/components/customer/LoginButton';

export default function Login() {
    return (
        <div>
            <ToastContainer position='top-center' limit={1} />
        
            <main className="bg-gray-200 min-h-[100vh]">
                <Header />
                <form className="flex justify-center items-center gap-4 p-4 w-full">
                    <div className="px-8 sm:w-5/12 bg-white rounded-md">
                        <h2 className="text-3xl py-4 text-black text-center">Login Account</h2>
                        
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

                        <LoginButton />

                        <p className="text-black text-lg py-2 font-semibold">Already have an account? <Link href="/customer/register" className="text-blue-800 text-xl">Register</Link>
                        </p>
                    </div>
                </form>
            </main>
        </div>
    )
}
