import { IComment } from "@/interfaces/schema";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface UserQuery {
  pageSize: number;
  id: string
}

const useInfiniteFetch = (query: UserQuery) =>
  useInfiniteQuery<IComment[], Error>({
    queryKey: ["users", query],
// as a best practice we should initialize to 1, 
// so we data for the 
// first page 
    initialPageParam: 0,
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get(`/api/blogs/${query.id}/comments`, {
          params: {
            page: pageParam,
            limit: query.pageSize,
          },
        })
        .then((res) => res.data),

    getNextPageParam(lastPage, allPages) {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });

export default useInfiniteFetch;