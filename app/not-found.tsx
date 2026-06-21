import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 bg-gray-50">
      <Image
        src="/screens/404.jpg"
        alt="Page Not Found"
        width={700}
        height={500}
        className="max-w-full h-auto"
        priority
      />

      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-6">
        Oops! Page Not Found
      </h1>

      <p className="text-gray-500 text-center mt-3 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
