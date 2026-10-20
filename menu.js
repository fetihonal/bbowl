/*
  B'BOWL dijital menü verisi, 15 Ekim 2026 listesi.

  Görsel eklemek için ilgili ürünün `gorsel` alanına dosya yolunu yazın,
  ör. gorsel: "images/sporcu-bowl.jpg". Boş bırakılan ürünlerde görsel alanı
  marka desenli boş kutu olarak görünür.

  kcal / protein / fiyat bilinmiyorsa null bırakın; menüde gizlenir.
  onerilen: true → fiyat henüz onaylanmadı (menüde normal görünür, sadece işaret).
*/
window.MENU = [
  {
    id: "bowllar", baslik: "Bowl'lar", renk: "bordo", duzen: "kart",
    urunler: [
      { ad: "Sporcu Bowl", icerik: "Yeşillik tabanı, basmati, tiftik tavuk (240 g), kinoa, bıldırcın yumurtası, cevizli brokoli, maş fasulyesi, roast sarımsaklı yoğurt sos", porsiyon: "620 g", kcal: 945, protein: 87, fiyat: 420, gorsel: "" },
      { ad: "Vegan Bowl", icerik: "Yeşillik tabanı, basmati, falafel, humus, kırmızı lahana, maş fasulyesi, domates, limon-tahin sos", porsiyon: "530 g", kcal: 761, protein: 27, fiyat: 225, gorsel: "assets/bowl/vegan-bowl-kart.jpg" },
      { ad: "Asya Bowl", icerik: "Yeşillik tabanı, erişte, sweet chili tavuk, maş fasulyesi, kırmızı lahana, salatalık, mısır, sweet chili sos", porsiyon: "510 g", kcal: 558, protein: 30, fiyat: 235, gorsel: "" },
      { ad: "Sezar Bowl", icerik: "Yeşillik tabanı, basmati, tiftik tavuk, kruton, domates, mısır, salatalık, sezar sos", porsiyon: "495 g", kcal: 737, protein: 45, fiyat: 265, gorsel: "" },
      { ad: "Kremalı Mantarlı Bowl", icerik: "Yeşillik tabanı, erişte, kremalı mantarlı tavuk, cevizli brokoli, kuru domates, mısır, pesto sos", porsiyon: "470 g", kcal: 644, protein: 34, fiyat: 260, gorsel: "assets/bowl/kremali-mantarli-bowl-kart.jpg" },
      { ad: "Meksika Bowl", icerik: "Yeşillik tabanı, basmati, biberli salçalı tavuk, mısır, jalapeno, kırmızı lahana, tortilla cips, chipotle-lime sos", porsiyon: "460 g", kcal: 669, protein: 27, fiyat: 225, gorsel: "assets/bowl/meksika-bowl-kart.jpg" },
      { ad: "Anadolu Köfte Bowl", icerik: "Yeşillik tabanı, basmati, domates soslu köfte, kısır, kuru cacık, domates, kornişon turşu, acı yoğurt sos", porsiyon: "535 g", kcal: 686, protein: 29, fiyat: 455, gorsel: "assets/bowl/anadolu-kofte-bowl-kart.jpg" },
      { ad: "Ton Balıklı Bowl", icerik: "Yeşillik tabanı, basmati, ton balığı, mısır, salatalık, bıldırcın yumurtası, kornişon turşu, ballı hardal sos", porsiyon: "465 g", kcal: 675, protein: 42, fiyat: 455, gorsel: "assets/bowl/ton-balikli-bowl-kart.jpg" },
      { ad: "Akdeniz Falafel Bowl", icerik: "Yeşillik tabanı, karabuğday, falafel, kuru cacık, pancar, salatalık, kuru domates, roast sarımsaklı yoğurt sos", porsiyon: "520 g", kcal: 603, protein: 29, fiyat: 210, gorsel: "" },
      { ad: "Glow Bowl", icerik: "Yeşillik tabanı, basmati, sweet chili tavuk, kinoa, pancar, cevizli brokoli, salatalık, limon-tahin sos", porsiyon: "540 g", kcal: 667, protein: 30, fiyat: 250, gorsel: "" },
    ],
  },
  {
    id: "kova-pilavlar", baslik: "Kova Pilavlar", not: "Yeşilliksiz, sossuz", renk: "yesil", duzen: "kart",
    urunler: [
      { ad: "Körili Tavuklu Kova Pilav", icerik: "Basmati (300 g), körili tavuk (120 g), kuru cacık, kırmızı lahana, mısır, salatalık", porsiyon: "570 g", kcal: 804, protein: 35, fiyat: 235, gorsel: "" },
      { ad: "Kremalı Mantarlı Tavuklu Kova Pilav", icerik: "Basmati (300 g), kremalı mantarlı tavuk (120 g), cevizli brokoli, kuru domates, mısır, kornişon turşu", porsiyon: "545 g", kcal: 811, protein: 34, fiyat: 250, gorsel: "" },
      { ad: "Tiftik Tavuklu Kova Pilav", icerik: "Basmati (300 g), tiftik tavuk (120 g), kuru cacık, domates, salatalık, kornişon turşu", porsiyon: "575 g", kcal: 807, protein: 49, fiyat: 265, gorsel: "" },
      { ad: "Sporcu Pilav", icerik: "Basmati (300 g), tiftik tavuk (240 g), kinoa, maş fasulyesi, bıldırcın yumurtası", porsiyon: "620 g", kcal: 1085, protein: 86, fiyat: 390, gorsel: "" },
    ],
  },
  {
    id: "salatalar", baslik: "Salatalar", renk: "mavi", duzen: "kart",
    urunler: [
      { ad: "Tavuklu Sezar Salata", icerik: "Tiftik tavuk (270 g), çeri domates, marul, kruton, sezar sos", porsiyon: "420 g", kcal: 686, protein: 89, fiyat: 200, gorsel: "assets/salatalar/tavuklu-sezar-salata-kart.jpg" },
      { ad: "Ton Balıklı Salata", icerik: "Ton balığı, yeşillik, çeri domates, salatalık, mısır, kırmızı soğan, zeytin, zeytinyağlı-limonlu sos", porsiyon: "~405 g", kcal: 449, protein: 36, fiyat: 240, yeni: true, gorsel: "assets/salatalar/ton-balikli-salata-kart.jpg" },
    ],
  },
  {
    id: "kendi-bowlun", baslik: "Kendi Bowlunu Oluştur", renk: "neon", duzen: "kbo",
    not: "Yeşillikli bowl ya da yeşilliksiz kova seç, adım adım ilerle, fiyatın anında hesaplansın.",
    // Oluşturucu seçenekleri: garnitür ve sos listeleri menüdeki bowl'lardan derlendi, gerekirse güncelleyin.
    secenekler: {
      taban: 150,
      // Kap seçimi: bowl yeşillik tabanlı, kova yeşilliksiz. Kova için farklı fiyat varsa `ek` alanına yazın.
      kaplar: [
        { ad: "Bowl", aciklama: "Yeşillik tabanlı", yesillik: true, ek: 0 },
        { ad: "Kova", aciklama: "Yeşilliksiz", yesillik: false, ek: 0 },
      ],
      tahillar: ["Basmati", "Erişte", "Karabuğday"],
      ciftTahil: 25,
      proteinler: [
        { ad: "Proteinsiz", ek: 0 },
        { ad: "Falafel", ek: 70 },
        { ad: "Tavuk", ek: 150, turler: ["Körili", "Kremalı mantarlı", "Sweet chili", "Biberli salçalı", "Tiftik"] },
        { ad: "Domates soslu köfte", ek: 250 },
        { ad: "Ton balığı", ek: 270 },
      ],
      garnitur: {
        dahil: 4, ekstra: 20,
        liste: ["Kinoa", "Cevizli brokoli", "Maş fasulyesi", "Bıldırcın yumurtası", "Humus", "Kırmızı lahana", "Domates", "Salatalık", "Mısır", "Kuru domates", "Pancar", "Kısır", "Kuru cacık", "Kornişon turşu", "Jalapeno", "Kruton", "Tortilla cips"],
      },
      sos: {
        dahil: 1, ekstra: 25,
        liste: ["Roast sarımsaklı yoğurt", "Limon-tahin", "Sweet chili", "Sezar", "Pesto", "Chipotle-lime", "Acı yoğurt", "Ballı hardal"],
      },
    },
    urunler: [
      { ad: "Taban tabak", icerik: "Yeşillik, tahıl (basmati / erişte / karabuğday), 4 garnitür, 1 sos, proteinsiz", porsiyon: "1 tabak", fiyat: 150, gorsel: "" },
      { ad: "Falafelli tabak", icerik: "Taban + falafel", ek: 70, porsiyon: "1 tabak", fiyat: 220, gorsel: "" },
      { ad: "Tavuklu tabak", icerik: "Taban + körili, kremalı mantarlı, sweet chili, biberli salçalı veya tiftik tavuk", ek: 150, porsiyon: "1 tabak", fiyat: 300, gorsel: "" },
      { ad: "Köfteli tabak", icerik: "Taban + domates soslu köfte", ek: 250, porsiyon: "1 tabak", fiyat: 400, gorsel: "" },
      { ad: "Ton balıklı tabak", icerik: "Taban + ton balığı", ek: 270, porsiyon: "1 tabak", fiyat: 420, gorsel: "" },
      { ad: "Ekstra garnitür", porsiyon: "1 adet", fiyat: 20, ekstra: true },
      { ad: "Ekstra sos", porsiyon: "1 adet", fiyat: 25, ekstra: true },
      { ad: "Çift tahıl", porsiyon: "1 adet", fiyat: 25, ekstra: true },
    ],
  },
  {
    id: "wraplar", baslik: "Wrap'lar", renk: "sari", duzen: "kart",
    urunler: [
      { ad: "Falafel Humus Wrap", icerik: "Lavaş, falafel, humus, közlenmiş kapya, salatalık, lahana turşusu, jalapeno, marul, roast sarımsaklı yoğurt", porsiyon: "1 adet", kcal: 651, protein: 26, fiyat: 210, gorsel: "assets/wrap/wrap-kart.jpg" },
      { ad: "Ton Balıklı-Salatalıklı Wrap", icerik: "Lavaş, ton balığı (160 g), mayonez, salatalık, dereotu, karamelize soğan, sezar sos", porsiyon: "1 adet", kcal: 821, protein: 51, fiyat: 420, gorsel: "assets/wrap/wrap-kart.jpg" },
      { ad: "Tavuklu Avokadolu Wrap", icerik: "Lavaş, tiftik tavuk, dana füme, avokado, kaşar, çıtır patates, kapya, çarliston, acı soslu yoğurt", porsiyon: "1 adet", kcal: 731, protein: 40, fiyat: 265, gorsel: "assets/wrap/wrap-kart.jpg" },
      { ad: "Sebzeli Wrap", icerik: "Lavaş, avokado ezme, domates, marul, kaşar, haşlanmış yumurta", porsiyon: "1 adet", kcal: 501, protein: 24, fiyat: 190, gorsel: "assets/wrap/wrap-kart.jpg" },
      { ad: "Füme Kaşarlı Wrap", icerik: "Lavaş, dana füme, kaşar, domates, marul, ballı hardal", porsiyon: "1 adet", kcal: 501, protein: 22, fiyat: 220, gorsel: "assets/wrap/wrap-kart.jpg" },
      { ad: "Mantar Wrap", icerik: "Lavaş, kavrulmuş mantar, havuç, avokado, lahana turşusu, pul biber, marul, sezar sos", porsiyon: "1 adet", kcal: 392, protein: 9, fiyat: 200, gorsel: "assets/wrap/wrap-kart.jpg" },
      { ad: "Soslu Köfte Wrap", icerik: "Lavaş, köfte (125 g), domates, kornişon, kaşar, avokado ezme, ballı hardal", porsiyon: "1 adet", kcal: 769, protein: 33, fiyat: 380, gorsel: "assets/wrap/wrap-kart.jpg" },
      { ad: "Tavuklu-Kaşarlı Parmesan Wrap", icerik: "Lavaş, füme tavuk, tiftik tavuk, parmesan-kaşar, fesleğen, karamelize soğan, pul biber", porsiyon: "1 adet", kcal: 651, protein: 42, fiyat: 245, gorsel: "assets/wrap/wrap-kart.jpg" },
    ],
  },
  {
    id: "sandvicler", baslik: "Sandviçler", renk: "bordo", duzen: "kart",
    urunler: [
      { ad: "Labneli & Salamlı Sandviç", icerik: "Baget ekmek, labne, domates, salam (30 g), kaşar (45 g), marul", porsiyon: "1 adet", kcal: 608, protein: 27, fiyat: 190, gorsel: "" },
      { ad: "Avokado Ezmeli & Fesleğenli Sandviç", icerik: "Baget ekmek, avokado ezmesi, fesleğen, salam (30 g), kaşar (45 g), beyaz peynir (45 g)", porsiyon: "1 adet", kcal: 692, protein: 33, fiyat: 225, gorsel: "" },
      { ad: "Labneli & Maydanozlu Sandviç", icerik: "Baget ekmek, labne, maydanoz, domates, fesleğen, salam (30 g)", porsiyon: "1 adet", kcal: 443, protein: 16, fiyat: 145, gorsel: "" },
      { ad: "Krem Peynirli & Kaşarlı Sandviç", icerik: "Baget ekmek, krem peynir, salam (30 g), kaşar (60 g), marul, maydanoz", porsiyon: "1 adet", kcal: 676, protein: 30, fiyat: 210, gorsel: "" },
      { ad: "Labneli & Zeytinli Sandviç", icerik: "Baget ekmek, labne, siyah zeytin, yeşil zeytin, kaşar (40 g), marul", porsiyon: "1 adet", kcal: 622, protein: 22, fiyat: 180, gorsel: "" },
      { ad: "Dereotlu & Cevizli Sandviç", icerik: "Baget ekmek, labne, dereotu, ceviz, domates, zeytin, marul, salatalık", porsiyon: "1 adet", kcal: 396, protein: 12, fiyat: 140, yeni: true, gorsel: "" },
    ],
  },
  {
    id: "ucgen-sandvicler", baslik: "Üçgen Sandviçler", renk: "yesil", duzen: "kart",
    urunler: [
      { ad: "Ton Balıklı Üçgen Sandviç", icerik: "Sandviç ekmeği, ton balığı (104 g), mayonez, sezar sos, marul, salatalık", porsiyon: "1 adet", kcal: 457, protein: 36, fiyat: 295, gorsel: "" },
      { ad: "Pastırmalı Üçgen Sandviç", icerik: "Sandviç ekmeği, pastırma (100 g), kaşar, yeşillik, domates, ballı hardal sos", porsiyon: "1 adet", kcal: 544, protein: 43, fiyat: 350, gorsel: "" },
      { ad: "Gökkuşağı Üçgen Sandviç", icerik: "Sandviç ekmeği, labne, humus, kırmızı lahana, jalapeno, roka", porsiyon: "1 adet", kcal: 254, protein: 9, fiyat: 130, gorsel: "" },
      { ad: "Hindili Üçgen Sandviç", icerik: "Sandviç ekmeği, hindi füme (20 g), kaşar, yeşillik, domates, ballı hardal sos", porsiyon: "1 adet", kcal: 279, protein: 15, fiyat: 160, gorsel: "" },
    ],
  },
  {
    id: "mezeler", baslik: "Mezeler", renk: "mavi", duzen: "satir",
    urunler: [
      { ad: "Haydari", icerik: "Süzme yoğurt, labne, beyaz peynir, ceviz, zeytinyağı, sarımsak, dereotu, kuru nane, pul biber, tereyağı", porsiyon: "150 g", kcal: 260, protein: 14, fiyat: 155, gorsel: "" },
      { ad: "Kuru Cacık", icerik: "Süzme yoğurt, salatalık, sarımsak, zeytinyağı, kuru nane, dereotu, limon suyu", porsiyon: "150 g", kcal: 152, protein: 12, fiyat: 125, gorsel: "" },
      { ad: "Pancar Tarator", icerik: "Pancar, süzme yoğurt, labne, ceviz, sarımsak, limon suyu, zeytinyağı", porsiyon: "150 g", kcal: 132, protein: 5, fiyat: 105, gorsel: "" },
      { ad: "Muhammara", icerik: "Köz kapya, ceviz, galeta unu, zeytinyağı, nar ekşisi, sarımsak, limon suyu, isot, kimyon", porsiyon: "150 g", kcal: 274, protein: 6, fiyat: 170, gorsel: "" },
      { ad: "Labneli Köz Kapya", icerik: "Köz kapya, labne, yoğurt, zeytinyağı, sarımsak, limon suyu, pul biber, ceviz", porsiyon: "150 g", kcal: 158, protein: 4, fiyat: 155, gorsel: "" },
      { ad: "Humus", icerik: "Nohut, tahin, limon suyu, zeytinyağı, sarımsak, kimyon", porsiyon: "150 g", kcal: 372, protein: 14, fiyat: 95, gorsel: "" },
      { ad: "Atom", icerik: "Süzme yoğurt, labne, sarımsak, Arnavut biberi, tereyağı, zeytinyağı, pul biber", porsiyon: "150 g", kcal: 275, protein: 12, fiyat: 160, gorsel: "" },
      { ad: "Mutabel", icerik: "Köz patlıcan, tahin, süzme yoğurt, limon suyu, zeytinyağı, sarımsak, kimyon, maydanoz", porsiyon: "150 g", kcal: 237, protein: 7, fiyat: 115, gorsel: "" },
      { ad: "Zeytin Ezmesi", icerik: "Siyah zeytin, yeşil zeytin, zeytinyağı, ceviz, sarımsak, kekik, karabiber", porsiyon: "150 g", kcal: 476, protein: 4, fiyat: 165, gorsel: "" },
      { ad: "Kuru Domates Ezmesi", icerik: "Kuru domates, zeytinyağı, ceviz, sarımsak, nar ekşisi, maydanoz, kekik, pul biber", porsiyon: "150 g", kcal: 568, protein: 16, fiyat: 190, gorsel: "" },
      { ad: "Kısır", icerik: "İnce bulgur, domates salçası, biber salçası, zeytinyağı, limon suyu, nar ekşisi, maydanoz, taze soğan, salatalık, domates, pul biber, kimyon", porsiyon: "150 g", kcal: 271, protein: 5, fiyat: 110, gorsel: "" },
      { ad: "Makarna Salatası", icerik: "Makarna, yoğurt, mayonez, kornişon turşu, yaş nane", porsiyon: "250 g", kcal: 425, protein: 11, fiyat: 105, gorsel: "" },
      { ad: "Mor Lahana Salatası", icerik: "Mor lahana, yoğurt, mayonez, sıvı yağ, sarımsak, tuz", porsiyon: "145 g", kcal: 306, protein: 3, fiyat: 100, gorsel: "" },
      { ad: "Patatesli Kabak Mücver", icerik: "Kabak, patates, kuru soğan, yumurta, yeşil soğan, maydanoz, dereotu, taze nane, un, pul biber, karabiber", porsiyon: "200 g", kcal: 322, protein: 7, fiyat: 105, onerilen: true, yeni: true, gorsel: "" },
      { ad: "Yoğurtlu Pancar Salatası", icerik: "Pancar, yoğurt, zeytinyağı, maydanoz", porsiyon: "140 g", kcal: 94, protein: 3, fiyat: 85, onerilen: true, yeni: true, gorsel: "" },
    ],
  },
  {
    id: "granolalar", baslik: "Granolalar", renk: "sari", duzen: "kart",
    urunler: [
      { ad: "Muzlu Çikolatalı Granola", icerik: "Süzme yoğurt, labne, muz, karabuğday granola, kakao, bal, bitter çikolata, fındık", porsiyon: "260 g", kcal: 519, protein: 18, fiyat: 185, gorsel: "" },
      { ad: "Elmalı Granola", icerik: "Süzme yoğurt, elma, granola", porsiyon: "260 g", kcal: 384, protein: 20, fiyat: 150, gorsel: "" },
      { ad: "Armutlu Granola", icerik: "Süzme yoğurt, armut, granola", porsiyon: "260 g", kcal: 381, protein: 19, fiyat: 155, gorsel: "" },
      { ad: "Portakallı Granola", icerik: "Süzme yoğurt, portakal, müsli", porsiyon: "260 g", kcal: 354, protein: 20, fiyat: 135, gorsel: "" },
      { ad: "Narlı Granola", icerik: "Süzme yoğurt, nar, granola", porsiyon: "260 g", kcal: 402, protein: 21, fiyat: 150, gorsel: "" },
      { ad: "Ejder Meyveli Granola", icerik: "Süzme yoğurt, ejder meyvesi, granola", porsiyon: "260 g", kcal: 387, protein: 20, fiyat: 195, gorsel: "" },
      { ad: "Kakaolu Kuruyemişli Granola", icerik: "Süzme yoğurt, granola, kuruyemiş, bal", porsiyon: "260 g", kcal: 587, protein: 27, fiyat: 230, gorsel: "" },
      { ad: "Çilekli Chia Granola", icerik: "Süzme yoğurt, çilek, chia, granola", porsiyon: "260 g", kcal: 386, protein: 20, fiyat: 175, gorsel: "" },
      { ad: "Muzlu Kakaolu Granola", icerik: "Süzme yoğurt, muz, kakao, granola", porsiyon: "260 g", kcal: 426, protein: 20, fiyat: 170, gorsel: "" },
    ],
  },
  {
    id: "smoothieler", baslik: "Smoothie'ler", renk: "bordo", duzen: "kart",
    urunler: [
      { ad: "Yeşil Smoothie", icerik: "Salatalık, armut, yoğurt, taze nane, limon suyu, buz", porsiyon: "340 g", kcal: 109, protein: 4, fiyat: 70, gorsel: "" },
      { ad: "Sarı Smoothie", icerik: "Hurma, avokado, fıstık ezmesi, susam, havuç, zerdeçal, limon suyu, süt, buz", porsiyon: "340 g", kcal: 383, protein: 10, fiyat: 155, gorsel: "" },
      { ad: "Mor Smoothie", icerik: "Muz, süt, yaban mersini, fıstık ezmesi, yulaf, kakao, buz", porsiyon: "340 g", kcal: 229, protein: 7, fiyat: 230, gorsel: "" },
      { ad: "Kırmızı-Rose Smoothie", icerik: "Beyaz üzüm, ejder meyvesi, yoğurt, pancar, fıstık ezmesi, nane, tarçın, buz", porsiyon: "340 g", kcal: 216, protein: 7, fiyat: 140, gorsel: "" },
    ],
  },
  {
    id: "sikma-sular", baslik: "Sıkma Sular & Shot'lar", renk: "yesil", duzen: "satir",
    urunler: [
      { ad: "Pancar-Limon-Elma-Zencefil", icerik: "Pancar, limon, elma, zencefil", porsiyon: "300 ml", kcal: 123, protein: 2, fiyat: 130, gorsel: "" },
      { ad: "Portakal Suyu", icerik: "Portakal", porsiyon: "300 ml", kcal: 135, protein: 2, fiyat: 80, gorsel: "" },
      { ad: "Elma-Armut-Ispanak-Maydanoz-Mandalina", icerik: "Elma, armut, ıspanak, maydanoz, mandalina", porsiyon: "300 ml", kcal: 127, protein: 1, fiyat: 120, gorsel: "" },
      { ad: "Portakal-Nar", icerik: "Portakal, nar", porsiyon: "500 ml", kcal: 238, protein: 3, fiyat: 140, gorsel: "" },
      { ad: "Greyfurt-Portakal-Limon", icerik: "Greyfurt, portakal, limon", porsiyon: "300 ml", kcal: null, protein: null, fiyat: 90, gorsel: "" },
      { ad: "Tarçın-Elma-Armut", icerik: "Elma, armut, tarçın", porsiyon: "300 ml", kcal: null, protein: null, fiyat: 120, gorsel: "" },
      { ad: "Havuç Suyu", icerik: "Havuç", porsiyon: "300 ml", kcal: 120, protein: 3, fiyat: 80, gorsel: "" },
      { ad: "Elma Suyu", icerik: "Elma", porsiyon: "300 ml", kcal: 138, protein: "<1", fiyat: 85, gorsel: "" },
      { ad: "Ananas-Mango-Mürdüm Eriği", icerik: "Ananas, mango, mürdüm eriği", porsiyon: "300 ml", kcal: 163, protein: 2, fiyat: 220, yeni: true, gorsel: "" },
      { ad: "Hot Shot", icerik: "Elma, portakal, limon, havuç, acı biber, zencefil, zerdeçal", porsiyon: "70 ml", kcal: 30, protein: "<1", fiyat: 60, gorsel: "" },
      { ad: "Zencefil Shot", icerik: "Zencefil, limon", porsiyon: "70 ml", kcal: 23, protein: "<1", fiyat: 60, gorsel: "" },
      { ad: "Maydanoz-Limon Shot", icerik: "Maydanoz, limon", porsiyon: "70 ml", kcal: 16, protein: "<1", fiyat: 60, gorsel: "" },
    ],
  },
  {
    id: "detoks-sulari", baslik: "Detoks Suları", renk: "mavi", duzen: "satir",
    urunler: [
      { ad: "Elma-Limon-Nane Detoks Suyu", icerik: "Su, elma, limon, taze nane", porsiyon: "1 şişe", kcal: 10, protein: "<1", fiyat: 40, yeni: true, gorsel: "" },
      { ad: "Portakal-Zencefil-Tarçın Detoks Suyu", icerik: "Su, portakal, zencefil, tarçın", porsiyon: "1 şişe", kcal: 10, protein: "<1", fiyat: 40, yeni: true, gorsel: "" },
    ],
  },
  {
    id: "atom-icecegi", baslik: "Atom İçeceği", renk: "sari", duzen: "satir",
    urunler: [
      { ad: "Sütlü Atom", icerik: "Süt, muz, fındık, ceviz, bal", porsiyon: "330 ml", kcal: 250, protein: 9, fiyat: 110, gorsel: "" },
      { ad: "Badem Sütlü Atom", icerik: "Badem sütü, muz, fındık, ceviz, bal", porsiyon: "330 ml", kcal: 169, protein: 3, fiyat: 120, gorsel: "" },
    ],
  },
  {
    id: "ayranlar", baslik: "Ayranlar", renk: "bordo", duzen: "satir",
    urunler: [
      { ad: "Avokadolu Ayran", icerik: "Yoğurt, soda, su, avokado, taze nane, limon suyu, tuz", porsiyon: "~390 ml", kcal: 79, protein: 3, fiyat: 90, yeni: true, gorsel: "" },
      { ad: "Pestolu-Sodalı Ayran", icerik: "Yoğurt, pesto, soda", porsiyon: "300 ml", kcal: null, protein: null, fiyat: null, gorsel: "" },
    ],
  },
  {
    id: "tek-meyve", baslik: "Tek Meyve", renk: "neon", duzen: "satir",
    urunler: [
      { ad: "Elma", porsiyon: "1 adet", kcal: 105, protein: "<1", fiyat: 35, onerilen: true, gorsel: "" },
      { ad: "Armut", porsiyon: "1 adet", kcal: 115, protein: "<1", fiyat: 40, onerilen: true, gorsel: "" },
      { ad: "Muz", porsiyon: "1 adet", kcal: 105, protein: 1, fiyat: 40, onerilen: true, gorsel: "" },
      { ad: "Portakal", porsiyon: "1 adet", kcal: 75, protein: 1, fiyat: 25, onerilen: true, gorsel: "" },
    ],
  },
];
