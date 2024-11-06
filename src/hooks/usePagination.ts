'use client'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import useCreateQueryString from "./useCreateQueryString";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IPage } from "@/interfaces";

interface IPaginate {
  limit: number,
  onPaginationChange:  Dispatch<SetStateAction<IPage>>,
  setPagination:  Dispatch<SetStateAction<IPage>>,
  pagination: {
    pageSize: number;
    pageIndex: number;
  },
  // skip: pageSize * pageIndex,
  page: number;
  reset:  () => void;
  next:  () => void;
  prev:  () => void;
}


const initalState: IPage = {
  pageSize: 20,
  pageIndex: 0,
}

export function usePagination(): IPaginate {
    const { createQueryString } = useCreateQueryString()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const page = searchParams.get('page')
    const limit = searchParams.get('limit')
    const [pagination, setPagination] = useState({ pageSize: Number(limit || initalState.pageSize), pageIndex: Number(page || 1) - 1 });
    const { pageSize, pageIndex } = pagination;
    const reset = useCallback(() => router.push(pathname + '?' + createQueryString([
        { name: 'page', value: '1' },
        { name: 'limit', value: pagination.pageSize.toString() },
      ])),
      [createQueryString, pathname, router, pagination.pageSize]
      // setPagination({ pageIndex: initalState.pageIndex, pageSize: pagination.pageSize }), [pagination.pageSize]
    )

    useEffect(() => {
      if (page && Number(page) !== pagination.pageIndex + 1) {
        setPagination({ pageSize: Number(limit || initalState.pageSize), pageIndex: Number(page || 1) - 1 })
      }
      if (limit && Number(limit) !== pagination.pageSize) {
        setPagination({ pageSize: Number(limit || initalState.pageSize), pageIndex: Number(page || 1) - 1 })
      }
    }, [page, limit])

    return {
      limit: pageSize,
      onPaginationChange: setPagination,
      pagination,
      setPagination,
      next: () => setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex+1 })),
      prev: () => setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex-1 })),
      page: pageIndex + 1,
      reset,
    };
  }