import React, { useState } from 'react'

export const Auth = ({type} : {type: "signup" | "signin"}) => {
    type SignupInputs = {
        username: string;
        email: string;
        password: string;
    };

    const [postinputs, setPostinputs] = useState<SignupInputs>({
        username: "",
        email: "",
        password: ""
    });

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center flex-col items-center">
            <div className="text-3xl font-extrabold">
                Create an account
            </div>
            <div className="text-slate-200">
                Already have an accout? <a href="/signin" className="text-blue-500 underline">Sign in</a>
            </div>
            <form className="w-1/2 max-w-lg mt-2">
                <Labelledinput label="Username" placeholder="Enter your username" onChange={(e) => {
                    setPostinputs({...postinputs, username: e.target.value})
                }} />
                <Labelledinput label="Email" placeholder="Enter your email" onChange={(e) => {
                    setPostinputs({...postinputs, email: e.target.value})
                }} />
                <Labelledinput type={"password"} label="Password" placeholder="Enter your password" onChange={(e) => {
                    setPostinputs({...postinputs, password: e.target.value})
                }} />
                
                <div className="flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Sign up
                    </button>
                </div>
            </form>
            </div>
        </div>
    )
}



type Props = {
    label: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
};

function Labelledinput({ label, placeholder, onChange, type }: Props) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                {label}
            </label>
            <input onChange={onChange} type={type || "text"} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" placeholder={placeholder} />
        </div>
    )
}