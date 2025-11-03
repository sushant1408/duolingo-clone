import Image from "next/image";

import { Button } from "@/components/ui/button";

const languages = [
  {
    image: "/hr.svg",
    title: "Croatia",
  },
  {
    image: "/es.svg",
    title: "Spanish",
  },
  {
    image: "/fr.svg",
    title: "French",
  },
  {
    image: "/it.svg",
    title: "Italian",
  },
  {
    image: "/jp.svg",
    title: "Japanese",
  },
];

const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-5xl mx-auto flex items-center justify-evenly h-full">
        {languages.map((language) => (
          <Button size="lg" variant="ghost" key={language.title}>
            <Image
              src={language.image}
              alt={language.title}
              height={32}
              width={40}
              className="mr-2 rounded-md"
            />
            {language.title}
          </Button>
        ))}
      </div>
    </footer>
  );
};

export { Footer };
