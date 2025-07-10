export function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="font-semibold text-xs text-zinc-500 tracking-widest uppercase">
        {title}
      </span>
      <div className="flex-1 border-b border-dashed border-zinc-200 dark:border-zinc-700" />
    </div>
  );
}

export function InputTitles({ titles }: { titles: string[] }) {
  return (
    <ul className="w-full grid grid-cols-[repeat(auto-fit,_minmax(5rem,_1fr))] gap-2 font-semibold text-xs text-zinc-500 tracking-widest uppercase">
      {titles.map((t, idx) => (
        <li key={idx}>{t}</li>
      ))}
    </ul>
  );
}
