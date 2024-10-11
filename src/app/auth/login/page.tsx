'use client'
import { useReducer, FormEvent, useEffect } from 'react'
import Link from 'next/link'
import React from 'react'
// import LockImg from '@/assets/lock.png'/
import Image from 'next/image'
import { ILoginReducerAction, IUserLogin } from '@/interfaces'
// import { useSession, signIn, signOut } from "next-auth/react"
// import Loader from '@/components/Loader';
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import LockImg from '@/assets/lock1.svg'





const initialState: IUserLogin = {
    email: '',
    password: ''
}

const Login = () => {
    const [user, dispatch] = useReducer((state: IUserLogin, action: ILoginReducerAction) => {
        return { ...state, [action.type]: action.payload }
    }, initialState)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const error = params.get('error')
        if (error) {
            toast.error(error)
        }
    }, [])

    

    const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
    }

  return (

    <div>
        {/* {loading && <Loader modalOpen={true} />} */}
        {/* <Header /> */}
        <div className="flex flex-col items-center justify-center min-h-screen pb-12">
            <section className="w-full pt-20 section md:pt-28">
                <div className="flex flex-col w-full gap-4 md:flex-row md:gap-12">
                    <div className="flex flex-col-reverse items-center justify-center flex-1 text-center md:items-start md:flex-col md:justify-between md:text-left">
                        <div>
                            <p className="md:text-4xl">
                                <span className="font-bold text-primary">Welcome to </span>
                                <span className="font-bold text-gray-800 font-argentinum">WriterHolic</span>
                            </p>
                            <p className='hidden md:block'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam eveniet tempore ab sed enim, iusto vel corrupti, eum cumque aperiam, veniam laudantium voluptate praesentium! Doloremque perferendis saepe perspiciatis ipsam quo! </p>
                        </div>
                        {/* <h1 className="mb-3 text-4xl font-bold text-center text-gray-800 font-argentinum md:hidden">Sign In</h1> */}
                        <Image src={LockImg} alt="" className="w-32 h-24 mt-5 md:w-full md:h-96" /> 
                    </div>
                    <div className="flex-1 flex flex-col p-4 md:p-10 bg-[#F2F2F2] rounded-xl shadow-md">
                        <h1 className="mb-3 text-3xl font-bold text-gray-800 font-argentinum">Login</h1>
                        <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="email" className="text-xs font-semibold text-gray-500">Username or Email</label>
                                <input value={user?.email} onChange={(e) => dispatch({ type: "email", payload: e.target.value})} name='email' id='email' type="email" placeholder="Email" className="px-4 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:opacity-35 placeholder:text-xs" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="password" className="text-xs font-semibold text-gray-500">Password</label>
                                <input value={user?.password} onChange={(e) => dispatch({ type: "password", payload: e.target.value})} name='password' id='password' type="password" placeholder="Password" className="px-4 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:opacity-35 placeholder:text-xs" />
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className='w-4 h-4 bg-white border border-1'></span>
                                <span className='text-xs text-black/70'>Remember me</span>
                            </div>
                            <Button type='submit'>Login</Button>
                            <Link href="/register" className="text-xs hover:underline">
                                Dont have an account? Register
                            </Link>
                        </form>
                    </div>
                </div>
            </section>
           
        </div>
    </div>
  )
}

export default Login