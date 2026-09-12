/**
 * 安安與樂樂 成長趨勢手冊 (Growth Tracker) - 核心控制邏輯
 */

// 全域狀態
let growthData = null;
let currentCharts = {
  anan: null,
  lele: null,
  compare: null
};
let currentMetric = {
  anan: "height",
  lele: "height",
  compare: "height"
};

// 儲存鍵值
const STORAGE_KEY = "GROWTH_TRACKER_DATA_V1";

// 初始化
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  initNavTabs();
  renderAllViews();
  // 預設今日日期給新增表單
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById("input-date");
  if (dateInput) dateInput.value = today;
});

/**
 * 載入資料 (優先從 LocalStorage 讀取，否則載入 INITIAL_GROWTH_DATA)
 */
function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      growthData = JSON.parse(saved);
    } catch (e) {
      console.warn("無法解析本機資料，使用初始資料庫", e);
      growthData = JSON.parse(JSON.stringify(INITIAL_GROWTH_DATA));
    }
  } else {
    growthData = JSON.parse(JSON.stringify(INITIAL_GROWTH_DATA));
  }
}

/**
 * 儲存資料至 LocalStorage
 */
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(growthData));
}

/**
 * 精準計算年齡 (回傳物件與文字)
 */
function calculateAge(birthDateStr, targetDateStr = null) {
  const birth = new Date(birthDateStr);
  const now = targetDateStr ? new Date(targetDateStr) : new Date();
  
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalMonths = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  return {
    years,
    months,
    days,
    totalMonths,
    formatted: `${years} 歲 ${months} 個月 ${days} 天`
  };
}

/**
 * 計算 BMI
 */
function calculateBMI(heightCm, weightKg) {
  if (!heightCm || !weightKg) return "--";
  const hM = heightCm / 100;
  return (weightKg / (hM * hM)).toFixed(1);
}

/**
 * 估算衛福部生長百分位區間
 */
function estimatePercentile(metric, ageMonths, value) {
  const standards = growthData.whoStandards[metric];
  if (!standards) return "標準區間";

  // 尋找最接近之月齡
  let closest = standards[0];
  let minDiff = 9999;
  for (const s of standards) {
    const diff = Math.abs(s.month - ageMonths);
    if (diff < minDiff) {
      minDiff = diff;
      closest = s;
    }
  }

  if (value >= closest.p97) return "高於 97% (特高)";
  if (value >= closest.p85) return "約 85% ~ 97% (優異)";
  if (value >= closest.p50) return "約 50% ~ 85% (健康標準)";
  if (value >= closest.p15) return "約 15% ~ 50% (健康標準)";
  if (value >= closest.p3) return "約 3% ~ 15% (正常偏小)";
  return "低於 3% (需加強營養)";
}

/**
 * 渲染全站視圖
 */
function renderAllViews() {
  renderHeroSummary();
  renderOverviewMetrics();
  renderTables();
  renderTimelines();
  renderShoeGuide();
  renderBrandTips();

  // 繪製圖表
  renderSingleChart("anan", currentMetric.anan);
  renderSingleChart("lele", currentMetric.lele);
  renderCompareChart(currentMetric.compare);
}

/**
 * 渲染頂部 Hero 摘要卡片
 */
function renderHeroSummary() {
  const anan = growthData.children.anan;
  const lele = growthData.children.lele;

  const ananAge = calculateAge(anan.birthDate);
  const leleAge = calculateAge(lele.birthDate);

  document.getElementById("hero-age-anan").textContent = ananAge.formatted;
  document.getElementById("hero-age-lele").textContent = leleAge.formatted;

  const ananLatest = anan.records[anan.records.length - 1] || {};
  const leleLatest = lele.records[lele.records.length - 1] || {};

  document.getElementById("hero-h-anan").textContent = ananLatest.height || "--";
  document.getElementById("hero-w-anan").textContent = ananLatest.weight || "--";
  document.getElementById("hero-s-anan").textContent = ananLatest.shoeSize || "--";
  document.getElementById("hero-bmi-anan").textContent = calculateBMI(ananLatest.height, ananLatest.weight);

  document.getElementById("hero-h-lele").textContent = leleLatest.height || "--";
  document.getElementById("hero-w-lele").textContent = leleLatest.weight || "--";
  document.getElementById("hero-s-lele").textContent = leleLatest.shoeSize || "--";
  document.getElementById("hero-bmi-lele").textContent = calculateBMI(leleLatest.height, leleLatest.weight);
}

