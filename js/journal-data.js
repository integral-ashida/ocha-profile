// ひみつの部屋の記事。新しい記事をこの配列に追加します。
// published:true で表示、false で下書き。下書きも公開コードから読めるので秘密は書かないでください。
// idは重複しない半角英数字・ハイフン。dateは YYYY-MM-DD。
// blocksは {type:'p',text:'本文'} / {type:'h2',text:'小見出し'} /
// {type:'image',src:'images/web/写真.webp',alt:'写真の説明',caption:'キャプション'}。
// 本文に半角の ' を入れる場合は \' と書くか、日本語の「」を使ってください。
window.OCHA_JOURNAL = {
  intro: '日々のこと、考えていること。ここに少しずつ。',
  posts: [
    {
      id: 'about-this-room',
      published: true,
      date: '',
      title: 'この部屋について',
      category: 'はじめに',
      summary: '表のページには収まらないことを、少しずつ。',
      blocks: [
        { type: 'p', text: '趣味の記録から少し離れて、日々のことや考えていることを書き留める場所です。' },
        { type: 'p', text: '記事はこの部屋の一覧に追加していきます。気になるタイトルから、どうぞ。' }
      ]
    },
    {
      id: 'first-note',
      published: false,
      date: '',
      title: 'ここに記事のタイトル',
      category: '日記',
      summary: '一覧に表示する短い紹介文。空欄でも大丈夫です。',
      blocks: [
        { type: 'p', text: 'ここに本文を書いてください。段落を増やすときは、この行をコピーします。' },
        { type: 'h2', text: '小見出し（不要ならこの行を削除）' },
        { type: 'p', text: '続きの文章。' }
      ]
    }
  ]
};
