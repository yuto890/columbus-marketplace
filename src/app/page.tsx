"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

export default function Home() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState<any>(null);

  const [products, setProducts] = useState<
    {
      title: string;
      description: string;
      email: string;
      image: string;
      id: string;
      createdAt: string;
    }[]
  >([]);

  // ログイン状態を確認
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

    // ログイン・ログアウト時に状態を更新
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 投稿ボタン
  const handlePostClick = () => {
    if (user) {
      window.location.href = "/post";
    } else {
      window.location.href = "/login";
    }
  };

  // ログアウト
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("ログアウトに失敗しました: " + error.message);
      return;
    }

    window.location.href = "/";
  };

  // 商品を読み込む
  const loadProducts = async () => {
    const { data: productsData, error: productsError } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (productsError) {
      alert("Products Error: " + productsError.message);
      return;
    }

    const { data: imagesData, error: imagesError } = await supabase
      .from("product_images")
      .select("*");

    if (imagesError) {
      alert("Images Error: " + imagesError.message);
      return;
    }

    // 商品と画像を紐付ける
    const formattedProducts = productsData.map((product) => {
      const firstImage = imagesData.find(
        (image) => image.product_id === product.id
      );

      return {
        title: product.title,
        description: product.description,
        email: product.email,
        image: firstImage?.image_url || "",
        id: product.id,
        createdAt: new Date(product.created_at).toLocaleDateString("ja-JP"),
      };
    });

    setProducts(formattedProducts);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // 検索
  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return true;
    }

    return (
      product.title.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword) ||
      product.id.toLowerCase().includes(keyword)
    );
  });

  // 1ページ21商品
  const productsPerPage = 21;

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50">

      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-start bg-white px-4 py-10 sm:px-8 md:px-16">

        {/* ロゴ */}
        <div className="flex items-center gap-3">
          <Image
            src="/ころいちロゴ.png"
            alt="Columbus Marketplace logo"
            width={80}
            height={20}
            priority
          />

          <span className="text-3xl font-semibold font-serif text-black sm:text-4xl">
            コロンバス市場
          </span>
        </div>

        {/* 説明 */}
        <div className="mt-6 flex w-full flex-col items-center gap-6 text-center sm:items-start sm:text-left">

          <h1 className="text-sm font-bold leading-7 tracking-tight text-black sm:text-base sm:leading-8">
            コロンバス近辺で暮らす日本人をつなぐ、地域密着型のマーケットプレイスです。不要になったものを次の人へ。必要なものを身近な場所で。売る人にも、買う人にも、便利で安心できる場所を提供します。

            <Link
              href="/how-to-use"
              className="ml-2 font-medium text-blue-600 hover:underline"
            >
              詳しい使い方はこちら
            </Link>
          </h1>

          {/* 投稿ボタン ＋ ログアウトボタン ＋ 検索バー */}
          <div className="flex w-full items-center gap-2 sm:gap-3">

            <div className="flex shrink-0 flex-col gap-2">

              {/* 投稿 / ログインして投稿 */}
              <button
                onClick={handlePostClick}
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 sm:px-4"
              >
                {user ? "投稿する" : "ログインして投稿する"}
              </button>

              {/* ログイン中のみログアウトを表示 */}
              {user && (
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-gray-200 px-3 py-2 text-sm text-black hover:bg-gray-300 sm:px-4"
                >
                  ログアウト
                </button>
              )}

            </div>

            {/* 検索バー */}
            <input
              type="text"
              placeholder="🔍 商品を検索..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="min-w-0 w-full rounded-lg border p-2 text-sm text-black outline-none focus:border-blue-500"
            />

          </div>

          {/* 商品一覧 */}
          <h2 className="mt-6 text-xl text-black font-bold sm:mt-8 sm:text-2xl">
            商品一覧
          </h2>

          {/* 商品グリッド */}
          <div className="mt-4 grid w-full grid-cols-2 gap-3 sm:mt-6 sm:gap-4 md:grid-cols-3">

            {currentProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="w-full overflow-hidden rounded-xl border bg-white shadow-md transition hover:shadow-lg"
              >

                {/* 商品画像 */}
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-40 w-full object-contain bg-gray-100 sm:h-52 md:h-60"
                  />
                ) : (
                  <div className="flex h-40 items-center justify-center bg-gray-200 text-xs text-black sm:h-52 md:h-60">
                    No Image
                  </div>
                )}

                {/* 商品情報 */}
                <div className="p-3 sm:p-4 md:p-5">

                  <h2 className="line-clamp-2 text-sm font-bold text-black sm:text-base md:text-lg">
                    {product.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-xs text-black sm:mt-3">
                    {product.description}
                  </p>

                  <p className="mt-3 truncate text-xs text-black sm:mt-4">
                    📧 {product.email}
                  </p>

                  <div className="mt-4 flex justify-between gap-2 text-[10px] text-black sm:mt-6 sm:text-xs">
                    <span>{product.createdAt}</span>
                    <span>ID: {product.id}</span>
                  </div>

                </div>
              </Link>
            ))}

          </div>

          {/* 検索結果がない場合 */}
          {filteredProducts.length === 0 && (
            <p className="mt-8 w-full text-center text-sm text-black">
              該当する商品が見つかりませんでした。
            </p>
          )}

          {/* ページ移動 */}
          {totalPages > 1 && (
            <div className="mt-8 flex w-full items-center justify-center gap-3">

              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg border px-3 py-2 text-sm text-black transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
              >
                ← 前へ
              </button>

              <span className="text-sm text-black">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg border px-3 py-2 text-sm text-black transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
              >
                次へ →
              </button>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}