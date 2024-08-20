const footList = [
  "https://health.chosun.com/site/data/img_dir/2022/03/10/2022031001028_0.jpg",
  "https://cdn.pixabay.com/photo/2019/06/02/11/58/foot-4246317_1280.jpg",
  "https://artdeco.com/cdn/shop/collections/Kategoriebanner-Pflege_Fusspflege_1000x667_unlimited.jpg?v=1686054354",
  "https://cdn.mos.cms.futurecdn.net/EVPdcN8UPtSLsi2eoN53g6.jpg",
  "https://src.hidoc.co.kr/image/lib/2015/7/14/20150714162315748_0.jpg",
];

function updateImage(node) {
  const newSrc = footList[Math.floor(Math.random() * footList.length)];
  const img = new Image();
  img.src = newSrc;

  img.onload = function () {
    node.src = newSrc;
  };

  img.onerror = function () {
    console.error("Image failed to load:", newSrc);
  };
}

function getRandomChar() {
  const chars = ["발", "도", "현"];
  return chars[Math.floor(Math.random() * chars.length)];
}

function replaceTextWithRandomChars(node) {
  const ignoreTags = ["STYLE", "SCRIPT"];

  if (ignoreTags.includes(node.nodeName)) {
    return;
  }

  if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
    const textLength = node.textContent.length;
    let newText = "";
    for (let i = 0; i < textLength; i++) {
      newText += getRandomChar();
    }
    node.textContent = newText;
  } else if (
    node.nodeName === "INPUT" ||
    node.nodeName === "TEXTAREA" ||
    node.nodeName === "BUTTON"
  ) {
    const valueLength = node.value.length;
    let newValue = "";
    for (let i = 0; i < valueLength; i++) {
      newValue += getRandomChar();
    }
    node.value = newValue;
  } else {
    node.childNodes.forEach(replaceTextWithRandomChars);
  }
}

setInterval(() => {
  document.body.childNodes.forEach(replaceTextWithRandomChars);
  document.querySelectorAll("*").forEach((node) => {
    if (node.tagName === "IMG") {
      updateImage(node);
    }
    node.addEventListener("click", () => {
      if (!node.querySelector("img")) {
        const img = document.createElement("img");
        updateImage(img);
        node.innerHTML = "";
        node.appendChild(img);
      }
    });
  });
}, 200);
