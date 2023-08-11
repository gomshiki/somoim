'use client'
import { useAuth } from "../../component/AuthContext"

export default function SingIn() {

    const value = useAuth()

    return(
        <div>
            <h1 className='mb-2 text-lg font-medium text-center'>회원가입</h1>
            <input value={value} className="w-4/5 p-3 my-2 border bg-zinc-100 rounded-lg border-gray-400 bg-gray-50 trasition focus:bg-white hover:bg-white"/>
        </div>
    )
}