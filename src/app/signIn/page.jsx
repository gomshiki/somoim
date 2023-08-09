"use client"
import { useState, useEffect } from "react"
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth"
import { auth } from "../firebase";




export default function SignIn(){

    const [phoneNumber, setphoneNumber] = useState("");
    const [authNumber, setAuthNumber] = useState("");

    // useEffect : 마운트 시 호출되고, phoneNumber가 변경되어 재랜더링 될따만 호출됨
    useEffect(() => {
        if (phoneNumber.length === 10) {
            setphoneNumber(phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
        }
        if (phoneNumber.length === 13) {
            setphoneNumber(phoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
      }, [phoneNumber]);

    const activeEnter = (e)=>{
        if(e.key == "Enter"){
            onSignInSubmit(event);
        }
    }

    const setUpRecaptcha = () =>{
        auth.languageCode = 'ko';
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                onSignInSubmit();
            }
          });
    }

    const handleChange = (e)=>{
        const regex = /^[0-9\b -]{0,13}$/;
        if (regex.test(e.target.value)) {
          setphoneNumber(e.target.value);
        }
    }
    
    
    const onSignInSubmit = (event) =>{
    
        event.preventDefault();
    
        setUpRecaptcha();

        const rawPhoneNumber = '+82' + phoneNumber.replaceAll("-","");
        const appVerifier = window.recaptchaVerifier;

        console.log('rawPhoneNumber',rawPhoneNumber);
        
        signInWithPhoneNumber(auth, rawPhoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            console.log(confirmationResult);
        }).catch((error) => {
            console.log(error);
        });
    }
    


    return(
        <div className="bg-white">
            <div className="flex flex-col items-center justify-center h-screen p-6">
                <div className='w-10/12 mx-auto md:w-96'>
                    <h1 className='mb-2 text-lg font-medium text-center'>번호 인증</h1>
                    <form>
                        <div className="relative">
                            <input type="text" value={phoneNumber} onChange={handleChange} onKeyDown={(e) => activeEnter(e)} placeholder="010-0000-0000" className="float-left w-4/5 p-3 my-2 border bg-zinc-100 rounded-lg border-gray-400 bg-gray-50 trasition focus:bg-white hover:bg-white"/>
                            <button onClick={onSignInSubmit} type="submit" id="sign-in-button" className="w-1/5 p-3 my-2 mb-1 text-xs font-bold text-white border rounded-3xl float-right bg-blue-400">
                                번호요청
                            </button>
                        </div>
                    </form>
                    <form>
                        <input type="text" value={authNumber} onKeyDown={(e) => activeEnter(e)} placeholder="인증번호를 입력하세요" className=" w-full p-3 my-2 border bg-zinc-100 rounded-lg border-gray-400 bg-gray-50 trasition focus:bg-white hover:bg-white"/>
                        <button onClick={onSignInSubmit} type="submit" id="sign-in-button" className=" w-full p-3 my-2 mb-1 text-xs font-bold text-white border rounded-3xl  bg-blue-400">
                            다음
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}