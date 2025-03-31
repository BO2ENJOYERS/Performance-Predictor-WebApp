'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/table/data-table'; // Assuming you have the DataTable component from your code
import { ColumnDef } from '@tanstack/react-table';
import { fetchColumns, fetchPlayers } from '@/lib/api'; // Function to fetch data and columns from your API

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch columns from the database
    fetchColumns().then((columnsData) => {
      const dynamicColumns: ColumnDef<Player>[] = columnsData.map(
        (col: string) => ({
          header: col.charAt(0).toUpperCase() + col.slice(1), // Capitalize first letter of each column name
          accessorKey: col // Define the accessor key to match the column name
        })
      );
      setColumns(dynamicColumns);
    });

    // Fetch player data from the API
    fetchPlayers().then((playersData) => {
      setPlayers(playersData.players);
      setLoading(false);
    });
  }, []);

  return (
    <div className='p-4'>
      <DataTable
        columns={columns}
        data={players}
        totalItems={3120}
        loading={loading}
      />
    </div>
  );
}
