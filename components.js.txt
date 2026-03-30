function Header() {
  return `
    <div class="header">
      <img src="https://img.bellavka.by/b/8/82/822/8223/82231.png">
      <b>Firmova Ads</b>
    </div>
  `;
}

function Card(content) {
  return `<div class="card">${content}</div>`;
}

/**************Content***************/

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