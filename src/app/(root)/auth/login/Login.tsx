'use client'
import { useReducer, FormEvent } from 'react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { IReducerAction, IUserLogin } from '@/interfaces'
import { Button } from '@/components/ui/button'
import LockImg from '@/assets/lock1.svg'
import { apiLogin } from '@/services/AuthService'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'
import useMutate from '@/hooks/useMutation'
import { toast } from 'react-toastify'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const initialState: IUserLogin = {
    email: '',
    password: '',
    remember: false,
}

const LoginComp = () => {
    const [user, dispatch] = useReducer((state: IUserLogin, action: IReducerAction<IUserLogin>) => {
        return { ...state, [action.type]: action.payload }
    }, initialState)
    const router = useRouter()

    const loginMutation = useMutate<IUserLogin, unknown>(
        apiLogin,
        {
          onSuccess: (data: unknown) => {
              console.log("data", data)
              toast.success("Logged in Successfully.")
              return router.push('/admin')
          },
          showErrorMessage: true,
        }
    )
    
    const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        loginMutation.mutate(user)
    }
      
  return (

    <div>
        {loginMutation.isPending && <Loader />}
        <div className="flex flex-col items-center justify-center min-h-screen pb-12 division">
            <section className="w-full section">
                <div className="flex flex-col w-full gap-4 md:flex-row md:gap-12">
                    <div className="flex-col-reverse items-center justify-center flex-1 hidden text-center md:flex md:items-start md:flex-col md:justify-between md:text-left">
                        <div>
                            <p className="md:text-4xl">
                                <span className="font-bold text-primary">Welcome to </span>
                                <span className="font-bold text-gray-800 font-argentinum">LunasDiary</span>
                            </p>
                            <p className='hidden md:block'>Sign in to manage your blog posts, engage with your audience, and keep the content flowing.</p>
                        </div>
                        {/* <h1 className="mb-3 text-4xl font-bold text-center text-gray-800 font-argentinum md:hidden">Sign In</h1> */}
                        <Image src={LockImg} alt="" className="w-full h-40 mt-5 md:w-full md:h-96" /> 
                    </div>
                    <div className="flex-1 flex flex-col p-4 md:p-10 md:bg-[#F2F2F2] rounded-xl shadow-md">
                        <h1 className="mb-3 text-2xl font-bold text-center text-gray-800 md:text-3xl md:text-left font-argentinum">Login</h1>
                        <form onSubmit={handleLogin} className="flex flex-col gap-5 mt-4">
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="email">Email</Label>
                                <Input value={user?.email} onChange={(e) => dispatch({ type: "email", payload: e.target.value})} name='email' id='email' type="email" />
                            </div>
                           
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="password">Password</Label>
                                <Input value={user?.password} onChange={(e) => dispatch({ type: "password", payload: e.target.value})} name='password' id='password' type="password" />
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <Input className='w-4 h-4 cursor-pointer' checked={!!user?.remember} onChange={(e) => dispatch({ type: "remember", payload:  e.target.checked })} name='remeber' id='remeber' type="checkbox" />
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

export default LoginComp