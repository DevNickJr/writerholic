import { IBlog, IPaginatedResult } from "@/interfaces/schema";
import FeaturedPosts from "./Home/FeaturedPosts";
import HomeCoverSection from "./Home/HomeCoverSection";
import RecentPosts from "./Home/RecentPosts";
import { getBlogs } from "@/actions/blogs";
import Image from "next/image";
import EmptyImg from '@/assets/empty.svg'
import { revalidatePath } from "next/cache";

revalidatePath('/')

export default async function Home() {

  const allBlogs: IPaginatedResult<IBlog> = await getBlogs();

  // console.log({ allBlogs })
  
  return (
    <main className="flex flex-col items-center justify-center">
      {
        !!allBlogs && allBlogs.total > 0 ?
        <>
          <HomeCoverSection blog={allBlogs.data?.[0]} />
          <FeaturedPosts />
          <RecentPosts blogs={allBlogs.data} />
        </>
        :
        <div className="my-6 sm:my-10 min-h-96 justify-center items-center flex flex-col gap-3 text-center">
          
          <Image src={EmptyImg} alt="NO data" height={300} width={300} className="" />
          <p className="text-sm md:text-lg">Check back soon</p>
        </div>
      }
    </main>
  )
}
