import Link from "next/link";
import React from "react";

// Define the props interface
interface BoxProps {
  id: number;
  name: string;
  description: string;
  href?: string;
}

// Type the component with the props interface
const Box: React.FC<BoxProps> = (props) => {
  return (
    <Link href={props.href || "/"}>
      <div className="cursor-pointer relative bg-gray-800 text-white rounded-lg p-4 w-80 h-40 border border-transparent hover:border-gradient-to-r hover:border-white-500 hover:from-white-500 hover:to-red-600 transition-all duration-500 ease-out group">
        <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-r from-blue-800 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
        <div className="relative z-10 flex flex-col justify-center items-start h-full">
          <div className="flex items-center space-x-2 mb-2">
            <h1 className="text-xl font-bold text-blue-500">{props.id}</h1>
            <h2 className="text-lg font-semibold">{props.name}</h2>
          </div>
          <p className="text-sm text-gray-400 mb-1">{props.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default Box;
