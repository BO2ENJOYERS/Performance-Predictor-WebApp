'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { useSearchParams } from 'next/navigation';
import { PlayerColumns } from './player-tables/columns';
import { useState, useEffect } from 'react';

// Define the Player type
type Player = {
  id: string;
  name: string;
  age: number;
  position: string;
  overall: number;
  potential: number;
  team: string;
  createdAt: string;
};

export default function PlayerListingPage() {
  const searchParams = useSearchParams();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would fetch from your API
    // For demo purposes, we're creating mock data
    const mockPlayers: Player[] = [
      {
        id: '1',
        name: 'Lionel Messi',
        age: 36,
        position: 'Forward',
        overall: 93,
        potential: 93,
        team: 'Inter Miami CF',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Cristiano Ronaldo',
        age: 38,
        position: 'Forward',
        overall: 90,
        potential: 90,
        team: 'Al-Nassr FC',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Kylian Mbappé',
        age: 25,
        position: 'Forward',
        overall: 91,
        potential: 95,
        team: 'Real Madrid',
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Erling Haaland',
        age: 23,
        position: 'Forward',
        overall: 91,
        potential: 94,
        team: 'Manchester City',
        createdAt: new Date().toISOString()
      },
      {
        id: '5',
        name: 'Kevin De Bruyne',
        age: 32,
        position: 'Midfielder',
        overall: 91,
        potential: 91,
        team: 'Manchester City',
        createdAt: new Date().toISOString()
      },
      {
        id: '6',
        name: 'Virgil van Dijk',
        age: 32,
        position: 'Defender',
        overall: 89,
        potential: 89,
        team: 'Liverpool',
        createdAt: new Date().toISOString()
      },
      {
        id: '7',
        name: 'Alisson Becker',
        age: 31,
        position: 'Goalkeeper',
        overall: 89,
        potential: 90,
        team: 'Liverpool',
        createdAt: new Date().toISOString()
      },
      {
        id: '8',
        name: 'Jude Bellingham',
        age: 20,
        position: 'Midfielder',
        overall: 86,
        potential: 92,
        team: 'Real Madrid',
        createdAt: new Date().toISOString()
      },
      {
        id: '9',
        name: 'Rodri',
        age: 27,
        position: 'Midfielder',
        overall: 89,
        potential: 91,
        team: 'Manchester City',
        createdAt: new Date().toISOString()
      },
      {
        id: '10',
        name: 'Player Data',
        age: 34,
        position: 'Midfielder',
        overall: 78,
        potential: 78,
        team: 'Unknown',
        createdAt: new Date().toISOString()
      }
    ];

    // Simulate API call delay
    setTimeout(() => {
      setPlayers(mockPlayers);
      setLoading(false);
    }, 800);
  }, [searchParams]);

  return (
    <DataTable
      columns={PlayerColumns}
      data={players}
      loading={loading}
      searchPlaceholder='Search players...'
      searchColumn='name'
    />
  );
}
