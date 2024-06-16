import Link from "next/link";
import {
  IconFileDescription,
  IconLayoutDashboard,
  IconListCheck,
  IconX,
  IconSettings,
  IconReportAnalytics,
} from "@tabler/icons-react";
import { FC } from "react";
import { mobileNavLinks } from "../lib/data";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileNavMenu: FC<Props> = ({ setOpen }) => {

  return (
    <section className="flex flex-col text-4xl justify-center items-center fixed top-0 left-0 bg-blue h-screen w-full z-30 text-white">
      <button onClick={() => setOpen(false)} className="fixed top-2 right-2">
        <IconX size={40} />
      </button>
      <div className="flex flex-col justify-center gap-4">
        {mobileNavLinks.map((link, ind) => (
          <Link href={link.link} key={ind}>
            <div>
              <button 
              onClick={() => setOpen(false)}
              className="flex gap-4">
                {link.icon}
                {link.title}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
