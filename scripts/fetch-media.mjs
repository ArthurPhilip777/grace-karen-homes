import fs from "fs";
import path from "path";

const root = path.resolve("public/images/homes");
fs.mkdirSync(root, { recursive: true });
fs.mkdirSync(path.resolve("public/images"), { recursive: true });

const heroSrc =
  "C:\\Users\\LENOVO\\.cursor\\projects\\c-Users-LENOVO-Desktop-GRACE-HOMES\\assets\\__Real_Estate_Photo_Editing_Service-6283f918-f6ec-4915-8910-cda42ac13e06.jpg";
fs.copyFileSync(heroSrc, path.resolve("public/images/hero.jpg"));
console.log("hero", fs.statSync(path.resolve("public/images/hero.jpg")).size);

const photos = [
  ["east-1.jpg", "photo-1600596542815-ffad4c1539a9"],
  ["east-2.jpg", "photo-1600210492486-724fe5c67fb0"],
  ["east-3.jpg", "photo-1600566753190-17f0baa2a6c3"],
  ["canton-1.jpg", "photo-1600585154340-be6161a56a0c"],
  ["canton-2.jpg", "photo-1600607687939-ce8a6c25118c"],
  ["canton-3.jpg", "photo-1600566753086-00f18fb6b3ea"],
  ["airport-1.jpg", "photo-1512917774080-9991f1c4c750"],
  ["airport-2.jpg", "photo-1600573472592-401b489a3cdc"],
  ["trasacco-1.jpg", "photo-1613490493576-7fde63acd811"],
  ["trasacco-2.jpg", "photo-1618221195710-dd6b41faaea6"],
  ["trasacco-3.jpg", "photo-1600585154526-990dced4db0d"],
  ["labone-1.jpg", "photo-1600047509807-ba8f99d2cdbc"],
  ["labone-2.jpg", "photo-1560448204-e02f11c3d0e2"],
  ["ridge-1.jpg", "photo-1568605114967-8130f3a36994"],
  ["ridge-2.jpg", "photo-1600121848594-d8644e57abab"],
  ["kumasi-1.jpg", "photo-1580587771525-78b9dba3b914"],
  ["kumasi-2.jpg", "photo-1600210492493-0946911123ea"],
  ["takoradi-1.jpg", "photo-1499793983690-e29da59ef1c2"],
  ["takoradi-2.jpg", "photo-1502672260266-1c1ef2d93688"],
  ["cape-1.jpg", "photo-1570129477492-45c003edd2be"],
  ["tema-1.jpg", "photo-1572120360610-d971b9d7767c"],
  ["aburi-1.jpg", "photo-1518780664697-55e3ad937233"],
  ["aburi-2.jpg", "photo-1449844908441-8829872d2607"],
  ["tamale-1.jpg", "photo-1564013799919-ab600027ffc6"],
  ["spintex-1.jpg", "photo-1600585153490-76fb20a32601"],
  ["fig-1.jpg", "photo-1545324418-cc1a3fa10c00"],
  ["fig-2.jpg", "photo-1493809842364-78817add7ffb"],
  ["osu-1.jpg", "photo-1522708323590-d24dbb6b0267"],
  ["osu-2.jpg", "photo-1502672023488-70e25813eb80"],
  ["about.jpg", "photo-1600607687920-4e2a09cf159d"],
];

async function download([name, id]) {
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=75`;
  const res = await fetch(url, {
    redirect: "follow",
    headers: {
      Accept: "image/avif,image/webp,image/jpeg,image/*;q=0.8,*/*;q=0.5",
      "User-Agent": "GraceKarenHomesAssetFetch/1.0",
    },
  });
  if (!res.ok) {
    console.error("FAIL", name, res.status);
    return false;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) {
    console.error("SMALL", name, buf.length);
    return false;
  }
  fs.writeFileSync(path.join(root, name), buf);
  console.log("OK", name, buf.length);
  return true;
}

const queue = [...photos];
async function worker() {
  while (queue.length) {
    const item = queue.shift();
    if (!item) return;
    try {
      await download(item);
    } catch (error) {
      console.error("ERR", item[0], error.message);
    }
  }
}

await Promise.all([worker(), worker(), worker(), worker()]);

const ghanaUrls = [
  "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/ghana.geojson",
  "https://cdn.jsdelivr.net/gh/codeforgermany/click_that_hood@main/public/data/ghana.geojson",
  "https://raw.githubusercontent.com/johan/world.geo.json/master/countries/GHA.geo.json",
];

let ghana = null;
for (const url of ghanaUrls) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "GraceKarenHomesAssetFetch/1.0" } });
    if (!res.ok) {
      console.error("GEO", res.status, url);
      continue;
    }
    const json = await res.json();
    if (json && (json.type === "FeatureCollection" || json.type === "Feature")) {
      ghana = json;
      console.log("GEO OK", url, JSON.stringify(json).length);
      break;
    }
  } catch (error) {
    console.error("GEO ERR", url, error.message);
  }
}

if (!ghana) {
  ghana = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Ghana" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-2.98, 5.13],
              [-2.55, 4.88],
              [-2.09, 4.74],
              [-1.62, 4.95],
              [-1.05, 5.2],
              [-0.45, 5.42],
              [0.05, 5.6],
              [0.62, 5.82],
              [1.18, 6.12],
              [1.19, 6.9],
              [0.72, 7.6],
              [0.42, 8.4],
              [0.15, 9.4],
              [-0.05, 11.02],
              [-1.15, 11.05],
              [-2.15, 11.0],
              [-2.9, 10.7],
              [-2.95, 9.6],
              [-2.72, 8.3],
              [-3.18, 7.1],
              [-3.22, 6.15],
              [-2.98, 5.13],
            ],
          ],
        },
      },
    ],
  };
  console.log("GEO fallback outline");
}

fs.writeFileSync(path.resolve("public/ghana.json"), JSON.stringify(ghana));
console.log("done");