/**
 * 渲染總覽儀表板卡片
 */
function renderOverviewMetrics() {
  ["anan", "lele"].forEach(childId => {
    const child = growthData.children[childId];
    const latest = child.records[child.records.length - 1] || {};
    const age = calculateAge(child.birthDate, latest.date);
    const bmi = calculateBMI(latest.height, latest.weight);
    const hPercentile = estimatePercentile("height", latest.ageMonths || age.totalMonths, latest.height);

    const container = document.getElementById(`overview-metrics-${childId}`);
    if (!container) return;

    container.innerHTML = `
      <div class="metric-pill">
        <div class="metric-label">目前身高</div>
        <div class="metric-val">${latest.height || "--"} <span class="metric-unit">cm</span></div>
        <div class="metric-sub p-normal">${hPercentile}</div>
      </div>
      <div class="metric-pill">
        <div class="metric-label">目前體重</div>
        <div class="metric-val">${latest.weight || "--"} <span class="metric-unit">kg</span></div>
        <div class="metric-sub p-normal">BMI: ${bmi}</div>
      </div>
      <div class="metric-pill">
        <div class="metric-label">腳長 / 鞋碼</div>
        <div class="metric-val">${latest.footLength || "--"} <span class="metric-unit">cm</span></div>
        <div class="metric-sub" style="color: #4f46e5;">穿 ${latest.shoeSize || "--"}</div>
      </div>
      <div class="metric-pill">
        <div class="metric-label">最新量測日</div>
        <div class="metric-val" style="font-size: 1.05rem; padding-top: 4px;">${latest.date || "--"}</div>
        <div class="metric-sub" style="color: #64748b;">滿 ${latest.ageMonths || age.totalMonths} 個月</div>
      </div>
    `;
  });
}

/**
 * 渲染個別歷史表格
 */
function renderTables() {
  ["anan", "lele"].forEach(childId => {
    const child = growthData.children[childId];
    const tbody = document.querySelector(`#table-${childId} tbody`);
    const countSpan = document.getElementById(`${childId}-record-count`);
    if (!tbody) return;

    if (countSpan) countSpan.textContent = child.records.length;

    tbody.innerHTML = child.records.map(rec => {
      const bmi = calculateBMI(rec.height, rec.weight);
      const ageStr = `${Math.floor(rec.ageMonths / 12)} 歲 ${rec.ageMonths % 12} 月 (${rec.ageMonths}M)`;
      return `
        <tr>
          <td><strong>${rec.date}</strong></td>
          <td><span class="badge ${childId === 'anan' ? 'badge-anan' : 'badge-lele'}">${ageStr}</span></td>
          <td><strong>${rec.height}</strong> cm</td>
          <td><strong>${rec.weight}</strong> kg</td>
          <td>${bmi}</td>
          <td>👣 ${rec.footLength ? rec.footLength + ' cm' : '--'} / <strong>${rec.shoeSize || '--'}</strong></td>
          <td>${rec.head ? rec.head + ' cm' : '--'}</td>
          <td style="color: #475569;">${rec.note || ''}</td>
        </tr>
      `;
    }).reverse().join("");
  });
}

/**
 * 渲染里程碑時間軸
 */
