import { slug } from "github-slugger";
import React from "react";
import Category from "./Category";
import { ITag } from "@/interfaces/schema";

interface IProps {
  categories: ITag[];
  currentSlug: string;
}

const Categories = ({ categories, currentSlug }: IProps) => {
  return (
    <div className="flex flex-wrap items-start px-0 py-4 mx-5 mt-10 font-medium border-t-2 border-b-2 border-solid md:px-10 sxl:px-20 text-dark dark:text-light border-dark dark:border-light md:mx-10">
      {categories.map((cat) => (
        <Category
          key={cat._id}
          link={`/categories/${cat}`}
          name={cat.title}
          active={currentSlug === slug(cat.title)}
        />
      ))}
    </div>
  );
};

export default Categories;
