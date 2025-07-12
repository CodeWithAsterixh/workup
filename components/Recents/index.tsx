"use client";
import React, { useEffect, useState } from "react";
import RecentCardsPreview from "../Pages/Overview/recents/RecentCardsPreview";
import { designCard } from "@/types/designs";
import { loadProcess } from "@/types";
import { loadAll } from "@/lib/localStorageDesigns";
import { getRelativeTime } from "@/lib/getRelativeTime";
import Loading from "../loading";

type Props = {};

export default function Recents({}: Props) {
  const [recentItems, setRecentItems] = useState<designCard[]>([]);
  const [process, setProcess] = useState<loadProcess>("not-initialized");
  useEffect(() => {
    async function load() {
      setProcess("initialized");
      setProcess("loading");
      // designCards
      const res = loadAll("designCards");
      setProcess("done");
      setRecentItems(res);
    }
    load();
  }, []);
  if(process !== "done" && process !== "error"){
    return <Loading slot={{
    i:{
        className:"text-2xl"
    }
  }} className="!h-full flex flex-col gap-3">
    {process}
  </Loading>
  }
  return (
    <section className="w-full grid grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] gap-4">
      {recentItems.map((ri, idx) => (
        <RecentCardsPreview
          key={idx}
          lastSeen={getRelativeTime(ri.updatedAt) || ""}
          referenceUrl={`${ri.id}`}
          type="create"
          title={`${ri.name}`}
          preview="/landin/landin.png"
        />
      ))}
    </section>
  );
}
