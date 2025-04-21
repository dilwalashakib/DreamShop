import Input from "../others/Input";
import PasswordChangeButton from "./PasswordChangeButton";

export default function ChangePassword({ user }) {
    return (
        <form className="bg-white px-6 py-4 rounded-lg">
            <h2 className='text-center text-3xl text-black'>Change Password</h2>
            <Input
                labelColor="black"
                inputColor="black"
                label="Email"
                name="email"
                type="email"
                defaultValue={user?.email}
                placeholder="type your Email"
            />
            <Input
                labelColor="black"
                inputColor="black"
                label="Old Password"
                name="oldPassword"
                type="password"
                placeholder="type your old password"
            />
            <Input
                labelColor="black"
                inputColor="black"
                label="New Password"
                name="newPassword"
                type="password"
                placeholder="type your new password"
            />
            <PasswordChangeButton role={user?.role} />
        </form>
    )
}
