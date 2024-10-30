'use client'
import { IPaginatedResult } from "@/interfaces/schema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

export interface IProps<T> {
    data: IPaginatedResult<T>;
    next: () => void; 
    prev: () => void; 
}

export function Pagination<T>({ data, next, prev }: IProps<T>) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
   
    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
      (values: { name: string, value: string }[]) => {
        const params = new URLSearchParams(searchParams.toString())
        values.forEach(value => params.set(value.name, value.value))
   
        return params.toString()
      },
      [searchParams]
    )
   

    return (        
        <div className="flex flex-col items-center justify-between gap-3 mt-8 text-sm font-medium md:gap-4 md:flex-row text-black/60">
            <div className="flex items-center gap-3">
                <button
                    className="flex items-center disabled:bg-gray-500 bg-primary text-white disabled:cursor-not-allowed cursor-pointer p-1 rounded-md pr-2.5"
                    // onClick={prev}
                    onClick={() => {
                        router.push(pathname + '?' + createQueryString([
                            // { name: 'limit', value: data.limit.toString() },
                            { name: 'page', value: (data.page -1).toString() },
                        ]))
                        // tableLib.setPageSize(Number(e.target.value))
                    }}
                    disabled={!data.hasPrevPage}
                >
                    <MdChevronLeft className="text-xl" />
                    <span className="text-xs">Prev</span>
                </button>
                <span className="text-sm text-primary">
                    {data.page}
                </span>
                <button
                    className="flex items-center disabled:bg-gray-500 bg-primary text-white disabled:cursor-not-allowed cursor-pointer p-1 rounded-md pl-2.5"
                    onClick={() => {
                        router.push(pathname + '?' + createQueryString([
                            // { name: 'limit', value: data.limit.toString() },
                            { name: 'page', value: (data.page + 1).toString() },
                        ]))
                        // tableLib.setPageSize(Number(e.target.value))
                    }}
                    disabled={!data.hasNextPage}
                >
                    <span className="text-xs">Next</span><MdChevronRight className="text-xl" />
                </button>
            </div>
        </div>
    )
} 