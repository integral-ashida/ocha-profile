検索対策パッチ（追加する2ファイルのみ）

追加するファイル:
  .github/workflows/seo-pages.yml
  seo/generate.cjs

既存のHTML・CSS・写真・JavaScriptは上書きしません。

使い方:
1. このZIPの中の2つのフォルダを、手元の ocha-profile フォルダにコピーします。
2. GitHub Desktop でコミットして main に Push します。
3. GitHub の Actions タブで "Generate SEO species pages" が成功したか確認します。
4. ワークフローが、各種の species-XXXX.html, sitemap.xml, js/species-seo.js を main に自動追加します。
5. GitHub Pages に反映後、Google Search Console に sitemap.xml を登録してください。

確認用例:
 https://integral-ashida.github.io/ocha-profile/species-shima.html
 https://integral-ashida.github.io/ocha-profile/sitemap.xml

重要:
・GitHub Actions の権限設定や組織のポリシーで push が禁止されている場合は生成ファイルが反映されません。
・既存図鑑の種カードをクリックしたときは従来の species.html?id=... に移動します。
  検索用静的ページは sitemap.xml および静的ページ相互のリンクで発見されます。
・HTMLの見た目は既存の species.html と同じ構造・CSS・JSに基づいていますが、公開後の実機比較は必要です。
・Google検索への掲載や上位表示は保証されません。
・公開サイトの今後のコード変更でテンプレート構造が変わった場合は生成処理の調整が必要です。
・現在のGitHub Pagesの公開元が main ブランチ / ルートである想定です。
