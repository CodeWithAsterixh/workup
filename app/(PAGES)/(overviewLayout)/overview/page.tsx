import RecentCardsPreview from '@/components/Pages/Overview/recents/RecentCardsPreview';
import Recents from '@/components/Recents';



export default function DashboardPage() {
  return (
    <main className="w-full h-full p-4 flex flex-col gap-4">
      <div className="w-full sticky top-0 bg-zinc-50 dark:bg-zinc-800 py-4">
        <h1 className='text-lg font-bold'>Recent</h1>
      </div>

      {/* list of recent items */}
      <Recents/>
    </main>
  );
}
