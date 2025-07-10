import TemplateCardsPreview from '@/components/Pages/Templates/templateCardPreview/TemplateCardsPreview';



export default function TemplatesPage() {
  return (
    <main className="w-full p-4 flex flex-col gap-4">
      <div className="w-full sticky top-0 bg-zinc-50 dark:bg-zinc-800 py-4">
        <h1 className='text-lg font-bold'>Recent</h1>
      </div>

      {/* list of recent items */}
      <section className='w-full grid grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] gap-4'>
        <TemplateCardsPreview createdBy='Asterixh' createdDate={new Date()} id='imd-ddf-s' title='A template' usage={20} preview='/landin/landin.png' />
        <TemplateCardsPreview createdBy='Asterixh' createdDate={new Date('03-03-2024')} id='imd-ddf-s' title='A template' usage={20} preview='/landin/landin.png' />
        <TemplateCardsPreview createdBy='Asterixh' createdDate={new Date()} id='imd-ddf-s' title='A template' usage={20} preview='/landin/landin.png' />
        <TemplateCardsPreview createdBy='Asterixh' createdDate={new Date()} id='imd-ddf-s' title='A template' usage={20} preview='/landin/landin.png' />
        <TemplateCardsPreview createdBy='Asterixh' createdDate={new Date()} id='imd-ddf-s' title='A template' usage={20} preview='/landin/landin.png' />
      </section>
    </main>
  );
}
