import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import axios from "axios";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await req.json();

  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    { productId },
    { headers: { token: session.accessToken } },
  );

  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  // لو مفيش id يبقى المقصود مسح السلة كلها
  const url = id
    ? `https://ecommerce.routemisr.com/api/v1/cart/${id}`
    : `https://ecommerce.routemisr.com/api/v1/cart`;

  const { data } = await axios.delete(url, {
    headers: { token: session.accessToken },
  });

  return NextResponse.json(data);
}
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const { count } = await req.json();

  const { data } = await axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    { count },
    { headers: { token: session.accessToken } },
  );

  return NextResponse.json(data);
}
