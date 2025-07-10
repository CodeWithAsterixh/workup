import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  preview?: string,
  title:string,
  type: "create" | "template",
  referenceUrl:string,
  lastSeen: string
};

export default function RecentCardsPreview({lastSeen,referenceUrl,title,type,preview}: Props) {
  return (
    <Link href={`/${type}/${referenceUrl}`} className="w-full h-fit">
      <Card className={
        cn("w-full",{
          "!bg-blue-800/10 backdrop-blur-lg !border-blue-500":type==="create"
        })
      }>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {/* last used */}
          <span>{lastSeen}</span>
        </CardHeader>
        <CardContent>
          <div className={cn("w-full h-30 bg-gray-200 dark:bg-zinc-800 rounded-md overflow-hidden", {
          "!bg-blue-800":type==="create"
        })}>
            {/* You might want to render a small preview of the card here */}
            <Image src={preview as string} alt={`preview image for ${title} actions`} width={500} height={500} className="size-full object-cover object-center" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
