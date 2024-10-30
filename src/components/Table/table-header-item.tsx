import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";


export default function Header<T, K>({
    title,
    column,
    className
}: {
    title: string;
    column: Column<T, K>;
    className?: string;
}) {
    return (
        <span 
         onClick={() => column.getCanSort() && column.toggleSorting()}
        className={cn(
           "gap-1 capitalize whitespace-nowrap relative cursor-pointer flex items-center group",
            className
          )}>
            <div className="relative">
                {title}
                <span className="inline-block w-6"></span>
                <button
                    type="button"
                    onClick={() => column.toggleSorting()}
                    className={`hover:bg-gray-200 absolute transition-all rounded p-1 right-0 top-1/2 -translate-y-1/2 group-hover:z-10  ${column.getCanSort() ? !!column.getIsSorted() ? "z-10" : '-z-10' : 'hidden'}`}
                >
                    {column.getIsSorted() === "asc" ? (
                        <ArrowUp size={15} />
                    ) : column.getIsSorted() === "desc" ? (
                        <ArrowDown size={15} />
                    ) : (
                        <ArrowUp size={15} className="" />
                    )}
                </button>
            </div>
        </span>
    );
}