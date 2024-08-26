"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({ row }) => {
      return (
        <Link
          href={`/orders/${row.original._id}`}
          className="hover:text-red-1"
        >
          {row.original._id}
        </Link>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Khách Hàng",
  },
  {
    accessorKey: "products",
    header: "Sản Phẩm",
  },
  {
    accessorKey: "totalAmount",
    header: "Tổng Tiền",
    cell: ({ row }) => {
      const totalAmount = row.original.totalAmount;
      const formattedTotal = totalAmount.toLocaleString("vi-VN") + " vnđ";
      return <span>{formattedTotal}</span>;
    },
   
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];
