import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <main className="home-hero">
    <div className="headline">
    <h2>Create your business card</h2>
    <p>Find what works best for you</p>

    <div className="cta">
      <Button className="cursor-pointer !bg-secondary !text-primary flex items-center !h-fit !py-3 !text-base md:text-lg !px-5 md:!px-10">Find template <i className="pi pi-arrow-right"></i></Button>
    </div>
    </div>
    <div className="template-display">
      <img src="/landin/landin.png" alt="" />
    </div>
  </main>;
}
