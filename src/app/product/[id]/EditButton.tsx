"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

type Props = {
  productId: string;
  productUserId: string;
  currentTitle: string;
  currentDescription: string;
  currentEmail: string;
};

export default function EditButton({
  productId,
  productUserId,
  currentTitle,
  currentDescription,
  currentEmail,
}: Props) {
  const router = useRouter();

  const [isOwner, setIsOwner] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(currentTitle);
  const [description, setDescription] = useState(currentDescription);
  const [email, setEmail] = useState(currentEmail);

  useEffect(() => {
    const checkOwner = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.id === productUserId) {
        setIsOwner(true);
      }
    };

    checkOwner();
  }, [productUserId]);

  if (!isOwner) {
    return null;
  }

  const handleEdit = async () => {
    if (loading) return;

    setLoading(true);

    const { error } = await supabase
      .from("products")
      .update({
        title,
        description,
        email,
      })
      .eq("id", productId);

    if (error) {
      alert("編集エラー: " + error.message);
      setLoading(false);
      return;
    }

    setEditing(false);
    setLoading(false);

    router.refresh();
  };

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        ✏️ 商品を編集
      </button>
    );
  }

  return (
    <div className="mt-4 rounded-lg border p-4">
      <input
        type="text"
        placeholder="商品名"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={20}
        className="mb-3 w-full rounded border p-2"
      />

      <p className="mb-3 text-right text-xs text-gray-400">
        {title.length}/20
      </p>

      <textarea
        placeholder="商品の説明"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={70}
        className="mb-3 w-full rounded border p-2"
      />

      <p className="mb-3 text-right text-xs text-gray-400">
        {description.length}/70
      </p>

      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        maxLength={30}
        className="mb-3 w-full rounded border p-2"
      />

      <p className="mb-3 text-right text-xs text-gray-400">
        {email.length}/30
      </p>

      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          disabled={loading}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "保存中..." : "保存"}
        </button>

        <button
          onClick={() => setEditing(false)}
          className="rounded bg-blue-400 px-4 py-2 text-white hover:bg-blue-500"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
}