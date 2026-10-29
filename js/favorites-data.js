// 好きな作品を追加するファイル。name が空欄の項目は公開ページに表示されません。
// 順番はこの配列の順です。画像がなくても、作品名と文章だけで整います。
// 例の値を自分の作品名に書き換えてください。架空の好みは入れていません。
window.OCHA_FAVORITES = [
  {
    id: 'games', title: '好きなゲーム', subtitle: '遊んだ時間と、覚えていること。',
    items: [
      { name: 'ポケットモンスター シリーズ', creator: '', note: '', url: '' },
      { name: 'ほの暮らしの庭', creator: '', note: '', url: '' },
      { name: '魔女の家', creator: '', note: '', url: '' }
      // ,{ name: '作品名', creator: 'メーカーなど（任意）', note: '好きな理由', url: 'https://公式サイトのURL' }
    ]
  },
  {
    id: 'anime', title: '好きなアニメ', subtitle: '忘れられない場面や、ことば。',
    items: [{ name: '', creator: '', note: '', url: '' }]
  },
  {
    id: 'books', title: '好きな本', subtitle: '読み終えても、手元に置きたいもの。',
    items: [{ name: '', creator: '', note: '', url: '' }]
  }
];
