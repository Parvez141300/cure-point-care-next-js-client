"use client";
import { getDoctors } from "@/services/doctor.services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* 
export interface IDoctor {
    id: string;
    name: string;
    specialization: Record<string, unknown>[];
    experience: number;
    averageRating: number;
}
*/

const DoctorsTable = () => {
  const doctorsColumn = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "specialization", header: "Specialization" },
    { accessorKey: "experience", header: "Experience" },
    { accessorKey: "averageRating", header: "Average Rating" },
  ];

  const { data: doctorDataResponse } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
  const { data: doctors } = doctorDataResponse! || [];

  const { getHeaderGroups, getRowModel } = useReactTable({
    data: doctors,
    columns: doctorsColumn,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log("doctors", doctors);
  return (
    <Table>
      <TableHeader>
        {getHeaderGroups().map((hg) => (
          <TableRow key={hg.id}>
            {hg.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DoctorsTable;
