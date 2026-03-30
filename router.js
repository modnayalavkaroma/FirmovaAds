const routes = {
  home: renderHome,
  banners: renderBanners,
  banner: renderBanner,
  directList: renderDirectList,
  direct: renderDirect
};

function navigate(route, params = {}) {
  window.currentRoute = { route, params };
  routes[route](params);
}

/* ===== PAGES ===== */

function renderHome() {
  document.getElementById("app").innerHTML = `
    ${Header()}

    <div class="container">
      <div class="card" onclick="navigate('banners')">
        Брендовая акция
      </div>

      <div class="card" onclick="navigate('directList')">
        Реклама в Я.Директ
      </div>
    </div>
  `;
}

function renderBanners() {
  const items = DATA.banners.map(b => `
    <div class="card" onclick="navigate('banner', {id: ${b.id}})">
      <img src="${b.banner}" style="width:100%; border-radius:8px;">
      <b>${b.brand}</b><br>
      ${b.start} – ${b.end}<br>
      Заказы: ${b.orders}
    </div>
  `).join("");

  document.getElementById("app").innerHTML = `
    ${Header()}
    <div class="container">
      ${items}
      <div class="button disabled">Заявка на акцию</div>
    </div>
  `;
}


function renderBanner({id}) {
  const b = DATA.banners.find(x => x.id === id);

  document.getElementById("app").innerHTML = `
    ${Header()}

    <div class="container">

      ${Card(`
        <b>${b.brand}</b><br>
        <img src="${b.banner}" style="width:100%; border-radius:8px;">
        <br>${b.start} – ${b.end}
      `)}

      ${Card(`
        <b>Статистика</b>

        <div class="metric">
          Просмотры каталога
          <span class="green">26 987 (+45%)</span>
        </div>

        <div class="metric">
          Просмотры товаров
          <span class="green">15 764 (+30%)</span>
        </div>

        <div class="metric">
          Корзины
          <span class="green">286 (+47%)</span>
        </div>

        <div class="metric">
          Заказы
          <span class="green">27 (+49%)</span>
        </div>
      `)}

    </div>
  `;
}

function renderDirectList() {
  const items = DATA.direct.map(d => `
    <div class="card" onclick="navigate('direct', {id:${d.id}})">
      <b>${d.brand}</b><br>
      ${d.start} – ${d.end}<br>
      Расход: ${d.spend} BYN<br>
      Заказы: ${d.orders}
    </div>
  `).join("");

  document.getElementById("app").innerHTML = `
    ${Header()}
    <div class="container">
      ${items}
      <div class="button disabled">Заявка на рекламу</div>
    </div>
  `;
}

function renderDirect({id}) {
  const d = DATA.direct.find(x => x.id === id);

  document.getElementById("app").innerHTML = `
    ${Header()}

    <div class="container">

      ${Card(`
        <b>${d.brand}</b><br>
        ${d.start} – ${d.end}
      `)}

      ${Card(`
        Расход: <b>${d.spend} BYN</b><br>
        Охват: <b>3 400</b><br>
        Заказы: <b>${d.orders}</b>
      `)}

      ${Card(`
        <canvas id="chart"></canvas>
      `)}

    </div>
  `;

  drawChart();
}

function drawChart() {
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");

  const data = [10, 20, 40, 60, 50, 30];

  const width = canvas.width = 300;
  const height = canvas.height = 150;

  ctx.beginPath();

  data.forEach((v, i) => {
    const x = i * 50;
    const y = height - v;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.strokeStyle = "green";
  ctx.stroke();
}
