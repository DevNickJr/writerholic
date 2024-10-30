'use client'
import type {
    Table as ITable
} from "@tanstack/react-table"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

export function Pagination<TData>({ tableLib, totalDocs }: { tableLib: ITable<TData>, totalDocs: number; }) {
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
        <div className="flex flex-col items-center justify-between gap-3 mt-4 text-sm font-medium md:gap-4 md:flex-row text-black/60">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                    <select
                    className="text-sm bg-gray-100 border rounded outline-none cursor-pointer focus:border-black/60"
                    value={tableLib.getState().pagination.pageSize}
                    onChange={e => {
                        router.push(pathname + '?' + createQueryString([
                            { name: 'limit', value: e.target.value },
                            { name: 'page', value: '1' },
                        ]))
                        // tableLib.setPageSize(Number(e.target.value))
                    }}
                    >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                        {pageSize}
                        </option>
                    ))}
                    </select>
                    <span className="text-black/40">items per page</span>
                </div>
                <div className="">
                    {/* <span>{tableLib.getState().pagination.pageSize} </span>  */}
                    <span>total of {totalDocs || 0} item(s)</span>
                </div>
            </div>
            <div className="flex flex-col items-center gap-3 md:flex-row">
                <span className="">
                    <span>
                    {tableLib.getState().pagination.pageIndex + 1} of{' '}
                    {tableLib.getPageCount() || 0}
                    </span>
                    <span> pages</span>
                </span>
                <span className="flex items-center gap-1">
                    Go to page:
                    <input
                    min={1}
                    type="number"
                    defaultValue={tableLib.getState().pagination.pageIndex + 1}
                    value={tableLib.getState().pagination.pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value && Number(e.target.value) > 1 ? Number(e.target.value) : 1
                        // tableLib.setPageIndex(page)
                        router.push(pathname + '?' + createQueryString([
                            { name: 'page', value: page.toString() }
                        ]))
                    }}
                    className="w-10 text-black p-0.5 border rounded outline-none focus:border-black/60"
                    />
                </span>
                <div className="flex items-center gap-1">
                    <button
                    className=""
                    // onClick={() => tableLib.previousPage()}
                    onClick={() => router.push(pathname + '?' + createQueryString([
                        { name: 'page', value: (tableLib.getState().pagination.pageIndex).toString() }
                    ]))}

                    disabled={!tableLib.getCanPreviousPage()}
                    >
                    <MdChevronLeft className="text-xl text-black/40" />
                    </button>
                    <button
                    className=""
                    onClick={() => router.push(pathname + '?' + createQueryString([
                        { name: 'page', value: (tableLib.getState().pagination.pageIndex + 2).toString() }
                    ]))}
                    // onClick={() => tableLib.nextPage()}
                    disabled={!tableLib.getCanNextPage()}
                    >
                    <MdChevronRight className="text-xl text-black/40" />
                    </button>
                </div>
            </div>
        </div>
    )
} 