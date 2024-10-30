import React from "react";
import Link from "next/link";
import Image from "next/image";
import { slug } from "github-slugger";
import { IBlog, ITopic } from "@/interfaces/schema";
import Tag from "./Tag";

const BlogLayoutOne = ({ blog }: { blog: IBlog }) => {
  return (
    <div className="relative inline-block overflow-hidden group rounded-xl max-h-[28rem]">
      <div
        className="absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent from-0% to-black/50 rounded-xl z-10"
      />
      <Image
        src={blog.featuredImage}
        // placeholder="blur"
        // blurDataURL={blog.}
        alt={blog.title}
        width={500}
        height={500}
        // width={blog.image.width}
        // height={blog.image.height}
        className="object-cover object-center w-full h-full transition-all duration-300 rounded-xl group-hover:scale-105 ease"
        sizes="(max-width: 1180px) 100vw, 50vw"
      />

      <div className="absolute bottom-0 z-20 w-full p-4 xs:p-6 sm:p-10">
        <Tag link={`/blogs?search=${slug((blog.topic as ITopic)?._id || '')}`} name={(blog.topic as ITopic)?.title || ''}
        className="px-6 text-xs  sm:text-sm py-1 sm:py-2 !border "
        />
        <Link href={`/blogs/${blog._id}`} className="mt-6">
          <h2 className="mt-2 text-sm font-bold capitalize xs:text-base sm:text-xl md:text-2xl text-light sm:mt-4">
            <span
              className="text-border-transition-group "
            >
              {blog.title}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default BlogLayoutOne;
