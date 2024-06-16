import { FC, ReactNode } from "react";

interface Props {
  text: string;
  children: ReactNode;
}

export const Tooltip: FC<Props> = ({ text, children }) => {
  return (
    <div className="relative inline-block">
      <div className="group inline-block">
        {children}
        <div className="absolute invisible group-hover:visible top-0 left-8 bg-black bg-opacity-50 text-white py-1 px-2 rounded-md text-xs z-10 whitespace-nowrap">
          {text}
        </div>
      </div>
    </div>
  );
};
