import { IBlog, ITopic } from "@/interfaces/schema";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogLayoutTwo = ({ blog }: { blog: IBlog }) => {
  return (
    <div className="grid items-center grid-cols-12 gap-4 group text-dark dark:text-light">
      <Link
        href={blog._id || ''}
        className="h-full col-span-12 overflow-hidden lg:col-span-4 rounded-xl"
      >
        <Image
          src={blog.featuredImage}
          // placeholder="blur"
          // blurDataURL={blog.image.blurhashDataUrl}
          alt={blog.title}
          width={500}
          height={500}
          className="object-cover object-center w-full h-full transition-all duration-300 aspect-square group-hover:scale-105 ease"
          sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="w-full col-span-12 lg:col-span-8">
        <span className="inline-block w-full text-xs font-semibold uppercase text-primary sm:text-sm">
          {(blog.topic as ITopic)?.title || ''}
        </span>
        <Link href={blog._id || ''} className="inline-block my-1">
          <h2 className="text-base font-bold capitalize sm:text-lg">
            <span
              className="font-bold text-border-transition-group"
            >
              {blog.title}
            </span>
          </h2>
        </Link>
        <span className="inline-block w-full text-xs font-semibold capitalize text-gray dark:text-light/50 sm:text-base">
          {format(new Date(blog.createdAt), "MMMM dd, yyyy")}
        </span>
      </div>
    </div>
  );
};

export default BlogLayoutTwo;