function renderTimelines() {
  ["anan", "lele"].forEach(childId => {
    const child = growthData.children[childId];
    const container = document.getElementById(`timeline-${childId}`);
    if (!container) return;

    container.innerHTML = child.milestones.map(m => `
      <div class="timeline-item">
        <div class="timeline-dot" style="border-color: ${child.accentColor};">${m.icon || '⭐'}</div>
        <div class="timeline-content">
          <div class="timeline-header">
            <span class="timeline-title">${m.title}</span>
            <span class="timeline-date">${m.date}</span>
          </div>
          <div class="timeline-desc">${m.desc}</div>
        </div>
      </div>
    `).join("");
  });
}

/**
 * 渲染單一孩童生長曲線 (Chart.js)
 */
function renderSingleChart(childId, metric = "height") {
  const canvas = document.getElementById(`chart-${childId}`);
  if (!canvas) return;

  if (currentCharts[childId]) {
    currentCharts[childId].destroy();
  }

  const child = growthData.children[childId];
  const standards = growthData.whoStandards[metric];
  const maxMonth = childId === "anan" ? 66 : 48; // 顯示合理範圍
  const filteredStandards = standards.filter(s => s.month <= maxMonth);

  // X 軸標籤（月齡）
  const labels = filteredStandards.map(s => `${s.month}M`);

  // WHO 百分位常模數據
  const p97Data = filteredStandards.map(s => s.p97);
  const p85Data = filteredStandards.map(s => s.p85);
  const p50Data = filteredStandards.map(s => s.p50);
  const p15Data = filteredStandards.map(s => s.p15);
  const p3Data = filteredStandards.map(s => s.p3);

  // 孩童實際紀錄映射至 X 軸月齡
  const childPoints = filteredStandards.map(s => {
    const match = child.records.find(r => Math.abs(r.ageMonths - s.month) <= 1);
    return match ? match[metric] : null;
  });

  const isHeight = metric === "height";
  const unit = isHeight ? "cm" : "kg";
  const title = isHeight ? `${child.name} 身高成長曲線 (cm)` : `${child.name} 體重成長曲線 (kg)`;

  const ctx = canvas.getContext("2d");
  currentCharts[childId] = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: `${child.name} 實際數據 (${unit})`,
          data: childPoints,
          borderColor: child.accentColor,
          backgroundColor: child.accentColor,
          borderWidth: 3.5,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 3,
          tension: 0.25,
          spanGaps: true,
          order: 1
        },
        {
          label: "衛福部 P50 (標準中位數)",
          data: p50Data,
          borderColor: "#94a3b8",
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
          fill: false,
          tension: 0.2,
          order: 2
        },
        {
          label: "P97 (頂標 97%)",
          data: p97Data,
          borderColor: "rgba(245, 158, 11, 0.4)",
          borderWidth: 1,
          borderDash: [3, 3],
          pointRadius: 0,
          fill: "+1",
          backgroundColor: "rgba(245, 158, 11, 0.08)",
          tension: 0.2,
          order: 3
        },
        {
          label: "P85 (優良 85%)",
          data: p85Data,
          borderColor: "rgba(59, 130, 246, 0.3)",
          borderWidth: 1,
          pointRadius: 0,
          fill: false,
          tension: 0.2,
          order: 4
        },
        {
          label: "P15 (偏小 15%)",
          data: p15Data,
          borderColor: "rgba(59, 130, 246, 0.3)",
          borderWidth: 1,
          pointRadius: 0,
          fill: false,
          tension: 0.2,
          order: 5
        },
        {
          label: "P3 (底標 3%)",
          data: p3Data,
          borderColor: "rgba(239, 68, 68, 0.4)",
          borderWidth: 1,
          borderDash: [3, 3],
          pointRadius: 0,
          fill: false,
          tension: 0.2,
          order: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        title: {
          display: true,
          text: title,
          font: { size: 15, family: "Noto Sans TC", weight: "700" },
          padding: { bottom: 12 }
        },
        tooltip: {
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          padding: 10,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              if (context.raw === null || context.raw === undefined) return null;
              return ` ${context.dataset.label}: ${context.raw} ${unit}`;
            }
          }
        },
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 14,
            usePointStyle: true,
            font: { size: 11, family: "Noto Sans TC" }
          }
        }
      },
      scales: {
        x: {
          grid: { color: "#f1f5f9" },
          title: { display: true, text: "年齡月齡 (M)" }
        },
        y: {
          grid: { color: "#f1f5f9" },
          title: { display: true, text: `${isHeight ? '身高' : '體重'} (${unit})` }
        }
      }
    }
  });
}

