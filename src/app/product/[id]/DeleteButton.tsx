"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

type Props = {
  productId: string;
  productUserId: string;
};

export default function ProductDeleteButton({
  productId,
  productUserId,
}: Props) {
  const router = useRouter();

  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);

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
      "この商品を削除してもよろしいですか？"
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
    className="rounded px-4 py-2 text-white"
    style={{ backgroundColor: "red" }}
    >
    {loading ? "削除中..." : "🗑️ 商品を削除"}
    </button>
  );
}