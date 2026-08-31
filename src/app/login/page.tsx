"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert("登録エラー: " + error.message);
        setLoading(false);
        return;
      }

      alert("アカウントを作成しました！");
      router.push("/");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("ログインエラー: " + error.message);
        setLoading(false);
        return;
      }

      router.push("/post");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">

        <h1 className="text-center text-3xl font-bold text-black">
          {isSignUp ? "新規登録" : "ログイン"}
        </h1>

        <p className="mt-3 text-center text-sm text-gray-500">
          商品を投稿するにはアカウントが必要です
        </p>

        <input
          type="email"
          placeholder="メールアドレス"
          className="mt-8 w-full rounded border p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="パスワード"
          className="mt-3 w-full rounded border p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full rounded bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "処理中..."
            : isSignUp
            ? "アカウントを作成"
            : "ログイン"}
        </button>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-4 w-full text-sm text-blue-600 hover:underline"
        >
          {isSignUp
            ? "すでにアカウントをお持ちですか？ログイン"
            : "アカウントをお持ちでないですか？新規登録"}
        </button>

        <Link
          href="/"
          className="mt-6 block text-center text-sm text-gray-500 hover:underline"
        >
          ← 商品一覧に戻る
        </Link>

      </div>
    </div>
  );
}