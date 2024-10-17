import Image from "next/image";
import WelcomeImg from '@/assets/logo.png'


const AdminDashboard = () => {

  return (
      <div className='flex flex-col items-center justify-center h-full p-4 py-12 overflow-y-auto sm:px-12'>
        <h1 className='mb-12 text-3xl text-center text-black/70 font-argentinum'>Welcome to the Admin Dashboard</h1>
        <div className="flex justify-center mb-6">
          <Image src={WelcomeImg} alt='welcome image' className='w-2/3 md:w-1/2 md:h[90%]' />
        </div>
        <p className="">Manage Blogs, topics and much more</p>
      </div>
  );
}


export default AdminDashboard

