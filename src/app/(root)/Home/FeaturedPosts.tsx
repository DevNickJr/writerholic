import { getFeaturedBlogs } from "@/actions/blogs";
import BlogLayoutOne from "@/components/Blog/BlogLayoutOne";
import BlogLayoutTwo from "@/components/Blog/BlogLayoutTwo";
import { IBlog } from "@/interfaces/schema";
import React from "react";


const FeaturedPosts = async () => {
  const featuredBlogs: IBlog[] = await getFeaturedBlogs();

  if (!featuredBlogs || !featuredBlogs.length) return null
  return <section className="flex flex-col items-center justify-center w-full division section-top">
    <h2 className="inline-block w-full text-2xl font-bold capitalize md:text-4xl text-dark dark:text-light">Featured Posts</h2>
    <div className="grid grid-cols-2 grid-rows-2 gap-6 mt-6 sm:mt-10">
      {
        featuredBlogs[0] && 
        <article className="relative col-span-2 row-span-2 md:col-span-1">
          <BlogLayoutOne blog={featuredBlogs[0]} />
        </article>
      }
      {
        featuredBlogs[1] && 
        <article className="relative col-span-2 row-span-1 md:col-span-1">
          <BlogLayoutTwo blog={featuredBlogs[1]} />
        </article>
      }
      {
        featuredBlogs[2] && 
        <article className="relative col-span-2 row-span-1 md:col-span-1">
          <BlogLayoutTwo blog={featuredBlogs[2]} />
        </article>
      }
    </div>
  </section>;
};

export default FeaturedPosts;
