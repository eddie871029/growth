# 安安與樂樂 成長趨勢手冊 (Growth Tracker)

專為 **安安**（2021/11/26 男孩，中班）與 **樂樂**（2023/06/03 男孩，小班）量身打造的成長紀錄網頁。

---

## 🌟 功能亮點

1. **雙寶首頁儀表板**：
   - 即時計算精準歲月日年齡（例如：4歲9個月、3歲3個月）。
   - 最新身高、體重、腳長、鞋碼與 BMI 速覽。
2. **生長百分位曲線視覺化**：
   - 整合**衛福部/WHO 0~7 歲男童標準生長常模曲線（P3, P15, P50, P85, P97）**。
   - 支援切換**身高曲線 (cm)** 與 **體重曲線 (kg)**。
3. **雙寶同年齡成長對比**：
   - 將兩兄弟拉到同一個歲數跑道（0歲、1歲、2歲、3歲...），對照身高、體重成長步調。
4. **兒童鞋碼與選鞋指南**：
   - 幼兒腳長 (cm) 對應日本碼 (JP)、美碼 (US)、歐碼 (EUR)。
   - 互動式腳長試算工具（自動計算預留空間 0.8~1.0cm）。
   - 熱門童鞋品牌（NB、IFME、Nike、ASICS）版型選購特性提示。
5. **歷史數據與生活里程碑時間軸**：
   - 歷次測量數據表與健康備忘。
   - 雙輪腳踏車、幼兒園入學、換牙與童言童語金句語錄。
6. **方案 C 線上查詢與即時更新機制**：
   - **本機/線上網頁即時填表**：自動存入瀏覽器 LocalStorage，圖表與表格立即無縫重繪。
   - **一鍵匯出同步**：點擊「下載最新 data.js」覆蓋本地檔案並推送至 GitHub，線上 GitHub Pages 立即生效。

---

## 💻 本地開啟與預覽

直接以瀏覽器開啟 `index.html` 即可瀏覽：

```bash
open /Users/tjwu/Desktop/antigravity/growth/index.html
```

或使用簡易本機伺服器：
```bash
cd /Users/tjwu/Desktop/antigravity/growth
python3 -m http.server 8080
# 瀏覽器開啟 http://localhost:8080
```

---

## 🚀 部署至 GitHub Pages（方案 C）

如同沖繩旅遊計畫（oki）相同的方式：

1. **初始化 Git 倉庫**：
   ```bash
   cd /Users/tjwu/Desktop/antigravity/growth
   git init
   git add .
   git commit -m "feat: initial release of Growth Tracker for An-An & Le-Le"
   ```

2. **建立 GitHub 遠端倉庫並推送**：
   ```bash
   git remote add origin https://github.com/eddie871029/growth.git
   git branch -M main
   git push -u origin main
   ```

3. **啟用 GitHub Pages**：
   - 進入 GitHub 倉庫設定 `Settings` -> `Pages`
   - Source 選擇 `Deploy from a branch` -> `main` / `root`
   - 完成後即可獲得專屬公開網址（例如：`https://eddie871029.github.io/growth/`），手機與電腦隨時隨地連線查詢！

---

## 📝 檔案結構說明

- `index.html`：現代語意化頁面結構與導覽標籤（Tab）。
- `styles.css`：高質感配色樣式（安安橙金、樂樂湖水藍、自適應 RWD）。
- `data.js`：初始數據庫（安安與樂樂基本資料、歷史數據、衛福部常模、鞋碼指南）。
- `app.js`：核心業務邏輯（即時年齡計算、Chart.js 圖表渲染、鞋碼計算機、LocalStorage 存取與匯出）。
