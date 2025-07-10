import RecentCardsPreview from '@/components/Pages/Overview/recents/RecentCardsPreview';



export default function DashboardPage() {
  return (
    <main className="w-full p-4 flex flex-col gap-4">
      <div className="w-full sticky top-0 bg-zinc-50 dark:bg-zinc-800 py-4">
        <h1 className='text-lg font-bold'>Recent</h1>
      </div>

      {/* list of recent items */}
      <section className='w-full grid grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] gap-4'>
        <RecentCardsPreview lastSeen='today' referenceUrl='home' type='template' title='Vision' preview='/landin/landin.png'/>
        <RecentCardsPreview lastSeen='today' referenceUrl='home' type='template' title='Vision' preview='/landin/landin.png'/>
        <RecentCardsPreview lastSeen='last week' referenceUrl='temple' type='create' title='Temple' preview='/landin/landin.png'/>
        <RecentCardsPreview lastSeen='today' referenceUrl='home' type='template' title='Vision' preview='/landin/landin.png'/>
        <RecentCardsPreview lastSeen='today' referenceUrl='home' type='template' title='Vision' preview='/landin/landin.png'/>
      </section>
    </main>
  );
}
