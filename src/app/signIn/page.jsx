"use client"
import { useState } from "react"
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth"
import { auth } from "../firebase";

const setUpRecaptcha = () =>{
    auth.languageCode = 'ko';
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        }
      });
}


const onSignInSubmit = (event) =>{
    event.preventDefault();
    setUpRecaptcha();
    const phoneNumber = '+8201034592299';
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
    }).catch((error) => {
        console.log(error);
    });
}




export default function SignIn(){

    const [phonenumber, setPhonenumber] = useState("");

    return(
        <div className="bg-white">
            <div className="flex flex-col items-center justify-center h-screen p-6">
                <div className='w-10/12 mx-auto md:w-96'>
                    <h1 className='mb-2 text-lg font-medium text-center'>번호 인증</h1>
                    <form>
                        <div className="relative">
                        <input id="phone" type="text" value={phonenumber} onChange={e=>setPhonenumber(e.target.value)} placeholder="전화번호 입력" className="float-left w-4/5 p-3 my-2 border bg-zinc-100 rounded-lg border-gray-400 bg-gray-50 trasition focus:bg-white hover:bg-white"/>
                            <button onClick={onSignInSubmit} type="submit" id="sign-in-button" className="w-1/5 p-3 my-2 mb-1 text-xs font-bold text-white border rounded-3xl float-right bg-blue-400">
                                번호요청
                            </button>
                        </div>
                    </form>
                    <form>
            

                    </form>
                </div>
            </div>
        </div>
    )
}