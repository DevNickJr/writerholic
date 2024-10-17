import Image from "next/image"
import Link from "next/link"
import profileImg from "@/assets/logo.png"

const Logo = () => {
  return (
    <Link href="/" className="flex items-center text-dark dark:text-light">
        <div className="w-12 overflow-hidden md:w-20">
            <Image src={profileImg} alt="WriterHolic logo" className="w-full h-auto" sizes="20vw" priority />
        </div>
        {/* <span className="text-lg font-bold dark:font-semibold md:text-xl">WriterHolic</span> */}
    </Link>
  )
}

export default Logo