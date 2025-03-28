"use client"

import type React from "react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface DataTableProps<T> {
  data: T[]
  columns: {
    header: string
    accessorKey: keyof T
    cell?: (item: T) => React.ReactNode
  }[]
  onAddNew?: () => void
  addNewLabel?: string
  emptyState?: React.ReactNode
}

export function DataTable<T>({ data, columns, onAddNew, addNewLabel = "Add New", emptyState }: DataTableProps<T>) {
  if (data.length === 0 && emptyState) {
    return emptyState
  }

  return (
    <div className="rounded-md border">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">
          {data.length} {data.length === 1 ? "Item" : "Items"}
        </h2>
        {onAddNew && (
          <Button onClick={onAddNew} size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            {addNewLabel}
          </Button>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.header}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={`${rowIndex}-${String(column.accessorKey)}`}>
                  {column.cell ? column.cell(row) : (row[column.accessorKey] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

