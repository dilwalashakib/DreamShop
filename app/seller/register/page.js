import Link from 'next/link'
import { ToastContainer } from 'react-toastify';
import Input from '../../../components/others/Input';
import RegisterButton from '@/components/seller/RegisterButton';

export default async function Register() {
    return (
        <form className='flex justify-center items-center h-screen'>
            <div className='bg-slate-900 p-5 w-96 rounded-xl'>
                <h2 className='text-3xl mb-5 text-center'>Seller Register</h2>
                <Input
                    labelColor="white"
                    inputColor="white"
                    label="Name"
                    type="text"
                    name="name"
                />
                <Input
                    labelColor="white"
                    inputColor="white"
                    label="Email"
                    type="email"
                    name="email"
                />
                <Input
                    labelColor="white"
                    inputColor="white"
                    label="Password"
                    type="password"
                    name="password"
                />
                
                <div className='mb-2'>
                    <input type='checkbox' id='checkbox' />
                    <label htmlFor='checkbox'> I agree to privacy policy & terms</label>
                </div>

                <RegisterButton />

                <p className='mt-2'>Already have an account? <Link href="/seller/login" className='text-blue-500 hover:text-blue-200 text-lg'>
                    login
                </Link>
                </p>
            </div>
            <ToastContainer position='bottom-center' limit={1} />
        </form>
    )
}
