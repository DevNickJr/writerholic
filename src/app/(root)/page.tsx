import { IBlog, IPaginatedResult } from "@/interfaces/schema";
import FeaturedPosts from "./Home/FeaturedPosts";
import HomeCoverSection from "./Home/HomeCoverSection";
import RecentPosts from "./Home/RecentPosts";
// import appConfig from "@/configs";
import { getBlogs } from "@/actions/blogs";
export default async function Home() {
  // const allBlogs: IPaginatedResult<IBlog> = await (await fetch(`${appConfig.apiPrefix}/blogs`)).json()

  const allBlogs: IPaginatedResult<IBlog> = await getBlogs();

  // console.log({ allBlogs: allBlogs[0].author })
  
  return (
    <main className="flex flex-col items-center justify-center">
      {
        !!allBlogs && <>
          <HomeCoverSection blog={allBlogs.data?.[0]} />
          <FeaturedPosts />
          <RecentPosts blogs={allBlogs.data} />
        </>
      }
    </main>
  )
}