/**
 * 繪製同年齡對比曲線 (Chart.js)
 */
function renderCompareChart(metric = "height") {
  const canvas = document.getElementById("chart-compare");
  if (!canvas) return;

  if (currentCharts.compare) {
    currentCharts.compare.destroy();
  }

  const anan = growthData.children.anan;
  const lele = growthData.children.lele;
  const standards = growthData.whoStandards[metric];
  const maxMonth = 42; // 以樂樂目前的年齡為基準對齊
  const filteredStandards = standards.filter(s => s.month <= maxMonth);

  const labels = filteredStandards.map(s => `${s.month}M (${(s.month/12).toFixed(1)}歲)`);
  const isHeight = metric === "height";
  const unit = isHeight ? "cm" : "kg";

  // 安安同月齡數值
  const ananPoints = filteredStandards.map(s => {
    const match = anan.records.find(r => Math.abs(r.ageMonths - s.month) <= 1);
    return match ? match[metric] : null;
  });

  // 樂樂同月齡數值
  const lelePoints = filteredStandards.map(s => {
    const match = lele.records.find(r => Math.abs(r.ageMonths - s.month) <= 1);
    return match ? match[metric] : null;
  });

  const p50Data = filteredStandards.map(s => s.p50);

  const ctx = canvas.getContext("2d");
  currentCharts.compare = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: `👦 安安 同齡${isHeight ? '身高' : '體重'}`,
          data: ananPoints,
          borderColor: anan.accentColor,
          backgroundColor: anan.accentColor,
          borderWidth: 3,
          pointRadius: 6,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 3,
          tension: 0.25,
          spanGaps: true
        },
        {
          label: `👶 樂樂 同齡${isHeight ? '身高' : '體重'}`,
          data: lelePoints,
          borderColor: lele.accentColor,
          backgroundColor: lele.accentColor,
          borderWidth: 3,
          pointRadius: 6,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 3,
          tension: 0.25,
          spanGaps: true
        },
        {
          label: "衛福部 P50 中位數",
          data: p50Data,
          borderColor: "#94a3b8",
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
          tension: 0.2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        title: {
          display: true,
          text: `安安 vs 樂樂 在「相同歲數」時的 ${isHeight ? '身高' : '體重'} 成長軌跡對比`,
          font: { size: 15, family: "Noto Sans TC", weight: "700" }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              if (context.raw === null || context.raw === undefined) return null;
              return ` ${context.dataset.label}: ${context.raw} ${unit}`;
            }
          }
        },
        legend: {
          position: "bottom",
          labels: { usePointStyle: true }
        }
      },
      scales: {
        x: {
          grid: { color: "#f1f5f9" },
          title: { display: true, text: "成長年齡（拉齊相同歲數與月齡）" }
        },
        y: {
          grid: { color: "#f1f5f9" },
          title: { display: true, text: `${isHeight ? '身高' : '體重'} (${unit})` }
        }
      }
    }
  });
}

/**
 * 單一圖表切換 身高 / 體重
 */
function updateSingleChart(childId, metric) {
  currentMetric[childId] = metric;
  const card = document.getElementById(`tab-${childId}`);
  if (card) {
    const btns = card.querySelectorAll(".btn-toggle");
    btns.forEach(b => b.classList.remove("active"));
    if (metric === "height") btns[0].classList.add("active");
    if (metric === "weight") btns[1].classList.add("active");
  }
  renderSingleChart(childId, metric);
}

