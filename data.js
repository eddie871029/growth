/**
 * 安安與樂樂 成長趨勢紀錄資料庫 (Growth Tracker Data)
 * 衛福部/WHO 男童 0-7 歲生長曲線標準、歷史生理數據、里程碑與鞋碼對照表
 */

const INITIAL_GROWTH_DATA = {
  children: {
    anan: {
      id: "anan",
      name: "安安",
      nickName: "安哥",
      birthDate: "2021-11-26",
      gender: "boy",
      currentGrade: "幼稚園中班",
      themeColor: "#f59e0b",
      accentColor: "#d97706",
      lightColor: "#fef3c7",
      avatar: "👦",
      // 歷史測量紀錄
      records: [
        { date: "2021-11-26", ageMonths: 0, height: 50.5, weight: 3.35, footLength: 8.0, shoeSize: "新生兒", head: 34.5, note: "安安誕生！健康響亮的哭聲 🌟" },
        { date: "2022-02-26", ageMonths: 3, height: 61.2, weight: 6.2, footLength: 9.5, shoeSize: "10 cm", head: 40.5, note: "滿三個月健檢，會抬頭對人微笑囉" },
        { date: "2022-05-26", ageMonths: 6, height: 67.8, weight: 7.9, footLength: 10.5, shoeSize: "11 cm", head: 43.0, note: "滿半歲，開始吃副食品（十倍粥）" },
        { date: "2022-11-26", ageMonths: 12, height: 75.8, weight: 9.8, footLength: 12.0, shoeSize: "12.5 cm", head: 46.0, note: "🎂 1歲抓周！抓到工程積木，開始扶站" },
        { date: "2023-05-26", ageMonths: 18, height: 83.2, weight: 11.4, footLength: 13.0, shoeSize: "13.5 cm", head: 47.5, note: "步態穩健，很愛在公園小跑步" },
        { date: "2023-11-26", ageMonths: 24, height: 88.5, weight: 12.8, footLength: 14.0, shoeSize: "14.5 cm", head: 48.8, note: "🎂 2歲生日！樂樂出生前夕，語言開始大爆發" },
        { date: "2024-05-26", ageMonths: 30, height: 93.0, weight: 14.1, footLength: 15.0, shoeSize: "15.5 cm", head: 49.5, note: "幼幼班階段，會自己穿鞋子與自己吃飯" },
        { date: "2024-11-26", ageMonths: 36, height: 97.2, weight: 15.3, footLength: 16.0, shoeSize: "16.5 cm", head: 50.2, note: "🎂 3歲生日！騎滑步車飛快，很照顧弟弟" },
        { date: "2025-05-26", ageMonths: 42, height: 101.5, weight: 16.5, footLength: 16.8, shoeSize: "17.0 cm", head: 50.8, note: "滿 3 歲半小班升中班，塗氟牙齒無蛀牙" },
        { date: "2025-11-26", ageMonths: 48, height: 105.8, weight: 17.6, footLength: 17.5, shoeSize: "18.0 cm", head: 51.2, note: "🎂 4歲生日！升中班，喜愛恐龍與拼圖" },
        { date: "2026-05-26", ageMonths: 54, height: 109.5, weight: 18.8, footLength: 18.2, shoeSize: "18.5 cm", head: 51.5, note: "中班下學期體檢，視力檢查 1.0 正常" },
        { date: "2026-09-01", ageMonths: 57, height: 111.2, weight: 19.4, footLength: 18.6, shoeSize: "19.0 cm", head: 51.7, note: "新學期開學量測，活力充沛的帥氣小男孩" }
      ],
      // 發展里程碑與趣事金句
      milestones: [
        { date: "2026-08", title: "中班雙輪腳踏車挑戰成功", desc: "卸掉輔助輪，在公園一次就學會平衡騎車！", category: "motor", icon: "🚲" },
        { date: "2026-06", title: "金句語錄：「我是保護樂樂的隊長」", desc: "弟弟跌倒時，馬上拿衛生紙給弟弟拍拍說：『別哭，哥哥保護你！』", category: "quote", icon: "💬" },
        { date: "2026-04", title: "幼兒園中班視力與口腔塗氟", desc: "雙眼裸視 1.0，牙醫師稱讚刷牙非常乾淨，0 蛀牙獎勵貼紙一枚", category: "health", icon: "🦷" },
        { date: "2025-10", title: "生活自理大躍進", desc: "每天放學回家自己把餐碗拿去水槽，並把鞋襪擺放整齊", category: "skill", icon: "⭐" },
        { date: "2024-11", title: "三歲升格當哥哥的溫暖陪伴", desc: "會幫忙拿奶瓶、拿尿布給爸爸媽媽，是個超級神隊友", category: "social", icon: "❤️" }
      ]
    },
    lele: {
      id: "lele",
      name: "樂樂",
      nickName: "樂寶",
      birthDate: "2023-06-03",
      gender: "boy",
      currentGrade: "幼稚園小班",
      themeColor: "#0d9488",
      accentColor: "#0f766e",
      lightColor: "#ccfbf1",
      avatar: "👶",
      // 歷史測量紀錄
      records: [
        { date: "2023-06-03", ageMonths: 0, height: 49.8, weight: 3.20, footLength: 7.8, shoeSize: "新生兒", head: 34.0, note: "樂樂報到！全家人的開心果 ☀️" },
        { date: "2023-09-03", ageMonths: 3, height: 60.5, weight: 6.1, footLength: 9.2, shoeSize: "10 cm", head: 40.0, note: "三個月健檢，笑容超級甜" },
        { date: "2023-12-03", ageMonths: 6, height: 67.0, weight: 7.8, footLength: 10.3, shoeSize: "11 cm", head: 42.8, note: "開始吃副食品，胃口很好是個小吃貨" },
        { date: "2024-06-03", ageMonths: 12, height: 75.0, weight: 9.6, footLength: 11.8, shoeSize: "12.5 cm", head: 45.8, note: "🎂 1歲抓周！抓了麥克風，很早就開始扶著趴趴走" },
        { date: "2024-12-03", ageMonths: 18, height: 82.5, weight: 11.2, footLength: 13.0, shoeSize: "13.5 cm", head: 47.2, note: "走得飛快，最喜歡當哥哥的跟屁蟲" },
        { date: "2025-06-03", ageMonths: 24, height: 87.8, weight: 12.5, footLength: 14.0, shoeSize: "14.5 cm", head: 48.5, note: "🎂 2歲生日！超愛講話與模仿哥哥唱歌" },
        { date: "2025-12-03", ageMonths: 30, height: 92.2, weight: 13.8, footLength: 14.8, shoeSize: "15.0 cm", head: 49.2, note: "戒白天尿布成功！會自己表達要尿尿" },
        { date: "2026-06-03", ageMonths: 36, height: 96.5, weight: 15.0, footLength: 15.8, shoeSize: "16.0 cm", head: 49.8, note: "🎂 3歲生日！準備上幼兒園小班，個性活潑開朗" },
        { date: "2026-09-01", ageMonths: 39, height: 98.6, weight: 15.6, footLength: 16.2, shoeSize: "16.5 cm", head: 50.1, note: "開學進小班，適應力超強，開開心心上學！" }
      ],
      // 發展里程碑與趣事金句
      milestones: [
        { date: "2026-09", title: "開學第一天沒有哭！", desc: "背著小書包跟老師揮手說『拜拜』，表現超級勇敢", category: "school", icon: "🎒" },
        { date: "2026-07", title: "金句語錄：「我要跟安安哥哥一樣大」", desc: "看到哥哥喝鮮奶，馬上把自己的水杯乾杯說：『我也要快快長大！』", category: "quote", icon: "💬" },
        { date: "2026-05", title: "幼兒塗氟與身高量測", desc: "完全不怕看牙醫，乖乖躺平讓醫師塗氟，拿到小車車貼紙", category: "health", icon: "🦷" },
        { date: "2025-11", title: "滑步車高手", desc: "看哥哥騎車默默學會，現在雙腳離地滑行超穩", category: "motor", icon: "🛴" },
        { date: "2025-06", title: "兩歲語言大爆發", desc: "每天嘰哩咕嚕講個不停，會唱整首兒歌", category: "skill", icon: "🎵" }
      ]
    }
  },

  // 衛福部/WHO 0-7 歲 (0-84 個月) 男童生長曲線標準參考值 (Height cm, Weight kg, BMI)
  // P3, P15, P50, P85, P97
  whoStandards: {
    height: [
      { month: 0, p3: 46.1, p15: 47.9, p50: 49.9, p85: 51.8, p97: 53.7 },
      { month: 3, p3: 57.3, p15: 59.4, p50: 61.4, p85: 63.5, p97: 65.5 },
      { month: 6, p3: 63.3, p15: 65.5, p50: 67.6, p85: 69.8, p97: 71.9 },
      { month: 9, p3: 67.7, p15: 70.1, p50: 72.0, p85: 74.3, p97: 76.5 },
      { month: 12, p3: 71.0, p15: 73.4, p50: 75.7, p85: 78.1, p97: 80.5 },
      { month: 18, p3: 76.9, p15: 79.6, p50: 82.3, p85: 85.0, p97: 87.7 },
      { month: 24, p3: 82.1, p15: 85.1, p50: 87.8, p85: 90.9, p97: 93.9 },
      { month: 30, p3: 86.7, p15: 90.0, p50: 93.2, p85: 96.5, p97: 99.8 },
      { month: 36, p3: 90.7, p15: 94.3, p50: 97.5, p85: 101.0, p97: 104.5 },
      { month: 42, p3: 94.4, p15: 98.2, p50: 101.7, p85: 105.3, p97: 109.1 },
      { month: 48, p3: 97.7, p15: 101.9, p50: 105.4, p85: 109.3, p97: 113.3 },
      { month: 54, p3: 100.9, p15: 105.3, p50: 109.0, p85: 113.1, p97: 117.3 },
      { month: 60, p3: 103.9, p15: 108.5, p50: 112.4, p85: 116.7, p97: 121.1 },
      { month: 66, p3: 106.7, p15: 111.5, p50: 115.6, p85: 120.2, p97: 124.7 },
      { month: 72, p3: 109.4, p15: 114.4, p50: 118.7, p85: 123.5, p97: 128.2 },
      { month: 84, p3: 114.4, p15: 119.8, p50: 124.6, p85: 129.8, p97: 135.0 }
    ],
    weight: [
      { month: 0, p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.9, p97: 4.4 },
      { month: 3, p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.2, p97: 8.0 },
      { month: 6, p3: 6.4, p15: 7.1, p50: 7.9, p85: 8.8, p97: 9.8 },
      { month: 9, p3: 7.2, p15: 8.0, p50: 8.9, p85: 9.9, p97: 11.0 },
      { month: 12, p3: 7.7, p15: 8.6, p50: 9.6, p85: 10.8, p97: 12.0 },
      { month: 18, p3: 8.8, p15: 9.8, p50: 10.9, p85: 12.2, p97: 13.7 },
      { month: 24, p3: 9.7, p15: 10.8, p50: 12.2, p85: 13.6, p97: 15.3 },
      { month: 30, p3: 10.5, p15: 11.8, p50: 13.3, p85: 15.0, p97: 16.9 },
      { month: 36, p3: 11.3, p15: 12.7, p50: 14.3, p85: 16.2, p97: 18.3 },
      { month: 42, p3: 12.0, p15: 13.6, p50: 15.3, p85: 17.4, p97: 19.7 },
      { month: 48, p3: 12.7, p15: 14.4, p50: 16.3, p85: 18.6, p97: 21.2 },
      { month: 54, p3: 13.4, p15: 15.3, p50: 17.3, p85: 19.8, p97: 22.7 },
      { month: 60, p3: 14.1, p15: 16.1, p50: 18.3, p85: 21.0, p97: 24.2 },
      { month: 66, p3: 14.8, p15: 17.0, p50: 19.4, p85: 22.3, p97: 25.8 },
      { month: 72, p3: 15.5, p15: 17.9, p50: 20.5, p85: 23.6, p97: 27.4 },
      { month: 84, p3: 17.0, p15: 19.8, p50: 22.9, p85: 26.5, p97: 31.0 }
    ]
  },

  // 兒童鞋碼對照與建議尺碼
  shoeSizeGuide: [
    { footCm: "12.0 ~ 12.5", jp: "13.0", us: "6C", eur: "22", stage: "學步期 (約 1 歲)", note: "鞋底柔軟彈性佳，包覆腳踝" },
    { footCm: "12.6 ~ 13.0", jp: "13.5", us: "7C", eur: "23", stage: "學步期 (約 1.5 歲)", note: "寬楦頭，預留 0.5-0.8cm" },
    { footCm: "13.1 ~ 13.5", jp: "14.0", us: "7.5C", eur: "24", stage: "幼幼期 (約 2 歲)", note: "魔鬼氈好穿脫" },
    { footCm: "13.6 ~ 14.2", jp: "14.5 ~ 15.0", us: "8C ~ 8.5C", eur: "25", stage: "幼幼期 (約 2 ~ 2.5 歲)", note: "活動量大，注重避震" },
    { footCm: "14.3 ~ 15.0", jp: "15.5 ~ 16.0", us: "9C ~ 9.5C", eur: "26", stage: "小班 (約 3 歲)", note: "樂樂目前區間，預留 0.8~1cm" },
    { footCm: "15.1 ~ 15.8", jp: "16.5", us: "10C", eur: "27", stage: "小班~中班 (約 3.5 歲)", note: "鞋頭防撞橡膠保護腳趾" },
    { footCm: "15.9 ~ 16.7", jp: "17.0 ~ 17.5", us: "11C", eur: "28", stage: "中班 (約 4 歲)", note: "支撐性佳的運動童鞋" },
    { footCm: "16.8 ~ 17.5", jp: "18.0", us: "12C", eur: "29 ~ 30", stage: "中班 (約 4.5 歲)", note: "安安目前區間，建議買 18.5 或 19.0" },
    { footCm: "17.6 ~ 18.3", jp: "18.5 ~ 19.0", us: "12.5C ~ 13C", eur: "31", stage: "大班 (約 5 歲)", note: "適合跑步、騎車的多功能運動鞋" },
    { footCm: "18.4 ~ 19.2", jp: "19.5 ~ 20.0", us: "1Y", eur: "32 ~ 33", stage: "大班~小一 (約 6 歲)", note: "準備銜接小學青年童鞋" }
  ],

  // 常見童鞋品牌挑選版型提示
  brandTips: [
    { brand: "New Balance (如 996 / 373)", fit: "版型正常偏合腳，若肉肉腳或腳背高建議大半號 (W寬楦更佳)" },
    { brand: "IFME (日本健康機能鞋)", fit: "高包覆、專為亞洲寬腳設計，排水鞋墊，版型適中拿實際腳長+0.8cm即可" },
    { brand: "Nike (如 Dynamo 毛毛蟲鞋 / Star Runner)", fit: "毛毛蟲鞋套入式版型偏大約半號；繫帶/黏貼款運動鞋版型偏正常窄長" },
    { brand: "ASICS (亞瑟士 走步/SUKU2 系列)", fit: "腳後跟穩定包覆極佳，分前幼童與中童款，尺寸精準" }
  ]
};

// 讓瀏覽器與 Node.js 皆可讀取
if (typeof module !== "undefined" && module.exports) {
  module.exports = INITIAL_GROWTH_DATA;
}
