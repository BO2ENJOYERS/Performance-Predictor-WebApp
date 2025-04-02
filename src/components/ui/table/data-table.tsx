'use client';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons';
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';

interface DataTableProps {
  columns: any[];
  data: any[];
  totalItems: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export function DataTable({
  columns,
  data,
  totalItems,
  pageSizeOptions = [10, 20, 30, 40, 50],
  onPageChange,
  onPageSizeChange
}: DataTableProps) {
  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withOptions({ shallow: false }).withDefault(1)
  );
  const [pageSize, setPageSize] = useQueryState(
    'limit',
    parseAsInteger
      .withOptions({ shallow: false, history: 'push' })
      .withDefault(10)
  );

  // Calcul du nombre total de pages
  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));

  // Initialisation de la table
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination: {
        pageIndex: currentPage - 1, // `pageIndex` commence à 0
        pageSize: pageSize
      }
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true
  });

  // Synchroniser `currentPage` et `pageSize` avec `table.setPageIndex`
  useEffect(() => {
    table.setPageIndex(currentPage - 1);
    table.setPageSize(pageSize);
  }, [currentPage, pageSize, table]);

  return (
    <div className='space-y-4'>
      {/* Table with horizontal scrolling */}
      <div className='relative w-full overflow-x-auto rounded-md border'>
        <ScrollArea>
          <ScrollBar orientation='horizontal' />
          <Table className='min-w-full table-auto'>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className='whitespace-nowrap'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className='whitespace-nowrap'>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length || 1}
                    className='h-24 text-center'
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {/* Pagination controls */}
      <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
        <div className='text-muted-foreground text-sm'>
          {totalItems > 0 ? (
            <>
              Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)}{' '}
              to {Math.min(currentPage * pageSize, totalItems)} of {totalItems}{' '}
              entries
            </>
          ) : (
            'No entries'
          )}
        </div>

        <div className='flex items-center space-x-6'>
          <div className='flex items-center space-x-2'>
            <p className='text-sm font-medium'>Rows per page</p>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => {
                setPageSize(Number(value));
                onPageSizeChange?.(Number(value));
              }}
            >
              <SelectTrigger className='h-8 w-[70px]'>
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side='top'>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <DoubleArrowLeftIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className='h-4 w-4' />
            </Button>
            <div className='text-sm font-medium'>
              Page {currentPage} of {pageCount}
            </div>
            <Button
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, pageCount))
              }
              disabled={currentPage >= pageCount}
            >
              <ChevronRightIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => setCurrentPage(pageCount)}
              disabled={currentPage >= pageCount}
            >
              <DoubleArrowRightIcon className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
