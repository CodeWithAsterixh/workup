import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  preview?: string,
  title:string,
  id:string,
  createdBy: string,
  createdDate: Date,
  usage:number
};

export default function TemplateCardsPreview({createdBy,createdDate,usage,id,title,preview}: Props) {
  return (
    <Link href={`/template/${id}`} className="w-full h-fit">
      <Card className={
        cn("w-full")
      }>
        <CardHeader className="flex items-center justify-between !text-sm">
          <CardTitle>{title}</CardTitle>
          {/* last used */}
          <span>{new Date(createdDate).toLocaleDateString()}</span>
        </CardHeader>
        <CardContent>
          <div className={"w-full h-30 bg-gray-200 dark:bg-zinc-800 rounded-md overflow-hidden"}>
            {/* You might want to render a small preview of the card here */}
            <Image src={preview as string} alt={`preview image for ${title} actions`} width={500} height={500} className="size-full object-cover object-center" />
          </div>
        </CardContent>
          <CardFooter className="w-full !text-sm flex items-center justify-between">
            <p className="max-w-[70%]"><em>Created by:</em> <strong className="break-all">{createdBy}</strong></p>
            <b>{usage}+</b>
          </CardFooter>

      </Card>
    </Link>
  );
}
