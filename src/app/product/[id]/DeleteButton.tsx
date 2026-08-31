"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function DeleteButton({
  productId,
  productUserId,
}: {
  productId: string;
  productUserId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

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

  const handleDelete = async () => {
    if (loading) return;

    const confirmed = window.confirm(
      "この商品を削除しますか？"
    );

    if (!confirmed) return;

    setLoading(true);

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      alert("削除エラー: " + error.message);
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
      <button
        onClick={handleDelete}
        disabled={loading}
        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "削除中..." : "🗑️ 商品を削除"}
      </button>
  );
}