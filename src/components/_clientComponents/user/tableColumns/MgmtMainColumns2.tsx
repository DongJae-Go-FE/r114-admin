// import { z } from "zod";

// import { ColumnDef } from "@tanstack/react-table";

// import { Button } from "@/components/Button";
// import { Tag } from "@/components/Tag";

// import MgmtUseModal from "@/components/_clientComponents/user/modal/UserMgmtModal";
// import MgmtEditModal from "@/components/_clientComponents/user/modal/MgmtEditModal";
// import DragHandle from "@/components/DataTable/DragHandle";

// import { MgmtMainSchema2 } from "@/schema/schema";

// import {
//   CONFIRM_DELETE_SAVE_STRING,
//   COMPLETE_DELETE_STRING,
// } from "@/const/const";

// const MgmtMainColumns: ColumnDef<z.infer<typeof MgmtMainSchema2>>[] = [
//   {
//     id: "drag",
//     header: () => null,
//     size: 50,
//     cell: ({ row }) => <DragHandle id={row.original.id} />,
//   },
//   {
//     accessorKey: "사용여부",
//     header: () => <div className="text-center">사용여부</div>,
//     cell: ({ row }) => {
//       return row.original.status ? (
//         <Tag name="사용중" color="white" />
//       ) : (
//         <Tag name="만료" color="gray" />
//       );
//     },
//   },
//   {
//     accessorKey: "corporation",
//     header: () => <div className="text-center">법인명</div>,
//     cell: ({ row }) => (
//       <div className="text-center">{row.original.corporation}</div>
//     ),
//   },
//   {
//     accessorKey: "name",
//     header: () => <div className="text-center">아이디</div>,
//     cell: ({ row }) => <div className="text-center">{row.original.name}</div>,
//   },
//   {
//     accessorKey: "loginCount",
//     header: () => (
//       <div className="text-center">
//         총<br />
//         로그인
//       </div>
//     ),
//     cell: ({ row }) => <div className="text-center">{row.original.name}</div>,
//   },
//   {
//     accessorKey: "connection",
//     header: () => <div className="text-center">최근접속일</div>,
//     cell: ({ row }) => {
//       return (
//         row.original.connection && (
//           <div className="text-center">{row.original.name}</div>
//         )
//       );
//     },
//   },
//   {
//     accessorKey: "contract",
//     header: () => <div className="text-center">계약일</div>,
//     cell: ({ row }) => (
//       <div className="text-center">{row.original.contract}</div>
//     ),
//   },
//   {
//     accessorKey: "contractStart",
//     header: () => <div className="text-center">계약시작일</div>,
//     cell: ({ row }) => (
//       <div className="text-center">{row.original.contractStart}</div>
//     ),
//   },
//   {
//     accessorKey: "contractEnd",
//     header: () => <div className="text-center">계약만료일</div>,
//     cell: ({ row }) => (
//       <div className="text-center">{row.original.contractEnd}</div>
//     ),
//   },
//   {
//     accessorKey: "ipCount",
//     header: () => <div className="text-center">IP등록 횟수</div>,
//     cell: ({ row }) => (
//       <div className="text-center">
//         {row.original.ipCount}/{row.original.ipLimit}
//       </div>
//     ),
//   },
//   {
//     accessorKey: "contractDivision",
//     header: () => <div className="text-center">계약구분</div>,
//     cell: ({ row }) => (
//       <div className="text-center">{row.original.contractDivision}</div>
//     ),
//   },
//   {
//     accessorKey: "authority",
//     header: () => <div className="text-center">권한</div>,
//     cell: ({ row }) => (
//       <div className="text-center">{row.original.authority}</div>
//     ),
//   },
//   {
//     accessorKey: "connectionCount",
//     header: () => <div className="text-center">접속횟수</div>,
//     cell: ({ row }) => (
//       <div className="text-center">{row.original.connectionCount}</div>
//     ),
//   },
//   {
//     accessorKey: "mgmt",
//     header: () => <div className="text-center">관리</div>,
//     cell: ({ row }) => {
//       const handleDelete = async () => {
//         if (confirm(CONFIRM_DELETE_SAVE_STRING)) {
//           try {
//             console.log(row.original.id);
//             alert(COMPLETE_DELETE_STRING);
//           } catch (e) {
//             alert(e);
//           }
//         }
//       };

//       return (
//         <ul className="flex gap-x-1 justify-center">
//           <li>
//             <MgmtUseModal id={row.original.id} />
//           </li>
//           <li>
//             <MgmtEditModal id={row.original.id} />
//           </li>
//           <li>
//             <Button
//               type="button"
//               size="xs"
//               color="white"
//               onClick={handleDelete}
//             >
//               삭제
//             </Button>
//           </li>
//         </ul>
//       );
//     },
//   },
// ];

// export default MgmtMainColumns;
