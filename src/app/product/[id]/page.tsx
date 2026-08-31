import ImageGallery from "./ImageGallery";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { supabase } from "../../lib/supabase";
import EditButton from "./EditButton";
import Image from "next/image";


export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 商品を取得
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();


  // 商品画像を取得
  const { data: images, error: imagesError } = await supabase
    .from("product_images")
    .select("image_url")
    .eq("product_id", id)
    .order("created_at", { ascending: true });

  if (error || imagesError || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black">
            商品が見つかりません
          </h1>

          <Link
            href="/"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            商品一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  // Supabaseから取得した画像URLだけを配列にする
  const imageUrls = images.map((image) => image.image_url);

  return (
    <div className="min-h-screen bg-zinc-50">
      <main className="mx-auto w-full max-w-3xl bg-white px-8 py-16">

      {/* ロゴ＋タイトル */}
      <div className="flex items-center justify-center gap-3">
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

        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline"
        >
          ← 商品一覧に戻る
        </Link>

        <div className="mt-6 overflow-hidden rounded-xl border bg-white shadow-md">

          {/* 複数画像ギャラリー */}
          <ImageGallery images={imageUrls} />

          <div className="p-6">

            <h1 className="text-3xl font-bold text-black">
              {product.title}
            </h1>

            <p className="mt-4 text-gray-700">
              {product.description}
            </p>

            <p className="mt-6 text-sm text-gray-500">
              📧 {product.email}
            </p>

            <div className="mt-6 flex justify-between text-xs text-gray-400">
              <span>
                {new Date(product.created_at).toLocaleDateString("ja-JP")}
              </span>

              <span>
                ID: {product.id}
              </span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <EditButton
                productId={product.id}
                productUserId={product.user_id}
                currentTitle={product.title}
                currentDescription={product.description}
                currentEmail={product.email}
              />

              <DeleteButton
                productId={product.id}
                productUserId={product.user_id}
              />
            </div>

          </div>
        </div>
      </main>
    </div>

    
  );
}