"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../../../public/screens/freshcart-logo.svg";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

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
            <li>
              <Link
                className={
                  pathName === "/cart"
                    ? "text-green-500 font-bold"
                    : "text-gray-700 hover:text-green-500 transition-all duration-300"
                }
                href="/cart"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                className={
                  pathName === "/products"
                    ? "text-green-500 font-bold"
                    : "text-gray-700 hover:text-green-500 transition-all duration-300"
                }
                href="/products"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                className={
                  pathName === "/categories"
                    ? "text-green-500 font-bold"
                    : "text-gray-700 hover:text-green-500 transition-all duration-300"
                }
                href="/categories"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                className={
                  pathName === "/brands"
                    ? "text-green-500 font-bold"
                    : "text-gray-700 hover:text-green-500 transition-all duration-300"
                }
                href="/brands"
              >
                Brands
              </Link>
            </li>
          </ul>

          {/* Icons */}
          <div className="hidden md:flex items-center gap-4">
            <i className="fa-brands fa-instagram cursor-pointer"></i>
            <i className="fa-brands fa-facebook cursor-pointer"></i>
            <i className="fa-brands fa-tiktok cursor-pointer"></i>
            <i className="fa-brands fa-twitter cursor-pointer"></i>

            <li className="flex gap-4">
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
              <Link
                className={
                  pathName === "/logout"
                    ? "text-green-500 font-bold"
                    : "text-gray-700 hover:text-green-500 transition-all duration-300"
                }
                href="/logout"
              >
                Sign Out
              </Link>
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
              <li>
                <Link href="/cart">Cart</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/categories">Categories</Link>
              </li>
              <li>
                <Link href="/brands">Brands</Link>
              </li>

              <div className="flex gap-4 text-xl">
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-tiktok"></i>
              </div>

              <li className="flex gap-4">
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
                <Link href="/logout">Sign Out</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
