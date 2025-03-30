'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import {
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Select
} from '@radix-ui/react-select';
import { Input } from '@/components/ui/input';

export default function PlayerTableAction() {
  const [search, setSearch] = useState('');
  const [position, setPosition] = useState('');
  const [potentialFilter, setPotentialFilter] = useState('');

  // In a real application, this would update URL search params
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', search);
    // Here you would update the search params
  };

  const handleReset = () => {
    setSearch('');
    setPosition('');
    setPotentialFilter('');
    // Here you would reset the search params
  };

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
      <form
        onSubmit={handleSearch}
        className='flex w-full items-center gap-2 sm:w-auto'
      >
        <Input
          placeholder='Search players...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='h-9 w-full sm:w-[250px]'
        />
        <Button type='submit' size='sm' variant='ghost' className='h-9 px-3'>
          <Search className='h-4 w-4' />
        </Button>
      </form>

      <div className='flex flex-wrap items-center gap-2'>
        <div className='flex items-center gap-2'>
          <Filter className='text-muted-foreground h-4 w-4' />
          <span className='mr-1 hidden text-sm font-medium sm:inline'>
            Filters:
          </span>
        </div>

        <Select value={position} onValueChange={setPosition}>
          <SelectTrigger className='h-9 w-full sm:w-[150px]'>
            <SelectValue placeholder='Position' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=''>All Positions</SelectItem>
            <SelectItem value='Forward'>Forward</SelectItem>
            <SelectItem value='Midfielder'>Midfielder</SelectItem>
            <SelectItem value='Defender'>Defender</SelectItem>
            <SelectItem value='Goalkeeper'>Goalkeeper</SelectItem>
          </SelectContent>
        </Select>

        <Select value={potentialFilter} onValueChange={setPotentialFilter}>
          <SelectTrigger className='h-9 w-full sm:w-[150px]'>
            <SelectValue placeholder='Potential' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=''>All Potential</SelectItem>
            <SelectItem value='high'>High (90+)</SelectItem>
            <SelectItem value='good'>Good (80-89)</SelectItem>
            <SelectItem value='average'>Average (70-79)</SelectItem>
            <SelectItem value='low'>Low (Below 70)</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant='outline'
          size='sm'
          onClick={handleReset}
          className='h-9'
        >
          <RefreshCw className='mr-1 h-3.5 w-3.5' />
          Reset
        </Button>
      </div>
    </div>
  );
}
