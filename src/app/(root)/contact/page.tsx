'use client'
import { FormEvent, useReducer } from 'react'
import React from 'react'
import Image from 'next/image'
import ContactImg from "@/assets/writer-5.png";
import { IFeedback, IReducerAction } from '@/interfaces'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useMutate from '@/hooks/useMutation';
import { apiAddFeedback } from '@/services/FeedbackService';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader';

const initialState: IFeedback = {
    email: '',
    name: '',
    message: '',
}

const ContactUs = () => {
    const [feedback, dispatch] = useReducer((state: IFeedback, action: IReducerAction<IFeedback>) => {
        if (action.type === 'reset') return initialState
        return { ...state, [action.type]: action.payload }
    }, initialState)

 
    const addFeedbackMutation = useMutate<IFeedback, unknown>(
        apiAddFeedback,
        {
          onSuccess: (data: unknown) => {
              console.log("data", data)
			  dispatch({ type: 'reset', payload: null })
              toast.success("Message Sent!")
          },
        }
    )

    const sendFeedback = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addFeedbackMutation.mutate(feedback)
        // post(feedback)
    }

    return (
        <>
            {(addFeedbackMutation.isPending) && <Loader />}
            <section className="flex flex-col gap-3 pt-20 pb-20 section md:flex-row">
                <div className="division flex flex-col justify-between w-full gap-4 md:flex-row md:gap-12">
                    <div className="flex flex-col flex-1 gap-4">
                        <Image src={ContactImg} alt="" className="w-full h-40 max-w-sm mb-8" />
                        <div>
                            <h3 className="mb-3 text-lg font-bold text-primary font-argentinum">Office Address</h3>
                            <p className="text-[#6D6D6D] font-medium">Office Address:<br /> 3rd Floor, Suite 056,Ridds Plaza<br />Plot 740, Agunwa Anaekwe Street <br />Wuye, FCT-Abuja</p>
                        </div>
                        <div>
                            <h3 className="mb-3 text-lg font-bold text-primary font-argentinum">Phone Number</h3>
                            <div className="text-base text-[#6D6D6D] font-medium flex flex-col">
                                <a href='tel:+23470000333435'>0700-0033-3435</a>
                            </div>
                        </div>
                        <div>
                            <h3 className="mb-3 text-lg font-bold text-primary font-argentinum">Email/Website Address</h3>
                            <div className="text-base text-[#6D6D6D] font-medium flex flex-col">
                                <a href="http://www.writerholic.org" className="hover:text-primary">
                                    http://www.writerholic.org
                                </a>
                                <a href="mailto:info@writerholic.org" className="hover:text-primary">
                                    info@writerholic.org
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 p-4 bg-white shadow-lg md:p-10 rounded-xl text-black/50">
                        <h1 className="mb-3 text-base font-bold font-argentinum">SEND US A MESSAGE</h1>
                        <form className="flex flex-col gap-4 mt-4" onSubmit={sendFeedback}>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="name" className="">Full Name</Label>
                                <Input required onChange={(e) => dispatch({ type: 'name', payload: e.target.value })} value={feedback?.name} type="text" className="" />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="email" className="">Email</Label>
                                <Input required onChange={(e) => dispatch({ type: 'email', payload: e.target.value })} value={feedback?.email} type="email" className="" />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="message" className="">Message</Label>
                                <Textarea required onChange={(e) => dispatch({ type: 'message', payload: e.target.value })} value={feedback?.message} rows={5} cols={10} id='message' className="" />
                            </div>
                            <Button type='submit' className="py-5">{addFeedbackMutation.isPending ? 'Submitting...' : 'Submit'}</Button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactUs