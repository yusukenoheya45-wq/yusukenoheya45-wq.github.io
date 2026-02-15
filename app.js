'use strict';
/* ============================================================
   DateCraft — app.js  (v2)
   ============================================================ */

const TOTAL_STEPS = 6;

const STEP_TIPS = [
  '📍 エリアを選ぶと、そのエリアに特化したスポットをご提案します。',
  '🌤️ 雨の日には屋内スポット中心のコースに自動調整されます。',
  '💭 雰囲気を決めるとコース全体のテーマが変わります。',
  '💴 予算は交通費を除いた飲食・入場料等の目安です。',
  '💑 関係性に合わせて、距離感や体験の種類が変わります。',
  '🏷️ 複数選択OK！選んだテーマを優先してコースに盛り込みます。'
];

/* ===================== GALLERY DATA ===================== */
const GALLERY_ITEMS = [
  { id:1,  title:'新宿 × ロマンチック夜景コース',   area:'新宿・渋谷',   category:'romantic', budget:'¥8,000〜12,000', duration:'8時間',  season:'秋冬',         img:'🌃', rank:1,  likes:342, tags:['夜景','カップル','ディナー'],         spots:['新宿御苑','代々木公園','NEWoMan屋上バー','フレンチレストラン'] },
  { id:2,  title:'浅草 × 着物デートコース',         area:'浅草・上野',   category:'cultural', budget:'¥6,000〜10,000',duration:'7時間',  season:'春秋',         img:'👘', rank:2,  likes:287, tags:['着物','和文化','インスタ映え'],        spots:['着物レンタル','浅草寺','仲見世通り','浅草 舟和'] },
  { id:3,  title:'横浜 × みなとみらい王道コース',   area:'横浜',         category:'romantic', budget:'¥5,000〜9,000', duration:'6時間',  season:'オールシーズン',img:'⛵', rank:3,  likes:254, tags:['夜景','観覧車','みなとみらい'],        spots:['赤レンガ倉庫','コスモワールド','山下公園','ハンマーヘッド'] },
  { id:4,  title:'原宿 × カフェ巡りコース',         area:'原宿・表参道', category:'foodie',   budget:'¥4,000〜7,000', duration:'5時間',  season:'春夏',         img:'☕', rank:4,  likes:231, tags:['カフェ','スイーツ','インスタ映え'],     spots:['竹下通り','ラフォーレ原宿','猫カフェ','表参道カフェ'] },
  { id:5,  title:'お台場 × チームラボ体験コース',   area:'お台場・湾岸', category:'active',   budget:'¥7,000〜12,000',duration:'7時間',  season:'オールシーズン',img:'🎨', rank:5,  likes:219, tags:['アート','チームラボ','体験'],          spots:['お台場海浜公園','チームラボプラネッツ','ダイバーシティ','自由の女神'] },
  { id:6,  title:'京都 × 嵐山・紅葉散策コース',    area:'京都',         category:'cultural', budget:'¥5,000〜9,000', duration:'8時間',  season:'秋',           img:'🍁', rank:6,  likes:198, tags:['紅葉','嵐山','和文化'],               spots:['嵐山竹林','渡月橋','天龍寺','老舗甘味処'] },
  { id:7,  title:'大阪 × 食い倒れグルメコース',    area:'大阪',         category:'foodie',   budget:'¥4,000〜8,000', duration:'6時間',  season:'オールシーズン',img:'🐙', rank:7,  likes:187, tags:['グルメ','道頓堀','食い倒れ'],          spots:['道頓堀','たこ焼きミュージアム','黒門市場','心斎橋'] },
  { id:8,  title:'六本木 × アート＆バーコース',     area:'六本木・麻布', category:'cultural', budget:'¥10,000〜18,000',duration:'7時間', season:'オールシーズン',img:'🎭', rank:8,  likes:176, tags:['アート','バー','ラグジュアリー'],       spots:['森美術館','国立新美術館','六本木ヒルズ展望台','バー'] },
  { id:9,  title:'新宿 × 節約デートコース',         area:'新宿・渋谷',   category:'budget',   budget:'〜¥3,000',      duration:'6時間',  season:'オールシーズン',img:'💴', rank:9,  likes:165, tags:['節約','公園','無料スポット'],          spots:['新宿御苑(無料日)','代々木公園','ピクニック','ドトール'] },
  { id:10, title:'横浜 × 山手洋館＆中華街コース',  area:'横浜',         category:'cultural', budget:'¥5,000〜8,000', duration:'7時間',  season:'春秋',         img:'🏛️', rank:10, likes:154, tags:['洋館','中華街','横浜散策'],           spots:['山手洋館群','港の見える丘公園','中華街','元町商店街'] },
  { id:11, title:'お台場 × 水族館コース',           area:'お台場・湾岸', category:'active',   budget:'¥6,000〜10,000',duration:'7時間',  season:'オールシーズン',img:'🐠', rank:11, likes:143, tags:['水族館','エンタメ','アクティブ'],       spots:['マクハリシーサイド','パレットタウン','アクアシティ','水族館'] },
  { id:12, title:'京都 × 祇園・清水寺コース',       area:'京都',         category:'romantic', budget:'¥6,000〜11,000',duration:'8時間',  season:'春',           img:'⛩️', rank:12, likes:132, tags:['桜','祇園','清水寺'],                 spots:['清水寺','二年坂・三年坂','円山公園','祇園花見小路'] },
  { id:13, title:'渋谷 × トレンドスポット巡りコース',area:'新宿・渋谷',  category:'active',   budget:'¥5,000〜9,000', duration:'6時間',  season:'春夏',         img:'🎵', rank:13, likes:121, tags:['渋谷','トレンド','ショッピング'],      spots:['渋谷スカイ','ヒカリエ','渋谷ストリーム','代官山蔦屋書店'] },
  { id:14, title:'大阪 × 大阪城＆海遊館コース',    area:'大阪',         category:'active',   budget:'¥4,000〜7,000', duration:'5時間',  season:'オールシーズン',img:'🏯', rank:14, likes:110, tags:['大阪','エンタメ','アクティブ'],        spots:['大阪城公園','海遊館','なんばパークス','居酒屋ディナー'] },
  { id:15, title:'原宿 × ショッピング＆スイーツコース',area:'原宿・表参道',category:'budget', budget:'¥3,000〜6,000', duration:'5時間',  season:'春夏',         img:'🛍️', rank:15, likes:98,  tags:['ショッピング','節約','スイーツ'],       spots:['竹下通り','キャットストリート','明治神宮','クレープ食べ歩き'] }
];

/* ===================== REVIEWS DATA ===================== */
const REVIEWS_DATA = [
  { name:'えりな', age:24, avatar:'👩', rating:5, text:'初デートで使ったらすごく盛り上がりました！コースが細かくて当日の流れが完璧でした。彼氏にも「計画力すごい」って褒められた😊', area:'新宿', relation:'初デート', date:'2025年1月' },
  { name:'けんた', age:28, avatar:'👨', rating:5, text:'記念日プランで使いました。プロポーズのシチュエーションまで盛り込んでくれて最高でした。彼女も大喜びでOKをもらえました！', area:'横浜', relation:'プロポーズ', date:'2024年12月' },
  { name:'さくら', age:22, avatar:'🌸', rating:5, text:'雨の日でも楽しめるプランを生成してくれて助かりました。屋内スポットがちゃんと組み込まれてて全然困らなかった！', area:'お台場', relation:'付き合いたて', date:'2025年1月' },
  { name:'ゆうき', age:31, avatar:'🧑', rating:4, text:'グルメコースを生成したら本当に食べる系スポットばっかりで大満足。予算内でこんなに美味しいものが食べられるとは思わなかった。', area:'大阪', relation:'安定期', date:'2024年11月' },
  { name:'まいこ', age:26, avatar:'👱‍♀️', rating:5, text:'着物体験コースがめちゃくちゃ良かったです。写真もたくさん撮れてインスタ映えも完璧。次は京都プランも試してみます！', area:'浅草', relation:'記念日', date:'2025年1月' },
  { name:'りょう', age:29, avatar:'🧔', rating:5, text:'長期カップルで「また同じデートか…」ってなってたけど、新しいスポットをたくさん知れてすごく新鮮だった。2人の仲も深まりました。', area:'六本木', relation:'長期カップル', date:'2024年12月' }
];

/* ===================== FAQ DATA ===================== */
const FAQ_DATA = [
  { q:'DateCraftは無料で使えますか？', a:'はい、完全無料でご利用いただけます。会員登録も不要です。コース生成・保存・シェアすべての機能を無料でお使いいただけます。' },
  { q:'何通りのデートコースが生成できますか？', a:'6つの質問（エリア×季節×天気×ムード×予算×関係性）の組み合わせで72通り以上のコースを生成できます。さらにテーマ選択で細かくカスタマイズが可能です。' },
  { q:'生成したコースは保存できますか？', a:'はい、「保存する」ボタンを押すとブラウザのLocalStorageに保存されます。同じデバイス・ブラウザであれば次回訪問時も閲覧できます。なおブラウザのデータを削除すると消えますのでご注意ください。' },
  { q:'友達やパートナーにコースをシェアできますか？', a:'「シェアする」ボタンからLINE・X(Twitter)・リンクコピーの3種類でシェアできます。大切な人にプランを送って一緒にデートを楽しみましょう。' },
  { q:'対応エリアはどこですか？', a:'現在、新宿・渋谷 / 浅草・上野 / 原宿・表参道 / お台場・湾岸 / 六本木・麻布 / 横浜 / 京都 / 大阪 の8エリアに対応しています。今後さらにエリアを追加予定です。' },
  { q:'雨の日でも使えるコースはありますか？', a:'はい！Step2の「天気」で「雨」を選ぶと、屋内スポット中心のコースが生成されます。また、テーマ選択で「雨でもOK」を選択すると屋内スポットをより優先したプランになります。' },
  { q:'スポットの情報は最新ですか？', a:'コンテンツは定期的に更新していますが、営業時間・料金・休業日については各スポットの公式情報をご確認ください。DateCraftは情報の正確性を保証するものではありません。' },
  { q:'広告掲載はどうすれば良いですか？', a:'フッターの「広告掲載について」リンク、またはお問い合わせフォームよりご連絡ください。デートに関連したサービス・商品の広告を歓迎します。' }
];

/* ===================== COURSES DB ===================== */
const COURSES = {
  'tokyo-shinjuku': {
    romantic: {
      low: { title:'新宿 ロマンチック節約プラン', desc:'無料スポットを組み合わせた、コスパ最強のムードあふれるコース', emoji:'🌿',
        spots:[
          { time:'10:00', name:'新宿御苑 散策',        note:'広大な庭園でゆっくりお散歩',        cost:'¥500',   icon:'🌿', duration:'90分' },
          { time:'12:00', name:'新宿三丁目 隠れ家カフェ', note:'路地裏の静かなカフェでランチ',     cost:'¥1,500', icon:'☕', duration:'60分' },
          { time:'14:00', name:'代々木公園 ピクニック', note:'木陰でのんびり過ごす',              cost:'¥0',     icon:'🌳', duration:'90分' },
          { time:'16:30', name:'東京都庁展望台',        note:'無料で楽しめる夕暮れの絶景',        cost:'¥0',     icon:'🏙️', duration:'60分' },
          { time:'18:30', name:'新宿思い出横丁',        note:'屋台でリーズナブルな夕食',          cost:'¥2,000', icon:'🍻', duration:'90分' }
        ], totalCost:'¥4,000〜5,000', totalTime:'約8.5時間' },
      mid: { title:'新宿 ロマンチック夜景プラン', desc:'洗練されたカフェとネオン輝く夜景で彩る特別なコース', emoji:'🌃',
        spots:[
          { time:'11:00', name:'新宿御苑 モーニング散策', note:'緑豊かな庭園で朝の爽やかな時間', cost:'¥500',   icon:'🌸', duration:'90分' },
          { time:'13:00', name:'ルノアール 高級店でランチ', note:'大人な雰囲気のランチタイム',     cost:'¥2,500', icon:'🍽️', duration:'60分' },
          { time:'15:00', name:'表参道ウィンドウショッピング', note:'おしゃれなブランド街を歩く', cost:'¥0',     icon:'🛍️', duration:'90分' },
          { time:'17:30', name:'高層ビルのスカイバー',   note:'夕暮れ時にカクテルを',             cost:'¥3,000', icon:'🍹', duration:'60分' },
          { time:'19:30', name:'フレンチレストランでディナー', note:'ふたりきりの贅沢な夜',       cost:'¥6,000', icon:'🥂', duration:'120分' }
        ], totalCost:'¥12,000〜15,000', totalTime:'約9.5時間' },
      high: { title:'新宿 プレミアムナイトプラン', desc:'最高級のディナーと夜景で彩る、忘れられない特別な夜', emoji:'💎',
        spots:[
          { time:'12:00', name:'ANAインターコンチネンタル ランチ', note:'ホテルのラグジュアリーランチ', cost:'¥8,000',  icon:'🥗', duration:'90分' },
          { time:'14:00', name:'表参道ギャラリー鑑賞',  note:'アートと感性を刺激する空間',        cost:'¥1,000', icon:'🎨', duration:'60分' },
          { time:'16:00', name:'ラウンジでアフタヌーンティー', note:'優雅なひとときをふたりで',   cost:'¥5,000', icon:'🫖', duration:'90分' },
          { time:'18:30', name:'東京タワー特別展望台',  note:'ライトアップが始まる時間に',         cost:'¥2,000', icon:'🗼', duration:'60分' },
          { time:'20:00', name:'新宿高層ビル最上階フレンチ', note:'夜景を独占するディナー',       cost:'¥15,000',icon:'🌃', duration:'150分' }
        ], totalCost:'¥31,000〜35,000', totalTime:'約10時間' }
    },
    foodie: {
      low: { title:'新宿 食べ歩きグルメコース', desc:'新宿の名店から地元グルメまで食べ歩きで楽しむ', emoji:'🍜',
        spots:[
          { time:'11:00', name:'新宿御苑でピクニック',  note:'コンビニで買ったもので節約',         cost:'¥800',   icon:'🍱', duration:'60分' },
          { time:'13:00', name:'東口 ラーメン激戦区',   note:'行列ができる人気ラーメン',           cost:'¥1,200', icon:'🍜', duration:'60分' },
          { time:'15:00', name:'甲州街道 老舗和菓子',   note:'職人が作る絶品和菓子',              cost:'¥500',   icon:'🍡', duration:'30分' },
          { time:'16:00', name:'歌舞伎町横丁 食べ歩き', note:'多様なグルメが集まるエリア',        cost:'¥1,200', icon:'🥘', duration:'90分' },
          { time:'18:30', name:'思い出横丁 焼き鳥',     note:'昭和レトロな焼き鳥で乾杯',          cost:'¥2,000', icon:'🍢', duration:'90分' }
        ], totalCost:'¥5,700〜7,000', totalTime:'約8時間' },
      mid: { title:'新宿 ガストロノミーツアー', desc:'各国料理からスイーツまで新宿の美食を堪能するコース', emoji:'🍽️',
        spots:[
          { time:'11:00', name:'新宿伊勢丹 地下食料品売り場', note:'デパ地下でつまみ食い巡り',   cost:'¥1,000', icon:'🏪', duration:'60分' },
          { time:'12:30', name:'タカシマヤ 人気ビストロ', note:'フランスからの直輸入食材使用',   cost:'¥3,500', icon:'🇫🇷', duration:'90分' },
          { time:'15:00', name:'表参道 話題のパフェカフェ', note:'SNSで話題のフォトジェニックスイーツ', cost:'¥1,500', icon:'🍨', duration:'60分' },
          { time:'17:00', name:'新宿 スパイスカレー専門店', note:'本格スパイスカレーで夕食前の一品', cost:'¥1,000', icon:'🍛', duration:'45分' },
          { time:'19:00', name:'南新宿 人気イタリアン',  note:'ワインと本格パスタのディナー',      cost:'¥5,000', icon:'🍝', duration:'120分' }
        ], totalCost:'¥12,000〜14,000', totalTime:'約9時間' },
      high: { title:'新宿 美食の旅プレミアム', desc:'星付きシェフの料理と最高級食材でふたりの舌を喜ばせる', emoji:'⭐',
        spots:[
          { time:'12:00', name:'高島屋タイムズスクエア ミシュラン店ランチ', note:'星付きシェフの昼のコース', cost:'¥10,000', icon:'⭐', duration:'120分' },
          { time:'15:00', name:'ホテルハイアット スイーツビュッフェ', note:'高級ホテルのアフタヌーンティー', cost:'¥5,000', icon:'🎂', duration:'90分' },
          { time:'17:30', name:'バースバー 稀少ウイスキー体験', note:'希少銘柄のバーテンダー解説付き試飲', cost:'¥4,000', icon:'🥃', duration:'60分' },
          { time:'19:30', name:'新宿最上階 フレンチ懐石', note:'和のエッセンスを取り入れたフランス料理', cost:'¥20,000', icon:'🌌', duration:'180分' }
        ], totalCost:'¥39,000〜45,000', totalTime:'約10時間' }
    },
    active: {
      low: { title:'新宿 アクティブ散策コース', desc:'歩きながらトレンドスポットを制覇する充実のコース', emoji:'🏃',
        spots:[
          { time:'09:00', name:'代々木公園 朝ジョギング', note:'ふたりでウォーミングアップ',       cost:'¥0',     icon:'🌳', duration:'60分' },
          { time:'10:30', name:'竹下通り 原宿散策',       note:'トレンドを肌で感じる',              cost:'¥500',   icon:'🛍️', duration:'60分' },
          { time:'12:30', name:'原宿 クレープ食べ歩き',   note:'定番スイーツを楽しもう',            cost:'¥800',   icon:'🥞', duration:'30分' },
          { time:'14:00', name:'渋谷スクランブル交差点',  note:'スタバ渋谷店で絶景カフェ',          cost:'¥600',   icon:'☕', duration:'60分' },
          { time:'16:00', name:'渋谷ヒカリエ',            note:'おしゃれな店を巡る',                cost:'¥0',     icon:'🏢', duration:'90分' },
          { time:'18:00', name:'渋谷 立ち飲み居酒屋',    note:'コスパ最高の乾杯タイム',            cost:'¥2,000', icon:'🍺', duration:'90分' }
        ], totalCost:'¥3,900〜5,000', totalTime:'約9時間' },
      mid: { title:'新宿・渋谷 トレンド体験コース', desc:'渋谷スカイから原宿のトレンドスポットを完全制覇', emoji:'🎵',
        spots:[
          { time:'10:00', name:'渋谷スカイ 展望台',       note:'渋谷を一望する絶景スポット',        cost:'¥2,000', icon:'🌆', duration:'60分' },
          { time:'12:00', name:'ヒカリエ ShinQs でランチ', note:'おしゃれなフードコートで好きなものを', cost:'¥2,000', icon:'🍴', duration:'60分' },
          { time:'14:00', name:'代官山 蔦屋書店散策',     note:'センス溢れる本屋でゆったりと',      cost:'¥0',     icon:'📚', duration:'60分' },
          { time:'16:00', name:'中目黒 目黒川沿いカフェ', note:'おしゃれなテラスカフェでひと休み',  cost:'¥1,500', icon:'🌿', duration:'60分' },
          { time:'18:30', name:'恵比寿ガーデンプレイス', note:'フォトジェニックな広場でディナー前に', cost:'¥0',    icon:'🌉', duration:'60分' },
          { time:'20:00', name:'恵比寿 人気ビストロ',     note:'一日の締めに美味しいワインとお肉',  cost:'¥6,000', icon:'🥩', duration:'120分' }
        ], totalCost:'¥11,500〜13,000', totalTime:'約10時間' },
      high: { title:'新宿 体験型プレミアムコース', desc:'スパ・料理体験・夜景バーで五感を満たすラグジュアリーデー', emoji:'✨',
        spots:[
          { time:'10:00', name:'ホテルのモーニングスパ', note:'ふたりでリラクゼーションから始める一日', cost:'¥8,000', icon:'♨️', duration:'90分' },
          { time:'12:30', name:'フードスタジオ 料理体験', note:'プロに教わるふたりの料理教室',      cost:'¥6,000', icon:'👨‍🍳', duration:'120分' },
          { time:'15:30', name:'表参道 ブランドショッピング', note:'お互いへのプチギフトを探す',    cost:'¥5,000', icon:'💝', duration:'90分' },
          { time:'18:30', name:'六本木ヒルズ 夜景バー',  note:'東京の夜景を眺めながらシャンパン',   cost:'¥5,000', icon:'🥂', duration:'90分' },
          { time:'20:30', name:'六本木 鉄板焼き',         note:'目の前で焼かれるステーキに感動',    cost:'¥18,000',icon:'🥩', duration:'120分' }
        ], totalCost:'¥42,000〜50,000', totalTime:'約11時間' }
    },
    relaxing: {
      low: { title:'新宿 のんびりまったりコース', desc:'急がない、のんびり過ごすふたりだけの時間', emoji:'☁️',
        spots:[
          { time:'11:00', name:'新宿御苑 ゆったり散歩',  note:'季節の花を眺めながらのんびり',      cost:'¥500',   icon:'🌸', duration:'120分' },
          { time:'13:30', name:'カフェで長居ランチ',      note:'静かなカフェで会話を楽しもう',      cost:'¥1,200', icon:'☕', duration:'120分' },
          { time:'16:00', name:'本屋でお互いのおすすめを紹介', note:'ブックオフで掘り出し物探し',  cost:'¥500',   icon:'📚', duration:'60分' },
          { time:'18:00', name:'公園で夕焼けを眺める',   note:'ふたりで夕暮れをぼーっと眺める',   cost:'¥0',     icon:'🌅', duration:'60分' },
          { time:'19:30', name:'居酒屋でゆっくり夕食',   note:'お気に入りの居酒屋で話に花を咲かせる', cost:'¥2,500', icon:'🍶', duration:'120分' }
        ], totalCost:'¥4,700〜6,000', totalTime:'約8.5時間' },
      mid: { title:'新宿 スローライフ癒しコース', desc:'カフェとアート鑑賞で心と体をリフレッシュする癒しの一日', emoji:'🧘',
        spots:[
          { time:'10:30', name:'モーニングヨガ体験',      note:'ふたりで心を整えるリラックスタイム', cost:'¥2,000', icon:'🧘', duration:'60分' },
          { time:'12:30', name:'静かな隠れ家ランチ',      note:'路地裏のひっそりしたビストロ',      cost:'¥2,500', icon:'🍽️', duration:'90分' },
          { time:'15:00', name:'美術鑑賞 都立美術館',     note:'静寂の中でアートを感じる',          cost:'¥800',   icon:'🖼️', duration:'90分' },
          { time:'17:30', name:'代々木公園 黄昏タイム',   note:'木漏れ日の中でコーヒーブレイク',    cost:'¥500',   icon:'🌿', duration:'60分' },
          { time:'19:30', name:'温かいお鍋専門店',        note:'ふたりでほっこり鍋を囲む',          cost:'¥4,000', icon:'🫕', duration:'120分' }
        ], totalCost:'¥9,800〜12,000', totalTime:'約9時間' },
      high: null
    },
    cultural: {
      low: { title:'新宿 下町文化散策コース', desc:'無料スポットで新宿の文化と歴史を深堀りするコース', emoji:'🎨',
        spots:[
          { time:'10:00', name:'新宿歴史博物館',          note:'地元の歴史を無料で学ぶ',            cost:'¥300',   icon:'🏛️', duration:'60分' },
          { time:'12:00', name:'荒木町 昭和カフェ',        note:'昭和レトロな雰囲気でランチ',        cost:'¥1,000', icon:'🏚️', duration:'60分' },
          { time:'14:00', name:'花園神社 散策',            note:'新宿総鎮守の歴史ある神社',          cost:'¥0',     icon:'⛩️', duration:'45分' },
          { time:'15:30', name:'紀伊国屋書店',             note:'日本最大級の書店でお互いの好みを知る', cost:'¥500', icon:'📚', duration:'60分' },
          { time:'18:00', name:'思い出横丁 レトロ居酒屋', note:'昭和の雰囲気そのままの横丁で乾杯',  cost:'¥2,000', icon:'🍻', duration:'120分' }
        ], totalCost:'¥3,800〜5,000', totalTime:'約8時間' },
      mid: { title:'新宿 アート＆文化探求コース', desc:'ギャラリーと博物館でインテリジェントな一日', emoji:'🖼️',
        spots:[
          { time:'10:00', name:'オペラシティ アートギャラリー', note:'現代アートの第一線を体感',    cost:'¥1,200', icon:'🎭', duration:'90分' },
          { time:'12:30', name:'初台 アーティストカフェ', note:'アーティストが集まるカフェでランチ', cost:'¥2,000', icon:'🖌️', duration:'60分' },
          { time:'14:30', name:'東京都写真美術館',         note:'写真という芸術を深く鑑賞',          cost:'¥700',   icon:'📷', duration:'90分' },
          { time:'17:00', name:'代官山 アートブックショップ', note:'世界のアートブックを眺める',     cost:'¥500',   icon:'📗', duration:'60分' },
          { time:'19:00', name:'ジャズバーで締め',         note:'生演奏を聴きながらドリンク',        cost:'¥4,000', icon:'🎷', duration:'120分' }
        ], totalCost:'¥8,400〜10,000', totalTime:'約9.5時間' },
      high: null
    },
    adventure: {
      low: { title:'新宿 冒険&体験コース（節約版）', desc:'無料・格安のアクティビティでアドベンチャーな一日', emoji:'🗺️',
        spots:[
          { time:'09:30', name:'代々木公園 フリスビー',   note:'100均フリスビーで思い切り遊ぼう',   cost:'¥100',   icon:'🌳', duration:'60分' },
          { time:'11:30', name:'竹下通りコスプレ見学',    note:'個性豊かなファッションを楽しむ',    cost:'¥0',     icon:'🎭', duration:'60分' },
          { time:'13:30', name:'新宿ゲームセンター対決', note:'クレーンゲームで勝負！',             cost:'¥1,000', icon:'🎮', duration:'90分' },
          { time:'16:00', name:'東京都庁展望台 記念写真',note:'無料の展望台で自撮り大会',           cost:'¥0',     icon:'🏙️', duration:'60分' },
          { time:'18:30', name:'新宿東口 カラオケ',       note:'2人で熱唱！',                       cost:'¥2,000', icon:'🎤', duration:'120分' }
        ], totalCost:'¥3,100〜4,500', totalTime:'約9時間' },
      mid: { title:'新宿 アドベンチャー体験コース', desc:'体験型アクティビティで刺激的な思い出を作るコース', emoji:'⚡',
        spots:[
          { time:'10:00', name:'渋谷 ボルダリングジム体験', note:'初心者OKのスポーツクライミング', cost:'¥2,500', icon:'🧗', duration:'90分' },
          { time:'13:00', name:'スポーツカフェでランチ', note:'達成感とともにボリュームランチ',      cost:'¥1,800', icon:'🍔', duration:'60分' },
          { time:'15:00', name:'VRアーケード 最新体験',   note:'最新VRゲームでふたりで冒険',        cost:'¥2,000', icon:'🥽', duration:'90分' },
          { time:'17:30', name:'渋谷スカイ 夕暮れ展望',  note:'一日の冒険を締めくくる絶景',         cost:'¥2,000', icon:'🌇', duration:'60分' },
          { time:'19:30', name:'ジンギスカン食べ放題',   note:'ガッツリ食べて達成感を味わう',       cost:'¥4,000', icon:'🥩', duration:'90分' }
        ], totalCost:'¥12,300〜14,000', totalTime:'約10時間' },
      high: null
    }
  },
  'tokyo-asakusa': {
    romantic: {
      low: { title:'浅草 和風ロマンチックコース', desc:'江戸情緒あふれる下町でのんびりロマンチックな一日', emoji:'🏮',
        spots:[
          { time:'10:00', name:'浅草寺・仲見世通り',     note:'朝の静かな浅草を散策',              cost:'¥0',     icon:'⛩️', duration:'60分' },
          { time:'11:30', name:'老舗甘味処でぜんざい',   note:'江戸時代から続く甘味を味わう',      cost:'¥800',   icon:'🍡', duration:'45分' },
          { time:'13:00', name:'上野公園 ピクニック',    note:'木陰でお弁当を楽しむ',              cost:'¥800',   icon:'🌳', duration:'90分' },
          { time:'15:30', name:'スカイツリー展望回廊',   note:'東京の絶景をふたりで',              cost:'¥2,060', icon:'🗼', duration:'60分' },
          { time:'18:00', name:'浅草 隅田川沿いの居酒屋', note:'川の流れを眺めながら晩酌',         cost:'¥2,500', icon:'🍶', duration:'120分' }
        ], totalCost:'¥6,160〜8,000', totalTime:'約8.5時間' },
      mid: { title:'浅草 着物ロマンチックデート', desc:'着物姿でめぐる浅草の粋なデートコース', emoji:'👘',
        spots:[
          { time:'10:00', name:'着物レンタル & 着付け',  note:'ふたりでお気に入りの着物を選ぶ',    cost:'¥4,000', icon:'👘', duration:'60分' },
          { time:'11:30', name:'浅草寺〜仲見世通り散策', note:'着物姿で江戸の街並みをそぞろ歩き',  cost:'¥500',   icon:'🏮', duration:'90分' },
          { time:'13:30', name:'浅草老舗の天丼ランチ',   note:'江戸前天丼の名店で本格ランチ',      cost:'¥2,500', icon:'🍤', duration:'60分' },
          { time:'15:30', name:'スカイツリー 天望デッキ', note:'着物姿で東京の空を望む',           cost:'¥2,100', icon:'🌆', duration:'60分' },
          { time:'18:00', name:'浅草橋 屋形船ディナー',  note:'隅田川をゆく屋形船で夜景を楽しむ',  cost:'¥8,000', icon:'🚢', duration:'150分' }
        ], totalCost:'¥17,100〜20,000', totalTime:'約9時間' },
      high: null
    },
    foodie: {
      low: { title:'浅草 下町グルメ食べ歩きコース', desc:'江戸の食文化を食べ歩きで楽しむ下町グルメツアー', emoji:'🍢',
        spots:[
          { time:'11:00', name:'仲見世通り 人形焼き食べ歩き', note:'老舗の人形焼を頬張りながら歩く', cost:'¥400', icon:'🍩', duration:'45分' },
          { time:'12:00', name:'浅草 ホルモン焼きランチ', note:'地元民御用達のリーズナブルランチ',  cost:'¥1,200', icon:'🥩', duration:'60分' },
          { time:'14:00', name:'上野 アメ横 食べ歩き',   note:'活気あふれる市場でつまみ食い',      cost:'¥1,000', icon:'🥜', duration:'60分' },
          { time:'16:00', name:'谷中銀座 コロッケ食べ歩き', note:'昭和の商店街でコロッケ',         cost:'¥300',   icon:'🥔', duration:'45分' },
          { time:'18:30', name:'浅草 もつ煮込み老舗',    note:'下町の名物もつ煮込みで締め',        cost:'¥1,800', icon:'🫕', duration:'90分' }
        ], totalCost:'¥4,700〜6,000', totalTime:'約7.5時間' },
      mid: null, high: null
    },
    active: { low: null, mid: null, high: null },
    relaxing: { low: null, mid: null, high: null },
    cultural: {
      low: { title:'浅草・上野 文化探求コース', desc:'美術館・博物館と下町文化を無料・格安で楽しむ', emoji:'🏛️',
        spots:[
          { time:'09:30', name:'東京国立博物館（無料日）', note:'日本最古の博物館で歴史を体感',     cost:'¥0',     icon:'🏛️', duration:'120分' },
          { time:'12:00', name:'アメ横でランチ',           note:'さまざまな国の料理が楽しめる',     cost:'¥1,000', icon:'🌍', duration:'60分' },
          { time:'14:00', name:'浅草神社・浅草寺 参拝',   note:'下町の信仰と文化を学ぶ',          cost:'¥0',     icon:'⛩️', duration:'60分' },
          { time:'16:00', name:'浅草 伝統工芸品店巡り',   note:'江戸の職人技に触れる',             cost:'¥500',   icon:'🎎', duration:'60分' },
          { time:'18:30', name:'もんじゃ焼き体験',         note:'東京下町の名物を自分たちで作る',   cost:'¥2,500', icon:'🍳', duration:'90分' }
        ], totalCost:'¥4,000〜5,500', totalTime:'約9時間' },
      mid: { title:'浅草 伝統体験＆文化コース', desc:'着物・茶道・伝統工芸でジャパンカルチャーを満喫', emoji:'🎎',
        spots:[
          { time:'10:00', name:'着物レンタル 散策',       note:'下町を和装でぶらり',               cost:'¥3,500', icon:'👘', duration:'240分' },
          { time:'14:30', name:'東京国立博物館',           note:'日本美術の最高峰を観賞',           cost:'¥1,000', icon:'🗿', duration:'90分' },
          { time:'17:00', name:'茶道体験 老舗茶室',       note:'本格的な茶の湯を学ぶ',             cost:'¥3,000', icon:'🍵', duration:'90分' },
          { time:'19:30', name:'浅草 料亭 コース料理',    note:'和の美学の結晶、kaiseki',          cost:'¥8,000', icon:'🍱', duration:'120分' }
        ], totalCost:'¥15,500〜18,000', totalTime:'約10時間' },
      high: null
    },
    adventure: { low: null, mid: null, high: null }
  },
  'tokyo-harajuku': {
    romantic: {
      low: null,
      mid: { title:'原宿 ロマンチックカップルコース', desc:'原宿・表参道のおしゃれスポットを巡るトレンディなデート', emoji:'🌹',
        spots:[
          { time:'11:00', name:'明治神宮 朝の参拝',       note:'神聖な空気の中でふたりの誓いを',   cost:'¥0',     icon:'⛩️', duration:'60分' },
          { time:'13:00', name:'表参道ヒルズ おしゃれランチ', note:'開放的な空間でゆったりランチ', cost:'¥3,000', icon:'🌿', duration:'90分' },
          { time:'15:30', name:'キャットストリートぶらり', note:'個性的なショップを探索',           cost:'¥0',     icon:'🛍️', duration:'60分' },
          { time:'17:30', name:'表参道 ルーフトップカフェ', note:'夕暮れの空を見ながらドリンク',   cost:'¥1,500', icon:'🌆', duration:'60分' },
          { time:'19:30', name:'南青山 イタリアン',        note:'隠れ家イタリアンで本格ディナー',   cost:'¥6,000', icon:'🍝', duration:'120分' }
        ], totalCost:'¥10,500〜12,000', totalTime:'約9時間' },
      high: null
    },
    foodie: {
      low: null,
      mid: { title:'原宿 スイーツ&カフェ巡りコース', desc:'話題のカフェとスイーツを制覇する甘い一日', emoji:'🍰',
        spots:[
          { time:'11:00', name:'竹下通り クレープ',       note:'原宿の定番スイーツからスタート',   cost:'¥800',   icon:'🥞', duration:'30分' },
          { time:'12:00', name:'フォトジェニックカフェ ランチ', note:'SNS映えするランチプレート',  cost:'¥1,800', icon:'📸', duration:'90分' },
          { time:'14:30', name:'チーズケーキ専門店',       note:'話題の濃厚チーズケーキ',           cost:'¥800',   icon:'🧀', duration:'45分' },
          { time:'16:30', name:'かき氷専門店',             note:'職人かき氷で涼を取る',             cost:'¥1,200', icon:'🍧', duration:'45分' },
          { time:'18:30', name:'代官山 ナチュラルビストロ', note:'オーガニック食材の創作料理',       cost:'¥5,000', icon:'🥗', duration:'120分' }
        ], totalCost:'¥9,600〜11,000', totalTime:'約8.5時間' },
      high: null
    },
    active: { low: null, mid: null, high: null },
    relaxing: { low: null, mid: null, high: null },
    cultural: { low: null, mid: null, high: null },
    adventure: { low: null, mid: null, high: null }
  },
  'tokyo-odaiba': {
    romantic: {
      low: null,
      mid: { title:'お台場 夜景&イルミネーションコース', desc:'レインボーブリッジの夜景とイルミネーションで彩るロマンチックナイト', emoji:'🌉',
        spots:[
          { time:'14:00', name:'お台場海浜公園 散策',     note:'自由の女神と東京湾を背景に写真撮影', cost:'¥0',   icon:'🗽', duration:'60分' },
          { time:'16:00', name:'水族館 マクハリ',          note:'ふたりで海の世界に浸る',            cost:'¥2,250', icon:'🐠', duration:'90分' },
          { time:'18:30', name:'アクアシティ ダイバーシティ', note:'巨大ガンダムと夕暮れの写真',    cost:'¥0',     icon:'🤖', duration:'45分' },
          { time:'20:00', name:'観覧車 イルミネーション', note:'ゆっくり回る観覧車でロマンチックな夜', cost:'¥900', icon:'🎡', duration:'30分' },
          { time:'21:00', name:'お台場夜景カフェ',         note:'ライトアップされた夜景をおともに',  cost:'¥3,000', icon:'🌃', duration:'90分' }
        ], totalCost:'¥6,150〜8,000', totalTime:'約7.5時間' },
      high: null
    },
    foodie: { low: null, mid: null, high: null },
    active: {
      low: null,
      mid: { title:'お台場 体験型アクティビティコース', desc:'チームラボから水上バスまでお台場を遊び尽くす', emoji:'🎮',
        spots:[
          { time:'10:00', name:'チームラボプラネッツ',     note:'没入体験型デジタルアートの世界',    cost:'¥3,200', icon:'✨', duration:'90分' },
          { time:'13:00', name:'ダイバーシティ フードコート', note:'多彩なグルメからお好みで',       cost:'¥1,500', icon:'🍴', duration:'60分' },
          { time:'15:00', name:'SUP体験 東京湾',           note:'スタンドアップパドルで東京湾を漕ぐ', cost:'¥4,000', icon:'🏄', duration:'90分' },
          { time:'18:00', name:'水上バス 日の出桟橋へ',    note:'東京湾クルーズで移動も楽しむ',      cost:'¥800',   icon:'⛵', duration:'40分' },
          { time:'20:00', name:'浜離宮恩賜庭園 ライトアップ', note:'和の庭園の幻想的な夜（季節限定）', cost:'¥500', icon:'🌸', duration:'60分' }
        ], totalCost:'¥10,000〜12,000', totalTime:'約10時間' },
      high: null
    },
    relaxing: { low: null, mid: null, high: null },
    cultural: { low: null, mid: null, high: null },
    adventure: { low: null, mid: null, high: null }
  },
  'tokyo-roppongi': {
    romantic: {
      low: null, mid: null,
      high: { title:'六本木 ラグジュアリーナイトコース', desc:'六本木の最高峰スポットでふたりだけのプレミアムな夜', emoji:'✨',
        spots:[
          { time:'17:00', name:'国立新美術館 夕方入館',   note:'閉館間際の静かな美術館でアートを堪能', cost:'¥1,500', icon:'🎨', duration:'90分' },
          { time:'19:30', name:'六本木ヒルズ 52F バー',   note:'東京の夜景を見下ろすルーフトップバー', cost:'¥5,000', icon:'🌃', duration:'90分' },
          { time:'21:30', name:'プライベートダイニング 特別席', note:'完全個室の高級フランス料理',  cost:'¥20,000',icon:'🥂', duration:'150分' }
        ], totalCost:'¥26,500〜32,000', totalTime:'約6時間（夜限定）' }
    },
    foodie: { low: null, mid: null, high: null },
    active: { low: null, mid: null, high: null },
    relaxing: { low: null, mid: null, high: null },
    cultural: {
      low: null,
      mid: { title:'六本木 アート三角形コース', desc:'国立新美術館・森美術館・サントリー美術館を巡るアートの旅', emoji:'🖼️',
        spots:[
          { time:'10:00', name:'国立新美術館',             note:'日本最大級の展示スペースで企画展を',  cost:'¥1,500', icon:'🏛️', duration:'90分' },
          { time:'13:00', name:'六本木ヒルズ カフェランチ', note:'森の中に溶け込む開放的なカフェ',    cost:'¥2,500', icon:'🌿', duration:'60分' },
          { time:'15:00', name:'森美術館',                  note:'現代アートの最前線を六本木の高みから', cost:'¥2,000', icon:'🎭', duration:'90分' },
          { time:'17:30', name:'サントリー美術館',          note:'日本の美を結集した工芸の世界',       cost:'¥1,500', icon:'🏺', duration:'90分' },
          { time:'20:00', name:'六本木 ワインバー',         note:'アートの余韻と共にナチュラルワイン',  cost:'¥5,000', icon:'🍷', duration:'120分' }
        ], totalCost:'¥12,500〜15,000', totalTime:'約10時間' },
      high: null
    },
    adventure: { low: null, mid: null, high: null }
  },
  'yokohama': {
    romantic: {
      low: null,
      mid: { title:'横浜 みなとみらいロマンチックコース', desc:'みなとみらいの美しい夜景とガーデンプレイスで過ごすロマンチックな一日', emoji:'⛵',
        spots:[
          { time:'11:00', name:'赤レンガ倉庫 散策',       note:'横浜の象徴的スポットでお散歩',      cost:'¥0',     icon:'🏚️', duration:'60分' },
          { time:'12:30', name:'ハンマーヘッド レストラン', note:'港を眺める人気レストランでランチ',  cost:'¥3,500', icon:'🍽️', duration:'90分' },
          { time:'15:00', name:'山下公園〜港の見える丘公園', note:'横浜港と薔薇の公園でお散歩',     cost:'¥0',     icon:'🌹', duration:'90分' },
          { time:'17:30', name:'コスモワールド 観覧車',   note:'みなとみらいの夕暮れを観覧車から',  cost:'¥800',   icon:'🎡', duration:'30分' },
          { time:'19:30', name:'みなとみらい 夜景レストラン', note:'横浜港の夜景を眺めながらディナー', cost:'¥6,000', icon:'🌉', duration:'120分' }
        ], totalCost:'¥10,300〜12,000', totalTime:'約9時間' },
      high: null
    },
    foodie: {
      low: null,
      mid: { title:'横浜 多国籍グルメツアー', desc:'中華街・横浜発祥グルメ・異国情緒を食で感じるコース', emoji:'🥟',
        spots:[
          { time:'11:00', name:'横浜中華街 飲茶ランチ',   note:'本格広東料理の食べ歩き',            cost:'¥2,000', icon:'🥟', duration:'90分' },
          { time:'14:00', name:'横浜中華街 食べ歩き',     note:'肉まん・タピオカ・杏仁豆腐',        cost:'¥1,000', icon:'🧆', duration:'60分' },
          { time:'16:00', name:'元町商店街 カフェ',       note:'横浜最古の商店街でひと休み',        cost:'¥1,200', icon:'☕', duration:'60分' },
          { time:'18:30', name:'横浜 ランドマークタワー イタリアン', note:'港を見渡す絶景イタリアン', cost:'¥6,000', icon:'🍝', duration:'120分' }
        ], totalCost:'¥10,200〜12,000', totalTime:'約8時間' },
      high: null
    },
    active: { low: null, mid: null, high: null },
    relaxing: { low: null, mid: null, high: null },
    cultural: {
      low: null,
      mid: { title:'横浜 山手洋館＆歴史散策コース', desc:'明治・大正の洋館建築と横浜の歴史を深堀りする知的なコース', emoji:'🏛️',
        spots:[
          { time:'10:00', name:'山手洋館群 散策',         note:'西洋建築が立ち並ぶ横浜の丘を歩く', cost:'¥0',     icon:'🏡', duration:'90分' },
          { time:'12:30', name:'フランス山 ピクニックランチ', note:'洋館を眺めながらテイクアウトランチ', cost:'¥1,000', icon:'🌿', duration:'60分' },
          { time:'14:30', name:'外国人墓地 散策',          note:'横浜の近代化を支えた人々を偲ぶ',    cost:'¥200',   icon:'📿', duration:'45分' },
          { time:'16:30', name:'横浜市歴史博物館',         note:'港横浜の近代史を深く学ぶ',          cost:'¥400',   icon:'🏛️', duration:'90分' },
          { time:'19:00', name:'中華街 コース料理',        note:'横浜を代表する食文化で締めくくり',  cost:'¥5,000', icon:'🥢', duration:'120分' }
        ], totalCost:'¥6,600〜8,000', totalTime:'約9.5時間' },
      high: null
    },
    adventure: { low: null, mid: null, high: null }
  },
  'kyoto': {
    romantic: {
      low: { title:'京都 古都ロマンチックコース', desc:'四季の花々と神社仏閣が彩る京都の古都ロマンス', emoji:'⛩️',
        spots:[
          { time:'09:00', name:'平安神宮 晨参り',         note:'朝の静かな神社で二人の縁を結ぶ',   cost:'¥600',   icon:'⛩️', duration:'60分' },
          { time:'11:00', name:'南禅寺 散策',             note:'水路閣とウォーターガーデンが美しい', cost:'¥0',    icon:'🌿', duration:'60分' },
          { time:'13:00', name:'錦市場 食べ歩き',         note:'京の台所で旬の食材を味わう',        cost:'¥1,500', icon:'🎎', duration:'60分' },
          { time:'15:00', name:'八坂神社〜祇園散策',      note:'石畳の路地と町家が続く風情ある街',  cost:'¥0',     icon:'🏮', duration:'90分' },
          { time:'18:00', name:'鴨川デルタ 夕暮れ',      note:'飛び石の上で並んで夕焼けを眺める',  cost:'¥0',     icon:'🌅', duration:'60分' },
          { time:'20:00', name:'祇園 割烹料理（カウンター）', note:'京のおばんざいを職人のカウンターで', cost:'¥4,000', icon:'🍱', duration:'120分' }
        ], totalCost:'¥6,100〜8,000', totalTime:'約11時間' },
      mid: { title:'京都 嵐山×清水 ロマンチックコース', desc:'嵐山の竹林から清水の舞台まで京都の精髄を巡るコース', emoji:'🌸',
        spots:[
          { time:'09:00', name:'嵐山 竹林の小径',         note:'朝の光が差し込む幻想的な竹林を歩く', cost:'¥0',   icon:'🎋', duration:'45分' },
          { time:'10:00', name:'天龍寺 池泉回遊式庭園',   note:'世界遺産の庭園で四季を感じる',      cost:'¥500',   icon:'🏯', duration:'60分' },
          { time:'12:00', name:'嵯峨野 湯豆腐ランチ',     note:'京料理の代表格、湯豆腐の名店で',   cost:'¥3,000', icon:'🫕', duration:'90分' },
          { time:'14:30', name:'清水寺 参拝',             note:'清水の舞台から京都市街を一望',      cost:'¥400',   icon:'🗺️', duration:'60分' },
          { time:'16:30', name:'二年坂・三年坂 散策',     note:'石畳の坂道を着物姿で歩く',          cost:'¥0',     icon:'🪭', duration:'60分' },
          { time:'19:30', name:'木屋町 鴨川沿い 和食',    note:'川床料理（夏季）または個室和食',    cost:'¥7,000', icon:'🌊', duration:'120分' }
        ], totalCost:'¥10,900〜13,000', totalTime:'約11時間' },
      high: null
    },
    foodie: {
      low: { title:'京都 錦市場＆食べ歩きコース', desc:'錦市場から始まる京都のグルメ食べ歩きツアー', emoji:'🥢',
        spots:[
          { time:'10:30', name:'錦市場 食べ歩き',         note:'だし巻き卵・おつけもの・京野菜など', cost:'¥1,500', icon:'🥦', duration:'90分' },
          { time:'13:00', name:'京御膳 地元の食堂',       note:'観光地価格ではない地元の食堂',      cost:'¥800',   icon:'🍱', duration:'45分' },
          { time:'14:30', name:'嵯峨野 豆腐工房 見学&試食', note:'京豆腐の製造工程と試食',         cost:'¥500',   icon:'⬜', duration:'60分' },
          { time:'16:30', name:'河原町 甘味処 抹茶パフェ', note:'抹茶スイーツの名店でひと休み',    cost:'¥1,200', icon:'🍵', duration:'60分' },
          { time:'19:00', name:'木屋町 立ち飲みで京おばんざい', note:'リーズナブルに京の家庭料理を', cost:'¥2,000', icon:'🍶', duration:'90分' }
        ], totalCost:'¥6,000〜8,000', totalTime:'約8.5時間' },
      mid: null, high: null
    },
    active: { low: null, mid: null, high: null },
    relaxing: { low: null, mid: null, high: null },
    cultural: {
      low: null,
      mid: { title:'京都 禅寺＆伝統工芸コース', desc:'禅の精神と京の伝統工芸に触れる深い文化体験', emoji:'🎎',
        spots:[
          { time:'09:00', name:'龍安寺 石庭 静観',        note:'世界遺産の石庭で禅の世界を感じる',  cost:'¥500',   icon:'🪨', duration:'60分' },
          { time:'11:00', name:'金閣寺',                   note:'黄金に輝く舎利殿と鏡湖池の絶景',   cost:'¥500',   icon:'🥇', duration:'60分' },
          { time:'13:00', name:'今宮神社門前 あぶり餅',   note:'千年以上続く名物で一服',            cost:'¥600',   icon:'🍢', duration:'45分' },
          { time:'15:00', name:'西陣織会館 機織り体験',   note:'京都を代表する伝統産業を体験',      cost:'¥2,500', icon:'🧵', duration:'90分' },
          { time:'18:00', name:'先斗町 京料理 カウンター', note:'料理人と対話しながら食べる京の美食', cost:'¥6,000', icon:'🍣', duration:'120分' }
        ], totalCost:'¥10,100〜12,000', totalTime:'約9.5時間' },
      high: null
    },
    adventure: { low: null, mid: null, high: null }
  },
  'osaka': {
    romantic: {
      low: null,
      mid: { title:'大阪 中之島&ミナミ ロマンチックコース', desc:'大阪の魅力を詰め込んだ充実のロマンチックコース', emoji:'🎡',
        spots:[
          { time:'10:00', name:'中之島公園 朝散歩',       note:'水都大阪の中心をふたりでのんびり歩く', cost:'¥0',  icon:'🌿', duration:'60分' },
          { time:'12:00', name:'北浜 おしゃれカフェランチ', note:'レトロビルで大人のランチ',         cost:'¥2,000', icon:'☕', duration:'90分' },
          { time:'14:30', name:'道頓堀 観光＆写真',       note:'グリコ看板前で定番写真',            cost:'¥0',     icon:'🚶', duration:'60分' },
          { time:'17:00', name:'通天閣 展望台',           note:'大阪の夕暮れを高みから見下ろす',    cost:'¥800',   icon:'🗼', duration:'60分' },
          { time:'19:30', name:'難波 高級和食 コース',    note:'おまかせで大阪の味を堪能',           cost:'¥7,000', icon:'🍣', duration:'120分' }
        ], totalCost:'¥9,800〜11,500', totalTime:'約9.5時間' },
      high: null
    },
    foodie: {
      low: { title:'大阪 食い倒れ食べ歩きコース', desc:'大阪名物を食べ歩きで制覇する節約グルメツアー', emoji:'🍜',
        spots:[
          { time:'11:00', name:'道頓堀 たこ焼き食べ歩き', note:'たこ焼きの激戦区で食べ比べ',        cost:'¥1,200', icon:'🐙', duration:'60分' },
          { time:'12:30', name:'黒門市場 食材巡り',       note:'マグロ・ウニ・新鮮魚介を立ち食いで', cost:'¥1,500', icon:'🐟', duration:'90分' },
          { time:'15:00', name:'新世界 串カツ',           note:'大阪ソウルフード・二度づけ禁止の聖地', cost:'¥1,500', icon:'🍢', duration:'60分' },
          { time:'17:00', name:'天満橋 屋台/立ち飲み',   note:'地元民に混じって大阪の空気を飲む',  cost:'¥1,000', icon:'🍺', duration:'60分' },
          { time:'19:30', name:'心斎橋 お好み焼き',       note:'大阪流お好み焼きを鉄板で',          cost:'¥2,500', icon:'🥞', duration:'90分' }
        ], totalCost:'¥7,700〜9,500', totalTime:'約8.5時間' },
      mid: { title:'大阪 本格グルメコース', desc:'大阪の名店と隠れた名店を巡るガストロノミーツアー', emoji:'⭐',
        spots:[
          { time:'11:30', name:'中央市場 見学&海鮮ランチ', note:'競り場近くの食堂で超新鮮な海鮮丼', cost:'¥2,500', icon:'🦀', duration:'90分' },
          { time:'14:00', name:'天王寺 抹茶スイーツカフェ', note:'大阪発の話題スイーツを堪能',      cost:'¥1,500', icon:'🍵', duration:'60分' },
          { time:'16:30', name:'なんばグランドカオス 食品フロア', note:'セレクトされた国内外の食材', cost:'¥800',   icon:'🏪', duration:'60分' },
          { time:'19:00', name:'北新地 割烹 おまかせコース', note:'大阪食文化の粋を一皿一皿に',    cost:'¥9,000', icon:'🍽️', duration:'150分' }
        ], totalCost:'¥13,800〜16,000', totalTime:'約8.5時間' },
      high: null
    },
    active: {
      low: null,
      mid: { title:'大阪 アクティブ体験コース', desc:'大阪城&海遊館&USJで大阪を動き回るコース', emoji:'🏃',
        spots:[
          { time:'09:30', name:'大阪城 ランニング&登閣',  note:'大阪城公園をジョギング→天守閣へ',  cost:'¥600',   icon:'🏯', duration:'120分' },
          { time:'12:30', name:'天保山 海遊館',           note:'ジンベエザメに会いに行く大水族館',  cost:'¥2,400', icon:'🦈', duration:'120分' },
          { time:'16:00', name:'天保山大観覧車',           note:'大阪湾を一望するシースルーゴンドラ', cost:'¥900',  icon:'🎡', duration:'30分' },
          { time:'18:00', name:'USJ 夕方入場',            note:'ハリウッドの世界に飛び込む！',      cost:'¥5,400', icon:'🎬', duration:'180分' }
        ], totalCost:'¥9,300〜11,000', totalTime:'約11時間' },
      high: null
    },
    relaxing: { low: null, mid: null, high: null },
    cultural: { low: null, mid: null, high: null },
    adventure: { low: null, mid: null, high: null }
  }
};

/* ---- FALLBACK ---- */
const FALLBACK_COURSE = {
  title:'おすすめデートコース', desc:'選択内容に合わせたオリジナルデートコース', emoji:'💕',
  spots:[
    { time:'10:00', name:'待ち合わせカフェ モーニング', note:'一日のスタートは軽やかに',       cost:'¥800',   icon:'☕', duration:'60分' },
    { time:'11:30', name:'エリア散策 & フォトスポット', note:'気に入った場所で写真撮影',       cost:'¥0',     icon:'📸', duration:'90分' },
    { time:'13:30', name:'お気に入りランチ',             note:'ふたりで選んだランチを楽しむ',   cost:'¥2,500', icon:'🍽️', duration:'90分' },
    { time:'16:00', name:'ギャラリー or 展望スポット',  note:'文化や景色を楽しむ時間',         cost:'¥1,000', icon:'🎨', duration:'90分' },
    { time:'19:00', name:'夜景ディナー',                 note:'ふたりだけの特別な夜',           cost:'¥5,000', icon:'🌃', duration:'120分' }
  ], totalCost:'¥9,300〜12,000', totalTime:'約9時間'
};

/* ---- CHECKLIST DATA ---- */
const CHECKLIST_BASE = ['📱 スマートフォン（充電済み）','💳 財布・クレジットカード','🗝️ 家の鍵','👜 バッグ（軽め）'];
const CHECKLIST_BY_MOOD = {
  romantic:  ['💐 小さな花束やプチギフト','🕯️ ムード演出グッズ'],
  active:    ['👟 歩きやすいスニーカー','🎒 小さなリュック','💧 水筒・ドリンク'],
  relaxing:  ['📚 文庫本 or お気に入りの音楽','🧣 羽織れる上着'],
  cultural:  ['📒 メモ帳（気づきを書く）','🎫 事前予約チケット'],
  foodie:    ['👀 グルメスポットのメモ','📸 カメラ（食べ物映え設定）'],
  adventure: ['☀️ 日焼け止め','🩹 ばんそうこう','👟 動きやすい服装']
};
const CHECKLIST_BY_WEATHER = {
  rainy:  ['☂️ 折りたたみ傘','👟 濡れても大丈夫な靴','🧥 防水ジャケット'],
  sunny:  ['🕶️ サングラス','🧴 日焼け止め','🧢 帽子'],
  cloudy: ['☂️ 折りたたみ傘（念のため）']
};
const CHECKLIST_BY_THEME = {
  photo:  ['📸 カメラ or スマホ三脚','🔋 モバイルバッテリー'],
  night:  ['🌃 夜景スポットの事前チェックメモ'],
  pet:    ['🐶 ペットのリード','🐾 ペット用水・おやつ'],
  sweets: ['🍰 スイーツのメモリスト'],
  onsen:  ['♨️ タオル・着替え','🧴 スキンケアグッズ'],
  drive:  ['🚗 カーナビ / Googleマップ','🎵 ドライブ用プレイリスト'],
  kimono: ['📷 記念撮影スポットのメモ'],
  sport:  ['👟 スポーツシューズ','🎽 着替え','💧 スポーツドリンク']
};

/* ============================================================
   2. DOM HELPERS
   ============================================================ */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ============================================================
   3. STATE
   ============================================================ */
let currentStep = 1;
let currentRating = 0;
let lastCourse = null;
let lastFormData = null;
let galleryVisible = 6;
let galleryFilter = 'all';

/* ============================================================
   4. DARK MODE
   ============================================================ */
function initDarkMode() {
  const saved = localStorage.getItem('dc_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  $('darkToggle').textContent = saved === 'dark' ? '☀️' : '🌙';
}

function toggleDarkMode() {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('dc_theme', next);
  $('darkToggle').textContent = next === 'dark' ? '☀️' : '🌙';
}

/* ============================================================
   5. HAMBURGER MENU
   ============================================================ */
function initHamburger() {
  const btn = $('hamburger');
  const nav = $('mobileNav');
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.classList.toggle('open', open);
  });
  $$('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.classList.remove('open');
    });
  });
}

/* ============================================================
   6. TODAY COUNT ANIMATION
   ============================================================ */
function animateTodayCount() {
  const el = $('todayCount');
  if (!el) return;
  const target = 230 + Math.floor(Math.random() * 80);
  let cur = 0;
  const step = Math.ceil(target / 40);
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = cur.toLocaleString();
    if (cur >= target) {
      clearInterval(t);
      setInterval(() => {
        const v = parseInt(el.textContent.replace(',', '')) + (Math.random() < 0.5 ? 1 : -1);
        el.textContent = Math.max(150, v).toLocaleString();
      }, 4000);
    }
  }, 30);
}

/* ============================================================
   7. STEP NAVIGATION
   ============================================================ */
function initStepDots() {
  const dots = $('stepDots');
  if (!dots) return;
  dots.innerHTML = '';
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const d = document.createElement('span');
    d.className = 'step-dot' + (i === currentStep ? ' active' : '');
    d.addEventListener('click', () => goToStep(i));
    dots.appendChild(d);
  }
}

function goToStep(n) {
  $$('.form-step').forEach(s => s.classList.remove('active'));
  const target = document.querySelector(`.form-step[data-step="${n}"]`);
  if (target) target.classList.add('active');
  currentStep = n;

  // progress bar
  const bar = $('genProgressBar');
  if (bar) bar.style.width = ((n / TOTAL_STEPS) * 100) + '%';

  // prev/next buttons
  const prev = $('prevBtn');
  const next = $('nextBtn');
  if (prev) prev.disabled = n === 1;
  if (next) {
    if (n === TOTAL_STEPS) {
      next.textContent = '✨ コースを生成する';
      next.classList.add('btn-generate');
    } else {
      next.textContent = '次へ →';
      next.classList.remove('btn-generate');
    }
  }

  // step dots
  $$('.step-dot').forEach((d, i) => d.classList.toggle('active', i + 1 === n));

  // tip card
  const tip = $('stepTipCard');
  if (tip) tip.querySelector('.tip-text').textContent = STEP_TIPS[n - 1];
}

function getFormData() {
  const form = $('dateForm');
  if (!form) return {};
  const data = {};
  // radio fields
  ['area', 'season', 'weather', 'mood', 'budget', 'relation'].forEach(name => {
    const checked = form.querySelector(`input[name="${name}"]:checked`);
    data[name] = checked ? checked.value : null;
  });
  // checkboxes (theme)
  data.themes = [...form.querySelectorAll('input[name="theme"]:checked')].map(c => c.value);
  return data;
}

function validateStep(step) {
  const fd = getFormData();
  const required = { 1:'area', 2:'season', 3:'mood', 4:'budget', 5:'relation' };
  if (required[step] && !fd[required[step]]) {
    showToast(`「${document.querySelector(`.form-step[data-step="${step}"] h3`).textContent.slice(3)}」を選択してください`, 'warn');
    return false;
  }
  return true;
}

function initFormNav() {
  const prev = $('prevBtn');
  const next = $('nextBtn');
  if (!prev || !next) return;

  prev.addEventListener('click', () => {
    if (currentStep > 1) goToStep(currentStep - 1);
  });

  next.addEventListener('click', () => {
    if (currentStep < TOTAL_STEPS) {
      if (!validateStep(currentStep)) return;
      goToStep(currentStep + 1);
    } else {
      generateCourse();
    }
  });
}

/* ============================================================
   8. COURSE LOOKUP
   ============================================================ */
function lookupCourse(fd) {
  const areaData = COURSES[fd.area];
  if (!areaData) return null;
  const moodData = areaData[fd.mood];
  if (!moodData) return null;
  const budgetMap = { low: 'low', mid: 'mid', high: 'high' };
  return moodData[budgetMap[fd.budget] || 'mid'] || null;
}

function applyModifiers(course, fd) {
  if (!course) return course;
  const c = JSON.parse(JSON.stringify(course));

  // Rain: add indoor note
  if (fd.weather === 'rainy') {
    c.desc = '☔ 雨の日仕様でアレンジ — ' + c.desc;
    c.spots.forEach(s => { if (!s.note.includes('屋内')) s.note += '（屋内移動優先）'; });
  }

  // Relation modifiers
  if (fd.relation === 'propose') {
    c.title = '💍 プロポーズ特別版 — ' + c.title;
    c.desc = '🎉 この日が一生の記念になるよう演出をプラス — ' + c.desc;
    const last = c.spots[c.spots.length - 1];
    last.note += '【サプライズ演出 / バラの花束をご準備ください】';
  } else if (fd.relation === 'first') {
    c.desc = '🌷 初デート向けに会話しやすいスポットを優先 — ' + c.desc;
  } else if (fd.relation === 'anniversary') {
    c.title = '🎉 記念日スペシャル版 — ' + c.title;
  }

  // Season: add seasonal note
  const seasonNote = { spring:'🌸 桜シーズン', summer:'🌻 夏限定スポット', autumn:'🍁 紅葉が見頃', winter:'❄️ イルミネーション期間' };
  if (fd.season && seasonNote[fd.season]) {
    c.spots[0].note += `（${seasonNote[fd.season]}）`;
  }

  return c;
}

/* ============================================================
   9. GENERATE COURSE
   ============================================================ */
const LOADING_MSGS = [
  'エリアの情報を分析中…',
  '天気・季節を考慮中…',
  '最適なスポットを選定中…',
  '予算に合わせて調整中…',
  'ふたりだけのコースを作成中…',
  'もうすぐ完成です！'
];

function generateCourse() {
  const fd = getFormData();
  if (!fd.area || !fd.mood || !fd.budget) {
    showToast('全ての項目を選択してください', 'warn');
    return;
  }

  // Show loading overlay
  showLoadingOverlay(() => {
    let rawCourse = lookupCourse(fd);
    if (!rawCourse) rawCourse = FALLBACK_COURSE;
    const course = applyModifiers(rawCourse, fd);
    lastCourse = course;
    lastFormData = fd;
    renderResult(course, fd);
    hideLoadingOverlay();
  });
}

let loadingOverlay = null;
function showLoadingOverlay(callback) {
  loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'loading-overlay';
  loadingOverlay.innerHTML = `
    <div class="loading-card">
      <div class="loading-spinner"></div>
      <p class="loading-msg" id="loadingMsg">${LOADING_MSGS[0]}</p>
      <div class="loading-progress"><div class="loading-bar" id="loadingBar"></div></div>
    </div>`;
  document.body.appendChild(loadingOverlay);

  let idx = 0;
  const total = LOADING_MSGS.length;
  const interval = 400;
  const timer = setInterval(() => {
    idx++;
    const msgEl = document.getElementById('loadingMsg');
    const barEl = document.getElementById('loadingBar');
    if (msgEl) msgEl.textContent = LOADING_MSGS[Math.min(idx, total - 1)];
    if (barEl) barEl.style.width = ((idx / total) * 100) + '%';
    if (idx >= total) {
      clearInterval(timer);
      setTimeout(callback, 300);
    }
  }, interval);
}

function hideLoadingOverlay() {
  if (loadingOverlay) {
    loadingOverlay.classList.add('fade-out');
    setTimeout(() => { if (loadingOverlay) { loadingOverlay.remove(); loadingOverlay = null; } }, 400);
  }
}

/* ============================================================
   10. RENDER RESULT
   ============================================================ */
function renderResult(course, fd) {
  const section = $('resultSection');
  if (!section) return;

  // Title & desc
  $('resultTitle').textContent = course.emoji + ' ' + course.title;
  $('resultDesc').textContent = course.desc;

  // Meta tags
  const areaLabels = {
    'tokyo-shinjuku':'新宿・渋谷', 'tokyo-asakusa':'浅草・上野', 'tokyo-harajuku':'原宿・表参道',
    'tokyo-odaiba':'お台場・湾岸', 'tokyo-roppongi':'六本木・麻布', 'yokohama':'横浜',
    'kyoto':'京都', 'osaka':'大阪'
  };
  const moodLabels = { romantic:'💕ロマンチック', active:'🏃アクティブ', relaxing:'☁️まったり', cultural:'🎨文化・アート', foodie:'🍜グルメ重視', adventure:'🗺️冒険・体験' };
  const budgetLabels = { low:'💴コスパ重視', mid:'💳バランス重視', high:'💎プレミアム' };
  $('resultMeta').innerHTML = [
    areaLabels[fd.area] || fd.area,
    moodLabels[fd.mood] || fd.mood,
    budgetLabels[fd.budget] || fd.budget,
    course.totalTime, course.totalCost
  ].map(t => `<span class="meta-tag">${t}</span>`).join('');

  // Timeline
  renderTimeline(course);

  // Summary card
  renderSummaryCard(course, fd);

  // Checklist
  renderChecklist(course, fd);

  // Rating reset
  currentRating = 0;
  $$('.star').forEach(s => s.classList.remove('active', 'hover'));
  $('ratingLabel').textContent = 'タップして評価';

  // Show section
  section.style.display = 'block';
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Show saved section
  renderSavedCourses();
}

function renderTimeline(course) {
  const tl = $('courseTimeline');
  if (!tl) return;
  tl.innerHTML = course.spots.map((s, i) => `
    <div class="timeline-item" style="animation-delay:${i * 0.1}s">
      <div class="timeline-dot">${s.icon}</div>
      <div class="timeline-content">
        <div class="timeline-time">${s.time}</div>
        <div class="timeline-name">${s.name}</div>
        <div class="timeline-note">${s.note}</div>
        <div class="timeline-meta">
          <span class="tl-cost">💴 ${s.cost}</span>
          <span class="tl-dur">⏱ ${s.duration}</span>
        </div>
      </div>
    </div>`).join('');
}

function renderSummaryCard(course, fd) {
  const card = $('summaryCard');
  if (!card) return;
  const seasonEmoji = { spring:'🌸', summer:'🌻', autumn:'🍁', winter:'❄️' };
  const weatherEmoji = { sunny:'☀️', cloudy:'⛅', rainy:'🌧️' };
  const relationEmoji = { first:'🌷', early:'💌', couple:'💑', longtime:'🏡', anniversary:'🎉', propose:'💍' };
  const areaLabels = {
    'tokyo-shinjuku':'新宿・渋谷', 'tokyo-asakusa':'浅草・上野', 'tokyo-harajuku':'原宿・表参道',
    'tokyo-odaiba':'お台場・湾岸', 'tokyo-roppongi':'六本木・麻布', 'yokohama':'横浜',
    'kyoto':'京都', 'osaka':'大阪'
  };
  const rows = [
    ['📍 エリア', areaLabels[fd.area] || fd.area],
    ['🌤️ 季節', (seasonEmoji[fd.season] || '') + ' ' + ({spring:'春',summer:'夏',autumn:'秋',winter:'冬'}[fd.season] || fd.season || '未選択')],
    ['⛅ 天気', (weatherEmoji[fd.weather] || '') + ' ' + ({sunny:'晴れ',cloudy:'曇り',rainy:'雨'}[fd.weather] || '未選択')],
    ['💑 関係性', (relationEmoji[fd.relation] || '') + ' ' + ({first:'初デート',early:'付き合いたて',couple:'安定期',longtime:'長期カップル',anniversary:'記念日',propose:'プロポーズ予定'}[fd.relation] || '未選択')],
    ['⏱ 総時間', course.totalTime],
    ['💴 予算目安', course.totalCost]
  ];
  card.innerHTML = `
    <h4 class="summary-title">📊 コースサマリー</h4>
    <table class="summary-table">
      ${rows.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('')}
    </table>
    ${fd.themes && fd.themes.length ? `<div class="summary-themes">${fd.themes.map(t => `<span class="theme-badge">${t}</span>`).join('')}</div>` : ''}`;
}

function renderChecklist(course, fd) {
  const el = $('checklistItems');
  if (!el) return;
  const items = [...CHECKLIST_BASE];
  if (fd.mood && CHECKLIST_BY_MOOD[fd.mood]) items.push(...CHECKLIST_BY_MOOD[fd.mood]);
  if (fd.weather && CHECKLIST_BY_WEATHER[fd.weather]) items.push(...CHECKLIST_BY_WEATHER[fd.weather]);
  if (fd.themes) fd.themes.forEach(t => { if (CHECKLIST_BY_THEME[t]) items.push(...CHECKLIST_BY_THEME[t]); });
  el.innerHTML = items.map((item, i) => `
    <label class="checklist-item">
      <input type="checkbox" id="chk_${i}" />
      <span class="chk-label">${item}</span>
    </label>`).join('');
}

/* ============================================================
   11. STAR RATING
   ============================================================ */
function initStarRating() {
  const stars = $$('.star');
  const label = $('ratingLabel');
  const msgs = ['', 'もう少し…', 'まあまあ', 'よかった！', 'かなり良かった！', '最高のデートでした！✨'];
  stars.forEach(star => {
    star.addEventListener('mouseenter', () => {
      const v = parseInt(star.dataset.v);
      stars.forEach(s => s.classList.toggle('hover', parseInt(s.dataset.v) <= v));
    });
    star.addEventListener('mouseleave', () => {
      stars.forEach(s => s.classList.remove('hover'));
    });
    star.addEventListener('click', () => {
      currentRating = parseInt(star.dataset.v);
      stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.v) <= currentRating));
      if (label) label.textContent = msgs[currentRating] || '';
      showToast(`${currentRating}つ星の評価をありがとうございます！`, 'success');
    });
  });
}

/* ============================================================
   12. SAVE / LOAD COURSES
   ============================================================ */
function saveCourse() {
  if (!lastCourse || !lastFormData) { showToast('まずコースを生成してください', 'warn'); return; }
  const saved = JSON.parse(localStorage.getItem('dc_saved') || '[]');
  const entry = { id: Date.now(), course: lastCourse, fd: lastFormData, rating: currentRating, savedAt: new Date().toLocaleDateString('ja-JP') };
  if (saved.length >= 10) saved.shift();
  saved.push(entry);
  localStorage.setItem('dc_saved', JSON.stringify(saved));
  showToast('コースを保存しました！🔖', 'success');
  renderSavedCourses();
}

function renderSavedCourses() {
  const saved = JSON.parse(localStorage.getItem('dc_saved') || '[]');
  const section = $('savedSection');
  const grid = $('savedGrid');
  if (!section || !grid) return;
  if (!saved.length) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  grid.innerHTML = saved.slice().reverse().map(e => `
    <div class="saved-card" data-id="${e.id}">
      <div class="saved-emoji">${e.course.emoji || '💕'}</div>
      <div class="saved-info">
        <strong>${e.course.title}</strong>
        <span>${e.savedAt} ${e.rating ? '★'.repeat(e.rating) : ''}</span>
      </div>
      <button class="saved-del" data-id="${e.id}" title="削除">✕</button>
    </div>`).join('');

  grid.querySelectorAll('.saved-del').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      deleteSaved(parseInt(btn.dataset.id));
    });
  });
}

function deleteSaved(id) {
  let saved = JSON.parse(localStorage.getItem('dc_saved') || '[]');
  saved = saved.filter(e => e.id !== id);
  localStorage.setItem('dc_saved', JSON.stringify(saved));
  renderSavedCourses();
  showToast('保存コースを削除しました', 'info');
}

/* ============================================================
   13. SHARE MODAL
   ============================================================ */
function initShareModal() {
  const shareBtn = $('shareBtn');
  const modal = $('shareModal');
  const close = $('modalClose');
  if (!shareBtn || !modal) return;

  shareBtn.addEventListener('click', () => {
    if (!lastCourse) { showToast('まずコースを生成してください', 'warn'); return; }
    populateSharePreview();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeFn = () => { modal.classList.remove('open'); document.body.style.overflow = ''; };
  if (close) close.addEventListener('click', closeFn);
  modal.querySelector('.modal-backdrop').addEventListener('click', closeFn);

  modal.querySelector('.share-line').addEventListener('click', () => {
    const text = encodeURIComponent(`DateCraftで「${lastCourse.title}」を生成しました！\n${location.href}`);
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(location.href)}&text=${text}`, '_blank');
  });
  modal.querySelector('.share-twitter').addEventListener('click', () => {
    const text = encodeURIComponent(`DateCraftで「${lastCourse.title}」を生成しました！ #DateCraft #デートプラン\n${location.href}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  });
  modal.querySelector('.share-copy').addEventListener('click', () => {
    navigator.clipboard.writeText(location.href).then(() => showToast('リンクをコピーしました！', 'success'));
  });
}

function populateSharePreview() {
  const prev = $('sharePreview');
  if (!prev || !lastCourse) return;
  prev.innerHTML = `
    <div class="sp-emoji">${lastCourse.emoji}</div>
    <div class="sp-title">${lastCourse.title}</div>
    <div class="sp-desc">${lastCourse.desc}</div>
    <div class="sp-spots">${lastCourse.spots.map(s => `<span>${s.icon} ${s.name}</span>`).join('')}</div>
    <div class="sp-meta">${lastCourse.totalTime} / ${lastCourse.totalCost}</div>`;
}

/* ============================================================
   14. GALLERY
   ============================================================ */
function initGallery() {
  renderGallery();
  initGalleryFilters();
  const loadMore = $('loadMoreBtn');
  if (loadMore) {
    loadMore.addEventListener('click', () => {
      galleryVisible += 6;
      renderGallery();
    });
  }
}

function getFilteredGallery() {
  if (galleryFilter === 'all') return GALLERY_ITEMS;
  return GALLERY_ITEMS.filter(g => g.category === galleryFilter);
}

function renderGallery() {
  const grid = $('galleryGrid');
  if (!grid) return;
  const items = getFilteredGallery();
  const shown = items.slice(0, galleryVisible);
  grid.innerHTML = shown.map(g => `
    <div class="gallery-card" data-id="${g.id}" style="cursor:pointer">
      <div class="gallery-card-img">${g.img}</div>
      <div class="gallery-card-rank">#${g.rank}</div>
      <div class="gallery-card-body">
        <div class="gallery-card-title">${g.title}</div>
        <div class="gallery-card-meta">
          <span>📍 ${g.area}</span>
          <span>⏱ ${g.duration}</span>
          <span>💴 ${g.budget}</span>
        </div>
        <div class="gallery-tags">${g.tags.map(t => `<span class="gallery-tag">${t}</span>`).join('')}</div>
      </div>
      <button class="gallery-like-btn" data-id="${g.id}" title="いいね">♡ ${g.likes}</button>
    </div>`).join('');

  // Card click → detail modal
  grid.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.classList.contains('gallery-like-btn')) return;
      openGalleryModal(parseInt(card.dataset.id));
    });
  });

  // Like button
  grid.querySelectorAll('.gallery-like-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const item = GALLERY_ITEMS.find(g => g.id === id);
      if (item) {
        item.likes++;
        btn.textContent = `♥ ${item.likes}`;
        btn.classList.add('liked');
        showToast('いいね！', 'success');
      }
    });
  });

  // Load more button visibility
  const loadMore = $('loadMoreBtn');
  if (loadMore) loadMore.style.display = galleryVisible >= items.length ? 'none' : '';
}

function initGalleryFilters() {
  const filters = $('galleryFilters');
  if (!filters) return;
  filters.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      galleryFilter = btn.dataset.filter;
      galleryVisible = 6;
      renderGallery();
    });
  });
}

function openGalleryModal(id) {
  const item = GALLERY_ITEMS.find(g => g.id === id);
  if (!item) return;
  const modal = $('galleryModal');
  const content = $('galleryModalContent');
  if (!modal || !content) return;
  content.innerHTML = `
    <div class="gm-header">
      <div class="gm-img">${item.img}</div>
      <div>
        <h3>${item.title}</h3>
        <p>📍 ${item.area} ／ ⏱ ${item.duration} ／ 💴 ${item.budget}</p>
        <p>🌸 ${item.season}</p>
      </div>
    </div>
    <div class="gm-tags">${item.tags.map(t => `<span class="gallery-tag">${t}</span>`).join('')}</div>
    <h4>含まれるスポット</h4>
    <ul class="gm-spots">${item.spots.map(s => `<li>✅ ${s}</li>`).join('')}</ul>
    <a href="#generator" class="btn btn-primary" style="margin-top:1.2rem" onclick="document.getElementById('galleryModal').classList.remove('open')">このコースを参考に作成する →</a>`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function initGalleryModal() {
  const modal = $('galleryModal');
  const close = $('galleryModalClose');
  const backdrop = $('galleryBackdrop');
  if (!modal) return;
  const closeFn = () => { modal.classList.remove('open'); document.body.style.overflow = ''; };
  if (close) close.addEventListener('click', closeFn);
  if (backdrop) backdrop.addEventListener('click', closeFn);
}

/* ============================================================
   15. REVIEWS
   ============================================================ */
function renderReviews() {
  const grid = $('reviewsGrid');
  if (!grid) return;
  grid.innerHTML = REVIEWS_DATA.map(r => `
    <div class="review-card">
      <div class="review-header">
        <span class="review-avatar">${r.avatar}</span>
        <div>
          <strong>${r.name}</strong>（${r.age}歳）
          <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
        </div>
        <span class="review-date">${r.date}</span>
      </div>
      <p class="review-text">${r.text}</p>
      <div class="review-tags">
        <span class="review-tag">📍 ${r.area}</span>
        <span class="review-tag">💑 ${r.relation}</span>
      </div>
    </div>`).join('');
}

/* ============================================================
   16. FAQ ACCORDION
   ============================================================ */
function renderFAQ() {
  const list = $('faqList');
  if (!list) return;
  list.innerHTML = FAQ_DATA.map((item, i) => `
    <div class="faq-item" data-i="${i}">
      <button class="faq-q" aria-expanded="false">
        <span>${item.q}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="display:none"><p>${item.a}</p></div>
    </div>`).join('');

  list.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-a');
      const icon = btn.querySelector('.faq-icon');
      const isOpen = answer.style.display !== 'none';
      // Close all
      list.querySelectorAll('.faq-a').forEach(a => { a.style.display = 'none'; });
      list.querySelectorAll('.faq-icon').forEach(ic => { ic.textContent = '+'; });
      list.querySelectorAll('.faq-q').forEach(b => { b.setAttribute('aria-expanded', 'false'); b.parentElement.classList.remove('open'); });
      // Open if was closed
      if (!isOpen) {
        answer.style.display = 'block';
        icon.textContent = '−';
        btn.setAttribute('aria-expanded', 'true');
        item.classList.add('open');
      }
    });
  });
}

/* ============================================================
   17. SEASONAL BANNER
   ============================================================ */
function initSeasonalBanner() {
  const m = new Date().getMonth() + 1;
  const seasons = [
    { months:[3,4,5],  icon:'🌸', title:'春のデート特集',    desc:'桜の季節に合わせたロマンチックなコースが登場！期間限定プランをチェック' },
    { months:[6,7,8],  icon:'🌻', title:'夏のデート特集',    desc:'花火・海・夏祭り！夏ならではのスペシャルコースをご提案' },
    { months:[9,10,11],icon:'🍁', title:'秋のデート特集',    desc:'紅葉・食欲の秋・文化の秋を楽しむコースが新登場' },
    { months:[12,1,2], icon:'❄️', title:'冬のデート特集',    desc:'クリスマス・年越し・イルミネーション！冬限定の特別プランをご紹介' }
  ];
  const season = seasons.find(s => s.months.includes(m)) || seasons[0];
  const icon = $('seasonalIcon');
  const title = $('seasonalTitle');
  const desc = $('seasonalDesc');
  if (icon) icon.textContent = season.icon;
  if (title) title.textContent = season.title;
  if (desc) desc.textContent = season.desc;
}

/* ============================================================
   18. FAB SCROLL-TO-TOP
   ============================================================ */
function initFAB() {
  const fab = $('fabTop');
  if (!fab) return;
  window.addEventListener('scroll', () => {
    fab.style.display = window.scrollY > 400 ? 'flex' : 'none';
  });
  fab.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================================================
   19. TOAST
   ============================================================ */
let toastTimer = null;
function showToast(msg, type = 'info') {
  const el = $('toastEl');
  if (!el) return;
  el.textContent = msg;
  el.className = `toast toast-${type} show`;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

/* ============================================================
   20. RESULT ACTION BUTTONS
   ============================================================ */
function initResultActions() {
  const saveBtn = $('saveBtn');
  const printBtn = $('printBtn');
  const regenBtn = $('regenerateBtn');
  if (saveBtn) saveBtn.addEventListener('click', saveCourse);
  if (printBtn) printBtn.addEventListener('click', () => window.print());
  if (regenBtn) regenBtn.addEventListener('click', () => {
    $('resultSection').style.display = 'none';
    document.querySelector('#generator').scrollIntoView({ behavior: 'smooth' });
    goToStep(1);
    // Reset form
    $$('#dateForm input[type="radio"]').forEach(r => r.checked = false);
    $$('#dateForm input[type="checkbox"]').forEach(c => c.checked = false);
  });
}

/* ============================================================
   21. INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  // Dark mode toggle button
  const darkBtn = $('darkToggle');
  if (darkBtn) darkBtn.addEventListener('click', toggleDarkMode);
  initHamburger();
  animateTodayCount();
  initStepDots();
  goToStep(1);
  initFormNav();
  initStarRating();
  initShareModal();
  initGallery();
  initGalleryModal();
  renderReviews();
  renderFAQ();
  initSeasonalBanner();
  initFAB();
  initResultActions();
  renderSavedCourses();

  // Keyboard: Escape closes modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      $$('.modal.open').forEach(m => { m.classList.remove('open'); document.body.style.overflow = ''; });
      const mobileNav = $('mobileNav');
      if (mobileNav) { mobileNav.classList.remove('open'); $('hamburger').classList.remove('open'); }
    }
  });
});
