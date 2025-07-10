"use client";

import { Button } from "@/components/ui/button";
import useTheme from "@/hooks/useTheme";
import useGsap from "@/lib/useGsap";
import { cn } from "@/lib/utils";

import gsap from "gsap";
import { Laptop2, Moon, Sun } from "lucide-react";
import { useRef, useState } from "react";

const themes = [
  { title: "Light", icon: Sun },
  { title: "Dark", icon: Moon },
  { title: "System", icon: Laptop2 },
];
export default function ThemeChanger() {
  const { setTheme, theme } = useTheme();
  const currentItem = useRef<HTMLButtonElement>(null);
  const fluidItem = useRef<HTMLSpanElement>(null);
  const previousLocation = useRef(0)
  const [currentHovered,setCurrentHovered] = useState(false)
  
  useGsap(() => {
    gsap.fromTo(fluidItem.current,{
      left:previousLocation.current,
      width: currentItem.current?.getBoundingClientRect().width || 0,
      height: '0px',
      scale: 0,
      duration: 0,
      opacity: 0.5,
      rotate: 260,
      skewY:20,
      skewX:40,
    },{
      width: currentItem.current?.getBoundingClientRect().width || 0,
      height: currentItem.current?.getBoundingClientRect().width || 0,
      left: currentItem.current?.offsetLeft || 0,
      opacity: 1,
      scale: 1.1,
      duration:.4,
      stagger: 10,
      rotate: 360,
      skewY:0,
      skewX:0,
      ease: "circ"

    })

    previousLocation.current = currentItem.current?.offsetLeft || 0
  }, {dependencies:[currentItem, theme]});
  useGsap(() => {
    if(currentHovered){
    gsap.fromTo(fluidItem.current,{
      scale: 1.1,
    },{
      scale: 1.2,
      duration:.4,
      ease: "circ"
    })
    }else{
    gsap.fromTo(fluidItem.current,{
      scale: 1.2,
    },{
      scale: 1.1,
      duration:.4,
      ease: "circ"
    })
    }

  }, {dependencies:[currentHovered]});

  return (
    <aside className="w-fit relative rounded-sm bg-zinc-200 dark:bg-zinc-800 flex items-center isolate">
      <span
        ref={fluidItem}
        className="h-full absolute top-1/2 -translate-y-1/2 backdrop-blur-md z-[1] pointer-events-none rounded-sm bg-zinc-700 dark:bg-zinc-300"
      />
      {themes.map((t) => {
        const isActive = theme.toLowerCase() === t.title.toLowerCase();
        return (
          <Button
            ref={isActive ? currentItem : undefined}
            onClick={() => setTheme(t.title.toLowerCase() as typeof theme)}
            variant={"ghost"}
            onMouseEnter={()=>isActive?setCurrentHovered(true):null}
            onMouseLeave={()=>isActive?setCurrentHovered(false):null}
            onPointerEnter={()=>isActive?setCurrentHovered(true):null}
            onPointerLeave={()=>isActive?setCurrentHovered(false):null}
            key={t.title}
            className={cn("size-fit !bg-transparent p-2 !rounded-none nth-[2]:!rounded-l-sm last:!rounded-r-sm", {
              "!text-zinc-200 dark:!text-zinc-800 z-[2]": isActive,
            })}
          >
            <t.icon className="size-4" />
          </Button>
        );
      })}
    </aside>
  );
}
