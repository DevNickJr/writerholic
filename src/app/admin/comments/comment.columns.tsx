// import Header from "@/components/Table/table-header-item";
// import { createColumnHelper } from "@tanstack/react-table";
// // import { Button } from '@/components/ui/button'
// import { IComment } from "@/interfaces/schema";

// const commentsColumnHelper = createColumnHelper<IComment>();
// console.log(Header)

// // export const columns = [
// //      commentsColumnHelper.accessor("name", {
// //         header: 'First Name', 
// //         // header: ({ column }) => <Header title="" column={column} />,
// //         // cell: () => <span className="w-3.5 h-3.5" />,
// //     }),
// // ]

// export const commentsColumnsMaker = () => {
//     return [
//         // commentsColumnHelper.accessor("_id", {
//         //     header: ({ column }) => <Header title="" column={column} />,
//         //     cell: () => <span className="w-3.5 h-3.5" />,
//         // }),
//         { 
//             header: 'Name', 
//             // header: ({ column }) => <Header title="Name" column={column} />,
//             accessorKey: 'name', 

//             // header: () => <span>Last Name</span>, 
//             accessorFn: (row: IComment) => row.name, 
//         }, 
//         // commentsColumnHelper.accessor("name", {
//         //     id: 'name',
//         //     header: ({ column }) => <Header title="Name" column={column} />,
//         //     sortingFn: "text",
//         //     cell: (info) => {
//         //         return <span className="whitespace-nowrap">{info.getValue()?.toString() || 'N/A'}</span>
//         //     },
//         // }),
//         // commentsColumnHelper.accessor("email", {
//         //     id: 'email',
//         //     header: ({ column }) => <Header title="Email" column={column} />,
//         //     sortingFn: "text",
//         //     cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString() || 'N/A'}</span>,
//         // }),
//         // commentsColumnHelper.accessor("website", {
//         //     id: 'website',
//         //     header: ({ column }) => <Header title="Website" column={column} />,
//         //     sortingFn: "text",
//         //     cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString() || 'N/A'}</span>,
//         // }),
//         // commentsColumnHelper.accessor("content", {
//         //     id: 'content',
//         //     header: ({ column }) => <Header title="Content" column={column} />,
//         //     sortingFn: "text",
//         //     cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString() || 'N/A'}</span>,
//         // }),
//         // commentsColumnHelper.accessor(row => row, {
//         //     id: "actions",
//         //     sortingFn: "text",
//         //     cell: (info) => {
//         //         const rowData = info.getValue(); 
//         //         const id = rowData?._id?.toString();
//         //         return (
//         //          <div className='flex items-center gap-2'>
//         //             <Button onClick={() => approve(id, true) } className='py-1 px-2 text-xs'>Approve</Button>
//         //             <Button variant='destructive' onClick={() => approve(id, false) } className='py-1 px-2 text-xs'>Decline</Button>
//         //          </div>
//         //         );
//         //     },
//         //     header: ({ column }) => <Header title="Actions" column={column} className="flex justify-center" />,
//         // }),
//     ];
//     // ] as ColumnDef<IComment>[];
// }
