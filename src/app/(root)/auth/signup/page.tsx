// import { useState, useReducer, FormEvent } from 'react'
// import { useRouter } from 'next/dist/client/router'
// import Button from '@/components/Button'
// import Header from '@/components/Header'
// import Link from 'next/link'
// import React from 'react'
// import RegisterImg from '@/assets/register.png'
// import Image from 'next/image'
// import { IRegistereducerAction, IUserRegister } from '@/interfaces'
// import Loader from '@/components/Loader'
// import { toast } from 'react-toastify'



// const initialState: IUserRegister = {
//     email: '',
//     password: '',
//     username: '',
//     confirm_password:'',
//     access_code: ''
// }

// const Register = () => {
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState('')
//     const [success, setSuccess] = useState('')
//     const [showPassword, setShowPassword] = useState(false)

//     const router = useRouter()
//     const [user, dispatch] = useReducer((state: IUserRegister, action: IRegistereducerAction) => {
//         return { ...state, [action.type]: action.payload }
//     }, initialState)

//     const handleRegister = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
//         console.log("submitting")
//         e.preventDefault()
//         setLoading(true)
//         setError('')
//         setSuccess('')
//         try {
//             const res = await fetch(`/api/register`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(user)
//             })
//             console.log("register", res)
            
//             if (res.status < 200 || res.status >= 300) {
//                 const error = await res.json()
//                 throw new Error(error?.message || 'Something Went Wrong!')
//             }

//             const data = await res.json()
//             toast.success('Account Created Successfully')
//             router.push('/login')
      
//         } catch (error: any) {
//             console.log("error", error)
//             toast.error(error?.message)
//             // setError(error?.message)
//         }
//         setLoading(false)
//     }



    
//   return (
//     <div>
//         {loading && <Loader modalOpen={loading} />}
//         <Header />
//         <div className="flex flex-col items-center justify-center min-h-screen pb-12">
//             <section className="w-full pt-20 section md:pt-28">
//                 <div className="flex flex-col w-full gap-4 md:flex-row md:gap-12">
//                     <div className="flex flex-col-reverse items-center justify-center flex-1 text-center md:items-start md:flex-col md:justify-between md:text-left">
//                         <div>
//                             <p className="md:text-4xl">
//                                 <span className="font-bold text-primary">Welcome to </span>
//                                 <span className="font-bold text-gray-800 font-argentinum">Brilliant Brains</span>
//                             </p>
//                             <p className='hidden md:block'>The Brilliant Brain Scholarship Scheme is a scholarship management platform with a vision to ensuring that no person of school age is denied access to education</p>
//                         </div>
//                         {/* <h1 className="mb-3 text-4xl font-bold text-center text-gray-800 font-argentinum md:hidden">Sign Up</h1> */}
//                         <Image src={RegisterImg} alt="" className="w-32 h-24 md:w-full md:h-auto" /> 
//                     </div>
//                     <div className="flex-1 flex flex-col p-4 md:p-10 bg-[#F2F2F2] rounded-xl shadow-md w-full">
//                         <h1 className="mb-3 text-3xl font-bold text-gray-800 font-argentinum md:mb-7">Register</h1>
//                         <form onSubmit={handleRegister} className="flex flex-col gap-2 text-xs md:gap-4">
//                             <div className='flex flex-col gap-1'>
//                                 <label htmlFor="email" className="text-xs font-semibold text-gray-500">Email Address</label>
//                                 <input value={user?.email} onChange={(e) => dispatch({ type: "email", payload: e.target.value})} type="email" placeholder="Email" className="px-4 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:opacity-35 placeholder:text-xs" />
//                             </div>
//                             <div className='flex flex-col gap-1'>
//                                 <label htmlFor="username" className="text-xs font-semibold text-gray-500">Username</label>
//                                 <input value={user?.username} onChange={(e) => dispatch({ type: "username", payload: e.target.value})} type="text" placeholder="username" className="px-4 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:opacity-35 placeholder:text-xs" />
//                             </div>
//                             <div className='flex flex-col gap-1'>
//                                 <label htmlFor="password" className="text-xs font-semibold text-gray-500">Password</label>
//                                 <input value={user?.password} onChange={(e) => dispatch({ type: "password", payload: e.target.value})} type="password" placeholder="Password" className="px-4 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:opacity-35 placeholder:text-xs" />
//                             </div>
//                             <div className='flex flex-col gap-1'>
//                                 <label htmlFor="confirm_password" className="text-xs font-semibold text-gray-500">Confirm Password</label>
//                                 <input value={user?.confirm_password} onChange={(e) => dispatch({ type: "confirm_password", payload: e.target.value})} type="password" placeholder="Confirm Password" className="px-4 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:opacity-35 placeholder:text-xs" />
//                             </div>
//                             <div className='flex flex-col gap-1'>
//                                 <label htmlFor="access_code" className="text-xs font-semibold text-gray-500">Access Code</label>
//                                 <input value={user?.access_code} onChange={(e) => dispatch({ type: "access_code", payload: e.target.value})} type="password" placeholder="Access Code" className="px-4 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:opacity-35 placeholder:text-xs" />
//                             </div>
//                             <Button type='submit' gradient='grad-to-top' className="px-4 py-3 text-sm font-bold text-white rounded-xl hover:bg-primary-hover focus:bg-primary-hover focus:outline-none">Register</Button>
//                             <Link href="/login" className="text-xs hover:underline">
//                                 Already have an account? Login
//                             </Link>
//                         </form>
//                         {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
//                     </div>
//                 </div>
//             </section>
           
//         </div>
//     </div>
//   )
// }

// // export const getServerSideProps = async () => {
// //     let data;
// //     try {
// //         const res = await fetch(`/api/register`, {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json"
// //             },
// //             body: JSON.stringify({
// //                 email: "aaaaa",
// //                 password: "aaaaa",
// //                 username: "aaaaa",
// //                 confirm_password: "aaaaa"
// //             })
// //         })
    
// //         data = await res.json()

// //     }
// //     catch (error: any) {
// //         console.log("error", error)
// //         return {
// //             props: {
// //                 title: "Register",
// //                 error: error?.message
// //             }
// //         }
// //     }
    
// //     return {
// //         props: {
// //             title: "Register",
// //             data
// //         }
// //     }
// // }

// export default Register