/**
 * 對比圖表切換 身高 / 體重
 */
function updateCompareChart(metric) {
  currentMetric.compare = metric;
  const section = document.getElementById("tab-compare");
  if (section) {
    const btns = section.querySelectorAll(".btn-toggle");
    btns.forEach(b => b.classList.remove("active"));
    if (metric === "height") btns[0].classList.add("active");
    if (metric === "weight") btns[1].classList.add("active");
  }
  renderCompareChart(metric);
}

/**
 * 渲染鞋碼對照表
 */
function renderShoeGuide() {
  const tbody = document.querySelector("#table-shoes-guide tbody");
  if (!tbody) return;

  tbody.innerHTML = growthData.shoeSizeGuide.map(g => `
    <tr>
      <td><strong>${g.footCm} cm</strong></td>
      <td><span class="badge badge-green">${g.jp} cm</span></td>
      <td>${g.us}</td>
      <td>${g.eur}</td>
      <td><span class="badge badge-blue">${g.stage}</span></td>
      <td style="color: #475569;">${g.note}</td>
    </tr>
  `).join("");
}

/**
 * 渲染童鞋品牌版型建議
 */
function renderBrandTips() {
  const tbody = document.querySelector("#table-brand-tips tbody");
  if (!tbody) return;

  tbody.innerHTML = growthData.brandTips.map(b => `
    <tr>
      <td style="width: 250px;"><strong>${b.brand}</strong></td>
      <td style="color: #475569;">${b.fit}</td>
    </tr>
  `).join("");
}

/**
 * 互動試算鞋碼工具
 */
function calculateShoeSize() {
  const input = document.getElementById("calc-foot-input");
  const resultBox = document.getElementById("calc-result");
  if (!input || !resultBox) return;

  const val = parseFloat(input.value);
  if (!val || val < 8 || val > 25) {
    alert("請輸入有效的腳長數值 (8.0 ~ 25.0 cm)！");
    return;
  }

  // 運動鞋建議預留 0.8 ~ 1.0cm
  const recMin = (val + 0.8).toFixed(1);
  const recMax = (val + 1.0).toFixed(1);

  // 匹配對照表
  let match = growthData.shoeSizeGuide.find(g => {
    const parts = g.footCm.split("~").map(p => parseFloat(p.trim()));
    return val >= parts[0] && val <= parts[1];
  });

  if (!match) {
    match = { jp: `${Math.ceil(val + 0.5)}`, us: "查表對照", eur: "查表對照", stage: "幼兒成長期", note: "建議預留0.8-1cm" };
  }

  resultBox.style.display = "block";
  resultBox.innerHTML = `
    <h4 style="color: #1e293b; margin-bottom: 6px;">🎉 試算結果：實際腳長 ${val} cm</h4>
    <p style="font-size: 0.95rem; color: #334155; line-height: 1.6;">
      • <strong>推薦鞋內空間</strong>：約 <strong>${recMin} ~ ${recMax} cm</strong><br>
      • <strong>日本碼 (JP)</strong>：建議選購 <strong>${match.jp} cm</strong><br>
      • <strong>美碼 (US) / 歐碼 (EUR)</strong>：對應約 <strong>${match.us} / EUR ${match.eur}</strong><br>
      • <strong>成長階段</strong>：${match.stage} ｜ ${match.note}
    </p>
  `;
}

/**
 * 導覽標籤切換
 */
function initNavTabs() {
  const buttons = document.querySelectorAll(".nav-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      switchTab(tabId);
    });
  });
}

function switchTab(tabId) {
  document.querySelectorAll(".nav-btn").forEach(b => {
    b.classList.toggle("active", b.getAttribute("data-tab") === tabId);
  });
  document.querySelectorAll(".tab-pane").forEach(p => {
    p.classList.toggle("active", p.id === tabId);
  });

  // 觸發 Chart.js 重新調整寬度以避免尺寸錯位
  setTimeout(() => {
    Object.values(currentCharts).forEach(c => {
      if (c) c.resize();
    });
  }, 100);

  window.scrollTo({ top: 320, behavior: "smooth" });
}

