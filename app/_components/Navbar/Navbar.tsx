"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../../../public/screens/freshcart-logo.svg";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LogOut, User, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const { data: session, status } = useSession();
  const protectedLinks = [
    { href: "/cart", label: "Cart" },
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/brands", label: "Brands" },
  ];
  return (
    <nav className="bg-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                loading="eager"
                src={logo}
                alt="logo"
                width={100}
                height={100}
              />
            </Link>
          </div>
          {}
          {/* Links */}
          <ul className="hidden md:flex items-center gap-6">
            <li>
              <Link
                className={
                  pathName === "/"
                    ? "text-green-500 font-bold"
                    : "text-gray-700 hover:text-green-500 transition-all duration-300"
                }
                href="/"
              >
                Home
              </Link>
            </li>
            {session &&
              protectedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={
                      pathName === link.href
                        ? "text-green-500 font-bold"
                        : "text-gray-700 hover:text-green-500 transition-all duration-300"
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>

          {/* Icons */}
          <div className="hidden md:flex items-center gap-4">
            <i className="fa-brands fa-instagram cursor-pointer hover:text-green-500 transition-all duration-300 "></i>
            <i className="fa-brands fa-facebook cursor-pointer hover:text-green-500 transition-all duration-300 "></i>
            <i className="fa-brands fa-tiktok cursor-pointer hover:text-green-500 transition-all duration-300 "></i>
            <i className="fa-brands fa-twitter cursor-pointer hover:text-green-500 transition-all duration-300 "></i>

            <li className="flex gap-4">
              {status === "loading" ? (
                <span>Loading...</span>
              ) : session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none cursor-pointer">
                    <Avatar>
                      <AvatarImage src={session.user?.image ?? ""} />

                      <AvatarFallback className="bg-green-500 text-white">
                        {session.user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span>{session.user?.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {session.user?.email}
                        </span>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Orders
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="cursor-pointer text-red-500"
                      onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link
                    className={
                      pathName === "/login"
                        ? "text-green-500 font-bold"
                        : "text-gray-700 hover:text-green-500 transition-all duration-300"
                    }
                    href="/login"
                  >
                    Login
                  </Link>

                  <Link
                    className={
                      pathName === "/register"
                        ? "text-green-500 font-bold"
                        : "text-gray-700 hover:text-green-500 transition-all duration-300"
                    }
                    href="/register"
                  >
                    Register
                  </Link>
                </>
              )}
            </li>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/">Home</Link>
              </li>
              {session &&
                protectedLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}

              <div className="flex gap-4 text-xl">
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-tiktok"></i>
              </div>

              <li className="flex gap-4">
                {status === "loading" ? (
                  <span>Loading...</span>
                ) : session ? (
                  <button onClick={() => signOut({ callbackUrl: "/login" })}>
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>
                  </>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
