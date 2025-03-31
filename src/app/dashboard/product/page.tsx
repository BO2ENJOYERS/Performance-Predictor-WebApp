import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import PlayerListingPage from '@/components/players/components/player-listing';
import PlayerTableAction from '@/components/players/components/player-tables/player-table-action';

export const metadata = {
  title: 'Dashboard: Players'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Players'
            description='Manage players in the database (Server side table functionalities.)'
          />
          <Link
            href='/predict'
            className={cn(buttonVariants(), 'mr-2 text-xs md:text-sm')}
          >
            <UserPlus className='mr-2 h-4 w-4' /> Predict Potential
          </Link>
        </div>
        <Separator />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={7} rowCount={10} />}
        >
          <PlayerListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
