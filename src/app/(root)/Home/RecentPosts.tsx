import React from "react";
import { IBlog } from "@/interfaces/schema";
import BlogLayoutThree from "@/components/Blog/BlogLayoutThree";
import Tag from "@/components/Blog/Tag";

const RecentPosts = ({ blogs }: { blogs: IBlog[] }) => {

  return (
    <section className="flex flex-col items-center justify-center w-full division section">
      <div className="flex justify-between w-full">
        <h2 className="inline-block text-2xl font-bold capitalize w-fit md:text-4xl text-dark dark:text-light">
          Recent Posts
        </h2>
        <Tag link={`/blogs`} name={'View all'} />
        {/* <Link
          href="/blogs"
          className="inline-block text-base font-medium underline text-primary underline-offset-2 md:text-lg"
        >
          view all
        </Link> */}
      </div>

      <div className="grid grid-cols-1 gap-16 mt-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 mb-6 sm:mb-10">
        {blogs.slice(0, 6).map((blog, index) => {
          return (
            <article key={index} className="relative col-span-1 row-span-1">
              <BlogLayoutThree blog={blog} />
            </article>
          );
        })}
      </div>

      <Tag link={`/blogs`} name={'View More'} />
    </section>
  );
};

export default RecentPosts;
