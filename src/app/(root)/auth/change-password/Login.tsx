'use client'
import { useReducer, FormEvent } from 'react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { IReducerAction, IChangePassword } from '@/interfaces'
import { Button } from '@/components/ui/button'
import LockImg from '@/assets/lock1.svg'
import { apiChangePasswordAdmim } from '@/services/AuthService'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'
import useMutate from '@/hooks/useMutation'
import { toast } from 'react-toastify'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const initialState: IChangePassword = {
    email: '',
    old_password: '',
    password: '',
    confirm_password: '',
}

const ChangePasswordComp = () => {
    const [user, dispatch] = useReducer((state: IChangePassword, action: IReducerAction<IChangePassword>) => {
        return { ...state, [action.type]: action.payload }
    }, initialState)
    const router = useRouter()

    const changePasswordMutation = useMutate<IChangePassword, unknown>(
        apiChangePasswordAdmim,
        {
          onSuccess: (data: unknown) => {
              console.log("data", data)
              toast.success("Password reset Successful.")
              return router.push('/auth/login')
          },
          showErrorMessage: true,
        }
    )
    
    const handleChangePassword = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        changePasswordMutation.mutate(user)
    }
      
  return (

    <div>
        {changePasswordMutation.isPending && <Loader />}
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
                        <h1 className="mb-3 text-2xl font-bold text-center text-gray-800 md:text-3xl md:text-left font-argentinum">Change Password</h1>
                        <form onSubmit={handleChangePassword} className="flex flex-col gap-5 mt-4">
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="email">Email</Label>
                                <Input value={user?.email} onChange={(e) => dispatch({ type: "email", payload: e.target.value})} name='email' id='email' type="email" />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="old_password">Old Password</Label>
                                <Input value={user?.old_password} onChange={(e) => dispatch({ type: "old_password", payload: e.target.value})} name='old_password' id='old_password' type="password" />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="password">New Password</Label>
                                <Input value={user?.password} onChange={(e) => dispatch({ type: "password", payload: e.target.value})} name='password' id='password' type="password" />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="confirm_password">Confirm Password</Label>
                                <Input value={user?.confirm_password} onChange={(e) => dispatch({ type: "confirm_password", payload: e.target.value})} name='confirm_password' id='confirm_password' type="password" />
                            </div>
                            <Button type='submit'>Submit</Button>
                            <Link href="/auth/login" className="text-xs hover:underline">
                                Go back to Login
                            </Link>
                        </form>
                    </div>
                </div>
            </section>
           
        </div>
    </div>
  )
}

export default ChangePasswordComp