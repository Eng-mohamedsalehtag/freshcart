"use client";

import { CartContext } from "@/Context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useContext } from "react";
import { toast } from "sonner";
import Loading from "../_components/loading/loading";

function Cart() {
  const {
    isLoading,
    products,
    totalCartPrice,
    removeFromCart,
    updateCartItemCount,
  } = useContext(CartContext) as {
    isLoading: boolean;
    products: Array<{
      _id: string;
      count: number;
      price: number;
      product: {
        _id: string;
        title: string;
        imageCover: string;
      };
    }>;
    totalCartPrice: number;
    removeFromCart: (id: string) => Promise<any>;
    updateCartItemCount: (id: string, count: number) => Promise<any>;
  };
  async function handleUpdateCount(id: string, count: number) {
    try {
      const data = await updateCartItemCount(id, count);
      toast.success("product updated successfully");
    } catch (error) {
      toast.error("failed to update product");
    }
  }
  async function removeItem(id: string) {
    try {
      const data = await removeFromCart(id);
      toast.success("product removed successfully");
    } catch (error) {
      toast.error("failed to remove product");
    }
  }
  const { clearCart } = useContext(CartContext) as {
    clearCart: () => Promise<any>;
  };
  async function handleClearCart() {
    try {
      const data = await clearCart();
      toast.success("cart cleared successfully");
    } catch (error) {
      toast.error("failed to clear cart");
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-600">
              Shop Cart
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Your Shopping Cart
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Review your items, adjust quantities, and see the total price
              before checkout.
            </p>
            <button
              className="mt-2 bg-red-500 text-white rounded-md px-2 py-1 cursor-pointer"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>

          <div className="rounded-3xl bg-emerald-50 px-5 py-4 text-right shadow-sm shadow-emerald-200/70 dark:bg-emerald-500/10">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-300">
              Total Cart Price
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
              {totalCartPrice.toLocaleString()} EGP
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {products?.length ? (
            products.map((item) => (
              <article
                key={item._id}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-24 w-24 overflow-hidden rounded-3xl bg-white shadow-sm shadow-slate-200/80 dark:bg-slate-950">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
                        {item.product.title}
                      </h2>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        price : {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                      onClick={() =>
                        handleUpdateCount(item.product._id, item.count - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[2rem] text-center text-base font-semibold">
                      {item.count}
                    </span>
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                      onClick={() =>
                        handleUpdateCount(item.product._id, item.count + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-emerald-700 transition hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-100 cursor-pointer"
                    onClick={() => removeItem(item.product._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                  <span className="text-slate-900 font-semibold dark:text-white">
                    Subtotal: {(item.price * item.count).toLocaleString()} EGP
                  </span>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
              Your cart is empty.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Cart;
