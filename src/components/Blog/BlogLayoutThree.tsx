import { IBlog, ITopic } from "@/interfaces/schema";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogLayoutThree = ({ blog }: { blog: IBlog }) => {
  return (
    <div className="flex flex-col items-center group text-dark dark:text-light">
      <Link href={`/blogs/${blog._id}`} className="w-full h-full overflow-hidden rounded-xl">
        <Image
          src={blog.featuredImage}
          // placeholder="blur"
          // blurDataURL={blog.image.blurhashDataUrl}
          alt={blog.title}
          width={500}
          height={500}
          className=" aspect-[4/3] w-full object-cover object-center  group-hover:scale-105 transition-all ease duration-300 "
          // sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-col w-full mt-4">
        <span className="text-xs font-semibold uppercase text-primary dark:text-primary sm:text-sm">
          {(blog.topic as ITopic)?.title || ''}
        </span>
        <Link href={`/blogs/${blog._id}`} className="inline-block my-1">
          <h2 className="text-base font-semibold capitalize sm:text-lg">
            <span
              className="font-bold text-border-transition-group"
            >
              {blog.title}
            </span>
          </h2>
        </Link>

        <span className="text-sm font-semibold capitalize text-gray dark:text-light/50 sm:text-base">
          {format(new Date(blog.createdAt ?? ''), "MMMM dd, yyyy")}
        </span>
      </div>
    </div>
  );
};

export default BlogLayoutThree;