/**
 * 表單：新增生理量測紀錄
 */
function handleAddRecord(e) {
  e.preventDefault();

  const childId = document.getElementById("input-child").value;
  const date = document.getElementById("input-date").value;
  const height = parseFloat(document.getElementById("input-height").value);
  const weight = parseFloat(document.getElementById("input-weight").value);
  const foot = document.getElementById("input-foot").value ? parseFloat(document.getElementById("input-foot").value) : null;
  const shoe = document.getElementById("input-shoe").value || "";
  const head = document.getElementById("input-head").value ? parseFloat(document.getElementById("input-head").value) : null;
  const note = document.getElementById("input-note").value || "";

  const child = growthData.children[childId];
  const age = calculateAge(child.birthDate, date);

  const newRecord = {
    date: date,
    ageMonths: age.totalMonths,
    height: height,
    weight: weight,
    footLength: foot,
    shoeSize: shoe,
    head: head,
    note: note
  };

  // 加入並依日期排序
  child.records.push(newRecord);
  child.records.sort((a, b) => new Date(a.date) - new Date(b.date));

  // 存檔與重繪
  saveData();
  renderAllViews();

  alert(`✅ 已成功儲存 ${child.name} 於 ${date} 的量測數據！圖表與表格已即時更新。`);
  e.target.reset();
  document.getElementById("input-date").value = new Date().toISOString().split('T')[0];
  switchTab(`tab-${childId}`);
}

/**
 * 表單：新增里程碑 / 金句
 */
function handleAddMilestone(e) {
  e.preventDefault();

  const childId = document.getElementById("input-ms-child").value;
  const date = document.getElementById("input-ms-date").value;
  const icon = document.getElementById("input-ms-icon").value;
  const title = document.getElementById("input-ms-title").value;
  const desc = document.getElementById("input-ms-desc").value;

  const child = growthData.children[childId];
  child.milestones.unshift({
    date: date,
    title: title,
    desc: desc,
    icon: icon
  });

  saveData();
  renderTimelines();

  alert(`⭐ 已成功新增 ${child.name} 的成長里程碑！`);
  e.target.reset();
  switchTab(`tab-${childId}`);
}

/**
 * 方案 C：匯出 data.js 檔案
 */
function exportDataJs() {
  const content = `/**
 * 安安與樂樂 成長趨勢紀錄資料庫 (Growth Tracker Data)
 * 匯出時間：${new Date().toLocaleString()}
 */

const INITIAL_GROWTH_DATA = ${JSON.stringify(growthData, null, 2)};

if (typeof module !== "undefined" && module.exports) {
  module.exports = INITIAL_GROWTH_DATA;
}
`;
  downloadFile("data.js", content, "text/javascript");
}

/**
 * 方案 C：匯出 JSON 備份檔
 */
function exportJSON() {
  const content = JSON.stringify(growthData, null, 2);
  downloadFile(`growth_data_backup_${new Date().toISOString().split('T')[0]}.json`, content, "application/json");
}

/**
 * 複製資料代碼至剪貼簿
 */
function copyDataToClipboard() {
  const content = JSON.stringify(growthData, null, 2);
  navigator.clipboard.writeText(content).then(() => {
    alert("📋 已將最新資料庫 JSON 複製到剪貼簿！");
  }).catch(() => {
    alert("複製失敗，請使用檔案下載功能。");
  });
}

/**
 * 還原初始資料
 */
function resetToInitial() {
  if (confirm("⚠️ 確定要清除自訂紀錄並還原至系統初始預設範例嗎？")) {
    localStorage.removeItem(STORAGE_KEY);
    loadData();
    renderAllViews();
    alert("🔄 已還原至初始資料！");
  }
}

/**
 * 輔助函式：觸發檔案下載
 */
function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
