import Link from "next/link";
import Image from "next/image";


export default function HowToUse() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <main className="mx-auto min-h-screen w-full max-w-3xl bg-white px-5 py-10 sm:px-8 md:px-16">

        {/* ヘッダー */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline"
          >
            ← コロンバス市場に戻る
          </Link>

        <div className="flex items-center justify-center gap-3">
          <Image
            src="/ころいちロゴ.png"
            alt="Columbus Marketplace logo"
            width={80}
            height={20}
            priority
          />

          <span className="text-3xl font-semibold font-serif text-black sm:text-4xl">
            コロいちの使い方
          </span>
        </div>

          <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
            コロンバス近辺で暮らす日本人のためのオンラインマーケットプレイスです。
            商品を探したり、不要になったものを投稿したりできます。
          </p>
        </div>

        {/* 1. 商品を探す */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-black sm:text-2xl">
            1. 商品を探す
          </h2>

          <div className="mt-4 rounded-xl border bg-gray-50 p-5">
            <p className="text-sm leading-7 text-gray-700 sm:text-base">
              トップページの「商品一覧」から、現在投稿されている商品を見ることができます。
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">
              検索バーを使うと、商品名・説明・商品IDから商品を検索できます。
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">
              気になる商品をクリックすると、商品の詳細ページを見ることができます。
            </p>
          </div>
        </section>

        {/* 2. 商品を投稿する */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-black sm:text-2xl">
            2. 商品を投稿する
          </h2>

          <div className="mt-4 rounded-xl border bg-gray-50 p-5">
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-7 text-gray-700 sm:text-base">
              <li>
                「投稿する」または「ログインして投稿する」を押します。
              </li>

              <li>
                アカウントを作成、またはログインします。
              </li>

              <li>
                商品名・説明・メールアドレス・写真などを入力します。
              </li>

              <li>
                内容を確認して投稿します。
              </li>
            </ol>

            <p className="mt-5 text-sm leading-6 text-gray-600">
              ※ 商品を投稿するにはログインが必要です。
            </p>
          </div>
        </section>

        {/* 3. 商品について問い合わせる */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-black sm:text-2xl">
            3. 商品について問い合わせる
          </h2>

          <div className="mt-4 rounded-xl border bg-gray-50 p-5">
            <p className="text-sm leading-7 text-gray-700 sm:text-base">
              商品ページに表示されているメールアドレスから、
              商品の状態・価格・受け渡し場所などについて投稿者に直接お問い合わせください。
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">
              コロンバス市場は、購入者と投稿者をつなぐためのサービスです。
              実際の取引については、当事者同士でご相談ください。
            </p>
          </div>
        </section>

        {/* 4. 自分の投稿を編集・削除 */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-black sm:text-2xl">
            4. 自分の投稿を編集・削除する
          </h2>

          <div className="mt-4 rounded-xl border bg-gray-50 p-5">
            <p className="text-sm leading-7 text-gray-700 sm:text-base">
              自分が投稿した商品は、商品詳細ページから編集・削除することができます。
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">
              他のユーザーが投稿した商品を編集・削除することはできません。
            </p>
          </div>
        </section>

        {/* 5. 取引について */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-black sm:text-2xl">
            5. 取引について
          </h2>

          <div className="mt-4 rounded-xl border bg-gray-50 p-5">
            <p className="text-sm leading-7 text-gray-700 sm:text-base">
              コロンバス市場では、商品の売買や受け渡しそのものには関与していません。
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">
              価格、支払い方法、受け渡し場所、日時などは、
              購入者と投稿者の間で事前に確認してください。
            </p>
          </div>
        </section>

        {/* 6. 安全に利用するために */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-black sm:text-2xl">
            6. 安全に利用するために
          </h2>

          <div className="mt-4 rounded-xl border bg-gray-50 p-5">
            <ul className="list-disc space-y-3 pl-5 text-sm leading-7 text-gray-700 sm:text-base">
              <li>
                個人情報を必要以上に相手に伝えないようにしてください。
              </li>

              <li>
                初めて会う相手との取引では、安全な場所での受け渡しをおすすめします。
              </li>

              <li>
                不審なメッセージや取引を要求された場合は、十分に注意してください。
              </li>

              <li>
                金銭のやり取りを行う場合は、内容を十分に確認してください。
              </li>
            </ul>
          </div>
        </section>

        {/* よくある質問 */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-black sm:text-2xl">
            よくある質問
          </h2>

          <div className="mt-4 space-y-4">

            <div className="rounded-xl border p-5">
              <h3 className="font-bold text-black">
                Q. 商品を見るだけでもアカウントは必要ですか？
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-700">
                いいえ。商品を見る・検索するだけならログインは必要ありません。
              </p>
            </div>

            <div className="rounded-xl border p-5">
              <h3 className="font-bold text-black">
                Q. 商品を投稿するにはアカウントが必要ですか？
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-700">
                はい。商品の投稿・編集・削除にはログインが必要です。
              </p>
            </div>

            <div className="rounded-xl border p-5">
              <h3 className="font-bold text-black">
                Q. 投稿した商品を削除できますか？
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-700">
                はい。自分が投稿した商品であれば、商品詳細ページから削除できます。
              </p>
            </div>

          </div>
        </section>

        {/* お問い合わせ */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-black sm:text-2xl">
            お問い合わせ
          </h2>

          <div className="mt-4 rounded-xl border bg-gray-50 p-5">
            <p className="text-sm leading-7 text-gray-700 sm:text-base">
              コロいちに関するご質問、不具合の報告、不適切な投稿の報告などがございましたら、
              以下のメールアドレスまでご連絡ください。
            </p>

            <p className="mt-4 text-sm font-medium text-gray-700 sm:text-base">
              📧 columbusichiba@gmail.com
            </p>
          </div>
        </section>

        {/* 下部ボタン */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            コロンバス市場を見る
          </Link>
        </div>

      </main>
    </div>
  );
}