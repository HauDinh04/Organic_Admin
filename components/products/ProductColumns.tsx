"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Tên Sản Phẩm",
    cell: ({ row }) => (
      <Link href={`/products/${row.original._id}`} className="hover:text-red-1">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "collection",
    header: "Bộ sưu tập",
  },
  {
    accessorKey: "categories",
    header: "Danh Mục",
    cell: ({ row }) =>
      row.original.categories.map((category) => category.title).join(", "),
  },
  {
    accessorKey: "price",
    header: "Giá",
    cell: ({ row }) => {
      const formattedPrice = row.original.price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return `${formattedPrice} vnđ`;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <Delete item="product" id={row.original._id} />,
  },
];
