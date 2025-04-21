import Image from 'next/image';
import Input from '@/components/others/Input';
import { ToastContainer } from 'react-toastify';
import logo from "../../../public/images/logo.svg";
import LoginButton from '@/components/admin/LoginButton';

export default function AdminLogin() {
    return (
        <form className='flex justify-center items-center h-screen'>
            <div className='w-96 bg-slate-900 p-6 rounded-lg'>
                <div className='flex justify-center mb-4'>
                    <Image 
                        src={logo}
                        width={240}
                        height={80}
                        alt="Dream Shop"
                    />
                </div>
                
                <Input
                    labelColor="white"
                    inputColor="white"
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="type your email"
                />
                <Input
                    labelColor="white"
                    inputColor="white"
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="type your password"
                />
                
                <LoginButton />            
            </div>
            <ToastContainer position='bottom-center' limit={1} />
        </form>
    )
}