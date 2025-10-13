"use client";

import { useCartStore } from "@/app/store/cartStore";
import Link from "next/link";

function Navbar() {
  const items = useCartStore((state) => state.items);
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link className="font-bold text-xl" href="/">
        market
      </Link>
      <Link href={"/cart"} className="relative">
        🛒
        {items.length > 0 && (
          <span className=" absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
            {items.length}
          </span>
        )}
      </Link>
    </nav>
  );
}

export default Navbar;
