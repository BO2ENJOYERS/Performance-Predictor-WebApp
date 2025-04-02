'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/table/data-table'; // Assurez-vous d'avoir le composant DataTable
import { ColumnDef } from '@tanstack/react-table';
import { ScrollArea } from '@radix-ui/react-scroll-area';

interface Player {
  id: string;
  name: string;
  age: number;
  position: string;
  overall: number;
  potential: number;
  team: string;
  createdAt: string;
}

export default function PlayerListingPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [columns, setColumns] = useState<ColumnDef<Player>[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const columnsData = await fetchColumns();
        setColumns(columnsData.columns);

        const playersData = await fetchPlayers(currentPage, pageSize);
        setPlayers(playersData.players);
        setTotalItems(playersData.total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, pageSize]); // Re-fetch when page or pageSize changes

  return (
    <div className='p-4'>
      <ScrollArea>
        <DataTable
          columns={columns}
          data={players}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </ScrollArea>
    </div>
  );
}

// Fetch column definitions
export async function fetchColumns() {
  const response = await fetch('/api/columns');
  const data = await response.json();
  const columns = data.columns.map((column: string) => ({
    accessorKey: column,
    header: column.charAt(0).toUpperCase() + column.slice(1)
  }));
  return { columns };
}

// Fetch players with pagination
export async function fetchPlayers(page: number, limit: number) {
  const response = await fetch(`/api/players?page=${page}&limit=${limit}`);
  const data = await response.json();
  return {
    players: data.players,
    total: data.pagination.total
  };
}
