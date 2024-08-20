const footList = [
  "https://health.chosun.com/site/data/img_dir/2022/03/10/2022031001028_0.jpg",
  "https://cdn.pixabay.com/photo/2019/06/02/11/58/foot-4246317_1280.jpg",
  "https://artdeco.com/cdn/shop/collections/Kategoriebanner-Pflege_Fusspflege_1000x667_unlimited.jpg?v=1686054354",
  "https://cdn.mos.cms.futurecdn.net/EVPdcN8UPtSLsi2eoN53g6.jpg",
  "https://src.hidoc.co.kr/image/lib/2015/7/14/20150714162315748_0.jpg",
];

function updateImage(node) {
  const newSrc = footList[Math.floor(Math.random() * footList.length)];
  node.src = newSrc;
}
setInterval(() => {
  document.querySelectorAll("*").forEach((node) => {
    if (node.tagName === "IMG") {
      if (!node.classList.contains("footdh")) {
        updateImage(node);
      } else if (!footList.includes(node.src)) {
        updateImage(node);
      }
    }
    node.addEventListener("click", () => {
      if (!node.querySelector("img")) {
        const img = document.createElement("img");
        img.classList.add("footdh");
        updateImage(img);
        node.innerHTML = "";
        node.appendChild(img);
      }
    });
  });
}, 500);
