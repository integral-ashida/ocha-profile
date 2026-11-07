自己紹介のスマホ文字サイズ＋写真ラベル統合更新

前回の ocha-photo-label-design.zip は入れなくて構いません。
今回のZIPに同じ写真ラベル修正を含めました。

上書き：index.html、species.html、css/photo-labels.css
新規追加：js/intro-fit.js

GitHub DesktopでFetch origin → 必要ならPull origin。
Repository → Show in Finderを開き、上記ファイルだけを同じ場所へコピー。
css/jsフォルダ全体は削除・置換しません。
Commit to main → Push origin。
Generate SEO species pagesとPages公開が完了してから再読み込み。

自己紹介文は変更せず、スマホ幅600px以下で2行を同じ文字サイズに調整。
横幅と実際の文字幅から算出し、回転やフォント読み込み後にも再調整。
PCの文字サイズや他の本文は変えません。
標準設定では最低12px。極端に狭い画面や文字拡大設定では読める大きさを優先し、
折り返すことがあります。
写真ラベルは場所を左、日付を右に置く1行のコンパクト表示。
場所・日付・写真タイトルの入力データは変更しません。

確認先：
https://integral-ashida.github.io/ocha-profile/index.html
https://integral-ashida.github.io/ocha-profile/species-nami.html

JavaScript構文とサイズ計算の検証済み。iPhone実機表示は未検証。
