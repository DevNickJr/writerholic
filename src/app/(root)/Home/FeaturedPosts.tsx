// import { sortBlogs } from "@/src/utils";
import BlogLayoutOne from "@/components/Blog/BlogLayoutOne";
import BlogLayoutTwo from "@/components/Blog/BlogLayoutTwo";
import { IBlog } from "@/interfaces/schema";
import React from "react";

const FeaturedPosts = ({ blogs }: { blogs: IBlog[] }) => {
  // const sortedBlogs = sortBlogs(blogs);
  console.log({ blogs: blogs.length })
  return <section className="flex flex-col items-center justify-center w-full px-5 mt-16 sm:mt-24 md:mt-32 sm:px-10 md:px-24 sxl:px-32">
    <h2 className="inline-block w-full text-2xl font-bold capitalize md:text-4xl text-dark dark:text-light">Featured Posts</h2>

    <div className="grid grid-cols-2 grid-rows-2 gap-6 mt-10 sm:mt-16">
      {
        blogs[0] && 
        <article className="relative col-span-2 row-span-2 md:col-span-1">
          <BlogLayoutOne blog={blogs[0]} />
        </article>
      }
      {
        blogs[1] && 
        <article className="relative col-span-2 row-span-1 md:col-span-1">
          <BlogLayoutTwo blog={blogs[1]} />
        </article>
      }
      {
        blogs[2] && 
        <article className="relative col-span-2 row-span-1 md:col-span-1">
          <BlogLayoutTwo blog={blogs[2]} />
        </article>
      }
    </div>
  </section>;
};

export default FeaturedPosts;
