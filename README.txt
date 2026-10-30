連続正解表示・学名フォントの修正

上書きする5ファイル：
play.html
db.html
species.html
js/play.js
css/catalog.css

現在公開中のコードを基に修正。問題・記事・種データは含めていません。
1問目は「正解！」のみ。2問目から連続正解を表示。途中の最高連続数、終了画面でも0・1問連続は表示しません。
学名は一覧・詳細ともTimes New Roman優先（未搭載時はTimes、serifの順）。斜体は維持。

GitHub DesktopでFetch/Pull → Repository → Show in Finder → 同名ファイルを上書き → Commit → Push origin。
js/cssフォルダ自体は削除せず、中の該当ファイルだけを上書きしてください。
競合が出たらそのまま確定せず画面を送ってください。
