クイズ・ひみつの部屋・動画 統合修正版

今回のZIPだけを使用してください。先ほどのocha-room-video-fix.zipの修正も含みます。

上書きする9ファイル：
index.html
secret.html
species.html
play.html
js/main.js
js/secret.js
js/gallery-video.js
js/quiz-data.js
js/play.js

手順
1. GitHub Desktopでocha-profileを選択。Fetch origin、Pull originが表示されたら取り込みます。競合が出たらそこで止めて画面を送ってください。
2. Repository → Show in Finder。念のため現在のフォルダを別の場所へコピーしてバックアップ。
3. ZIP内のHTML4ファイルをサイトの同じ場所へ上書き。
4. ZIP内のjsを開き、中の5ファイルだけをサイトのjs内へ上書き。jsフォルダ自体を削除しないでください。
5. GitHub Desktopで変更一覧を確認し、Summaryに「クイズとひみつの部屋・動画を修正」と入力。Commit to main → Push origin。
6. 公開反映後にページを再読み込み。

クイズは取得時点の最新版95問を保持。４枚の解答行に欠けていたカンマ1文字を修正。データの構文・ID重複・４択17問の選択肢と正解数を確認済み。
読み込み失敗時に「準備中」と表示していた案内も修正しました。
ひみつの部屋の合言葉は0607。記事データは置き換えません。
好きなものへの入口は非表示。動画はYouTubeプレーヤーを表示。
画像・種データ・CSSは置き換えません。
