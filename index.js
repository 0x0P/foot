const footList = [
  "https://health.chosun.com/site/data/img_dir/2022/03/10/2022031001028_0.jpg",
  "https://cdn.pixabay.com/photo/2019/06/02/11/58/foot-4246317_1280.jpg",
  "https://artdeco.com/cdn/shop/collections/Kategoriebanner-Pflege_Fusspflege_1000x667_unlimited.jpg?v=1686054354",
  "https://cdn.mos.cms.futurecdn.net/EVPdcN8UPtSLsi2eoN53g6.jpg",
  "https://src.hidoc.co.kr/image/lib/2015/7/14/20150714162315748_0.jpg",
  "https://cdn.kormedi.com/wp-content/uploads/2024/01/unnamed-file-288.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb8OneXd-M-Hk16BvHiKGQPxyKxp_ctivCYA&s",
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
  const chars = ["발", "도", "현", "🦶", "👣", "🐾"];
  return chars[Math.floor(Math.random() * chars.length)];
}

function replaceTextWithRandomChars(node) {
  const ignoreTags = ["STYLE", "SCRIPT"];

  if (ignoreTags.includes(node.nodeName)) {
    return;
  }

  if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
    const originalTextLength = [...node.textContent].length; // 유니코드 문제 해결을 위해 스프레드 연산자를 사용해 길이를 계산
    let newText = "";
    for (let i = 0; i < originalTextLength; i++) {
      newText += getRandomChar();
    }
    node.textContent = newText;
  } else if (
    node.nodeName === "INPUT" ||
    node.nodeName === "TEXTAREA" ||
    node.nodeName === "BUTTON" ||
    node.nodeName === "SELECT"
  ) {
    const originalValueLength = [...node.value].length; // 유니코드 문제 해결을 위해 스프레드 연산자를 사용해 길이를 계산
    let newValue = "";
    for (let i = 0; i < originalValueLength; i++) {
      newValue += getRandomChar();
    }
    node.value = newValue;
  } else {
    node.childNodes.forEach(replaceTextWithRandomChars);
  }
}

setInterval(() => {
  document.head.title = "발도현";
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
