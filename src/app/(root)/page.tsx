import { IBlog } from "@/interfaces/schema";
import FeaturedPosts from "./Home/FeaturedPosts";
import HomeCoverSection from "./Home/HomeCoverSection";
import RecentPosts from "./Home/RecentPosts";

export default async function Home() {
  const allBlogs: IBlog[] = await (await fetch('http://localhost:3000/api/blogs')).json()

  // console.log({ allBlogs: allBlogs[0].author })
  
  return (
    <main className="flex flex-col items-center justify-center">
      {
        !!allBlogs && <>
          <HomeCoverSection blog={allBlogs[0]} />
          <FeaturedPosts blogs={allBlogs} />
          <RecentPosts blogs={allBlogs} />
        </>
      }
    </main>
  )
}
