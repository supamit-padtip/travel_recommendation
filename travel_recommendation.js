import data from "./travel_recommendation_api.json" with { type: "json" };

let displayData = [];

function search() {
  const text = document.getElementById("search").value;

  const keys = Object.keys(data).filter((value) =>
    value.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
  );

  if (!keys.length) return;

  if (keys[0] !== "countries") {
    displayData = data[keys[0]];
  } else {
    displayData = data[keys[0]]
      .map((value) => value.cities)
      .reduce((a, b) => a.concat(b), []);
  }

  updateRecommendation();
}

function clear() {
  displayData = [];
  removeNodes();
}

function removeNodes() {
  const recommendation = document.getElementById("recommendation");
  const nodes = [...recommendation.childNodes];

  nodes.forEach((value) => recommendation.removeChild(value));
}

function updateRecommendation() {
  const recommendation = document.getElementById("recommendation");

  removeNodes();

  displayData.forEach((data) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const button = document.createElement("button");

    img.setAttribute("src", data.imageUrl);
    h3.textContent = data.name;
    p.textContent = data.description;
    button.textContent = "Visit";

    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(button);

    recommendation.appendChild(div);
  });
}

document.getElementById("btn_search").addEventListener("click", search);
document.getElementById("btn_clear").addEventListener("click", clear);
