"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function PostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const generateProductId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let id = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }

    return id;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!title || !description || !email) {
      alert("商品名、説明、メールアドレスを入力してください。");
      return;
    }

    if (imageFiles.length === 0) {
      alert("画像を1枚以上選択してください。");
      return;
    }

    const productId = generateProductId();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("ログインしてください。");
      return;
    }

    // ① 商品本体を保存
    const { error: insertError } = await supabase
      .from("products")
      .insert([
        {
          id: productId,
          title: title,
          description: description,
          email: email,
          image: "",
          user_id: user.id,
        },
      ]);

    if (insertError) {
      alert("投稿エラー: " + insertError.message);
      setIsSubmitting(false);
      return;
    }

    // ② 画像をアップロード
    for (const file of imageFiles) {
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (uploadError) {
        alert("画像アップロードエラー: " + uploadError.message);
        setIsSubmitting(false);
        return;
      }

      // ③ Public URL取得
      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      // ④ product_imagesに保存
      const { error: imageInsertError } = await supabase
        .from("product_images")
        .insert([
          {
            product_id: productId,
            image_url: data.publicUrl,
          },
        ]);

      if (imageInsertError) {
        alert("画像情報の保存エラー: " + imageInsertError.message);
        setIsSubmitting(false);
        return;
      }
    }

    alert("商品を投稿しました！");

    // 商品一覧へ戻る
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans">
      <main className="w-full max-w-3xl bg-white px-8 py-16">

        {/* ヘッダー */}
        <div className="flex items-center gap-3">
          <Image
            src="/ころいちロゴ.png"
            alt="Colo Ichi logo"
            width={80}
            height={20}
            priority
          />

          <span className="text-4xl font-semibold font-serif text-black">
            コロンバス市場
          </span>
        </div>

        {/* 戻る */}
        <Link
          href="/"
          className="mt-8 inline-block text-sm text-blue-600 hover:underline"
        >
          ← 商品一覧に戻る
        </Link>

        {/* 投稿フォーム */}
        <div className="mt-6 w-full rounded-lg border p-6">

          <h1 className="mb-6 text-2xl font-bold text-black">
            商品を投稿
          </h1>

          {/* 商品名 */}
          <input
            type="text"
            placeholder="商品名"
            className="mb-1 w-full rounded border p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={20}
          />

          <p className="mb-3 text-right text-xs text-gray-400">
            {title.length}/20
          </p>

          {/* 商品説明 */}
          <textarea
            placeholder="商品の説明"
            className="mb-1 w-full rounded border p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={70}
          />

          <p className="mb-3 text-right text-xs text-gray-400">
            {description.length}/70
          </p>

          {/* メール */}
          <input
            type="email"
            placeholder="メールアドレス"
            className="mb-1 w-full rounded border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={30}
          />

          <p className="mb-3 text-right text-xs text-gray-400">
            {email.length}/30
          </p>

          {/* 画像選択 */}
          <label className="mb-3 block w-full cursor-pointer rounded border p-3 text-center text-gray-600 hover:bg-gray-50">
            📷 画像を選択（最大5枚）

            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);

                if (files.length > 5) {
                  alert("画像は最大5枚までです。");
                  return;
                }

                setImageFiles(files);
              }}
            />
          </label>

          {/* 画像プレビュー */}
          {imageFiles.length > 0 && (
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-3">
                {imageFiles.map((file, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg border"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`選択した画像 ${index + 1}`}
                      className="h-32 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setImageFiles(
                          imageFiles.filter((_, i) => i !== index)
                        );
                      }}
                      className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-sm font-bold text-white hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <p className="mt-2 text-sm text-gray-500">
                {imageFiles.length}枚の画像を選択中
              </p>
            </div>
          )}

          {/* 投稿ボタン */}
            <button
            className="rounded bg-green-600 px-5 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleSubmit}
            disabled={isSubmitting}
            >
            {isSubmitting ? "投稿中..." : "投稿"}
            </button>

        </div>
      </main>
    </div>
  );
}