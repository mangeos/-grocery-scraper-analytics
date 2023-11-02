const puppeteer = require("puppeteer");
const { Product } = require("./../models"); // Importera din Sequelize-modell

function getLatestJmfPrice(allproducts) {
  for (const value in allproducts) {
    //console.log(value.jmfPrice);
    //count++;
    let newObject = allproducts[value];
    for (const iterator of newObject) {
      if (iterator.includes("Jmf")) {
        // console.log(iterator);
        return jmf1(iterator);
      }
    }
  }
}
function jmf1(e) {
  // Använd regex för att matcha siffrorna i "Jmf-pris XX,XX"
  const match = e.match(/Jmf-pris (\d+,\d+)/);

  if (match) {
    const jmfPrice = match[1];
    //console.log("Jmf-pris:", jmfPrice);
    return Number(jmfPrice.replace(",", "."));
  } else {
    return null;
  }
}

function suger(arg) {
  for (let index = 0; index < arg.length; index++) {
    const element = arg[index];
    if (element === "varav sockerarter") {
      if (
        arg[index + 1].includes("<") ||
        arg[index + 1].includes(">") ||
        arg[index + 1].includes("ca")
      ) {
        //   console.log(arg[index + 1].split(" ")[1]);
        return arg[index + 1].split(" ")[1];
      }
      return arg[index + 1].split(" ")[0];
    }
  }
  return null;
}
function protein(arg) {
  for (let index = 0; index < arg.length; index++) {
    const element = arg[index];
    if (element === "protein") {
      if (
        arg[index + 1].includes("<") ||
        arg[index + 1].includes(">") ||
        arg[index + 1].includes("ca")
      ) {
        //   console.log(arg[index + 1].split(" ")[1]);
        return arg[index + 1].split(" ")[1];
      }
      return arg[index + 1].split(" ")[0];
    }
  }
  return null;
}

function carbs(arg) {
  for (let index = 0; index < arg.length; index++) {
    const element = arg[index];
    if (element === "kolhydrat") {
      if (
        arg[index + 1].includes("<") ||
        arg[index + 1].includes(">") ||
        arg[index + 1].includes("ca")
      ) {
        // console.log(arg[index + 1].split(" ")[1]);
        return arg[index + 1].split(" ")[1];
      }
      return arg[index + 1].split(" ")[0];
    }
  }
  return null;
}

function salt(arg) {
  for (let index = 0; index < arg.length; index++) {
    const element = arg[index];
    if (element === "salt") {
      if (
        arg[index + 1].includes("<") ||
        arg[index + 1].includes(">") ||
        arg[index + 1].includes("ca")
      ) {
        // console.log(arg[index + 1].split(" ")[1]);
        return arg[index + 1].split(" ")[1];
      }
      return arg[index + 1].split(" ")[0];
    }
  }
  return null;
}
function saturatedFat(arg) {
  for (let index = 0; index < arg.length; index++) {
    const element = arg[index];
    if (element === "varav mättat fett") {
      if (
        arg[index + 1].includes("<") ||
        arg[index + 1].includes(">") ||
        arg[index + 1].includes("ca")
      ) {
        // console.log(arg[index + 1].split(" ")[1]);
        return arg[index + 1].split(" ")[1];
      }
      return arg[index + 1].split(" ")[0];
    }
  }
  return null;
}

function fat(arg) {
  for (let index = 0; index < arg.length; index++) {
    const element = arg[index];
    if (element === "fett") {
      if (
        arg[index + 1].includes("<") ||
        arg[index + 1].includes(">") ||
        arg[index + 1].includes("ca")
      ) {
        // console.log(arg[index + 1].split(" ")[1]);
        return arg[index + 1].split(" ")[1];
      }
      return arg[index + 1].split(" ")[0];
    }
  }
  return null;
}

function energi1(arg) {
  for (let index = 0; index < arg.length; index++) {
    const element = arg[index];
    if (element.includes("kilojoule")) {
      if (
        arg[index].includes("<") ||
        arg[index].includes(">") ||
        arg[index].includes("ca")
      ) {
        // console.log(arg[index + 1].split(" ")[1]);
        return arg[index].split(" ")[1];
      }
      return arg[index].split(" ")[0];
    }
  }
  return null;
}

function energi2(arg) {
  for (let index = 0; index < arg.length; index++) {
    const element = arg[index];
    if (element.includes("kilokalori")) {
      if (
        arg[index].includes("<") ||
        arg[index].includes(">") ||
        arg[index].includes("ca")
      ) {
        // console.log(arg[index + 1].split(" ")[1]);
        return arg[index].split(" ")[1];
      }
      return arg[index].split(" ")[0];
    }
  }
  return null;
}

async function scrapeAll(url) {
  try {
    // Din befintliga kod här
    // Starta en ny webbläsarinstans
    const browser = await puppeteer.launch();

    // Öppna en ny sida i webbläsaren
    const page = await browser.newPage();

    // Gå till den önskade webbsidan
    // Kött och kark
    //await page.goto("https://www.willys.se/sortiment/kott-chark-och-fagel");
    // mejeri https://www.willys.se/sortiment/mejeri-ost-och-agg

    await page.goto(url);

    // fisk https://www.willys.se/sortiment/fisk-och-skaldjur
    // await page.goto("https://www.willys.se/sortiment/fisk-och-skaldjur");

    // skafferi https://www.willys.se/sortiment/skafferi
    //await page.goto("https://www.willys.se/sortiment/skafferi");
    for (let i = 0; i < 20; i++) {
      await page.evaluate(() => {
        const element = document.body;
        element.scrollIntoView({
          behavior: "auto",
          block: "end",
          inline: "nearest",
        });
      });
      //await page.waitForTimeout(1000);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    /* -------------------------------------------------------------------------------------*/
    /*----------------------Hämtar alla <a> taggar med href /produkt/*---------------------*/
    let hrefResult = await page.evaluate(() => {
      let elements = document.querySelectorAll('a[href^="/produkt/"]');
      let hrefs = Array.from(elements).map((element) => element.href);
      return hrefs;
    });
    // Skriv ut hrefResultaten
    console.log(hrefResult);
    let hrefUrl = hrefResult;
    // Gå till den önskade webbsidan

    //await page.waitForTimeout(3000);
    const buttonText = "Visa mer";
    // arrayen här ska nog vara i for loopen istället
    const tableData = [];
    const allproductsTable = [];
    for (const href of hrefUrl) {
      let success = false;
      while (!success) {
        try {
          const response = await page.goto(href, {
            waitUntil: "domcontentloaded",
          });

          if (response.status() === 403) {
            console.error(`403 Forbidden: Unable to access ${href}`);
            console.log(`Retrying ${href} in 10 seconds...`);
            await new Promise((resolve) => setTimeout(resolve, 30000)); // Vänta i 10 sekunder
          } else {
            success = true; // Om det lyckas ladda sidan, sätt success till true för att avsluta loopen
            await page.waitForSelector(
              'button[data-testid="expandable-container-button"]',
              { visible: true, timeout: 4000 }
            ); // Vänta i upp till 5 sekunder om knappen är synlig

            // console.log(jmf);
            allproductsTable.push(
              await page.evaluate(
                async (text, href, tableData, jmf) => {
                  let btn = document.querySelector(
                    'button[data-testid="expandable-container-button"]'
                  );
                  const jmfElements =
                    document.querySelectorAll('p[type="detail"]');
                  const jmfData = [];
                  jmfElements.forEach((element) => {
                    jmfData.push(element.textContent);
                  });

                  if (btn.innerText.includes(text)) {
                    //await page.waitForSelector(btn, { visible: true });

                    await btn.click();
                    // Klicka på knappen
                    //await page.waitForTimeout(2000); // Vänta 2 sekunder (justera tiden efter behov)

                    // Vänta i upp till 5 sekunder
                    let elements = document.querySelectorAll("td");
                    // Extrahera den delen av href från index 8 till 15
                    let product = href.substring(30);

                    tableData.push({
                      href,
                      product: product,
                      jmfPrice: jmfData,
                      table: Array.from(elements).map(
                        (element) => element.innerText
                      ),
                    });
                  }

                  return tableData;
                },
                buttonText,
                href,
                tableData
              )
            );
          }
        } catch (e) {
          console.log(`error: ${e}`);
          allproductsTable.push(
            await page.evaluate(
              async (text, href, tableData) => {
                // Extrahera den delen av href från index 8 till 15
                let product = href.substring(30);
                const jmfElements =
                  document.querySelectorAll('p[type="detail"]');
                const jmfData = [];
                jmfElements.forEach((element) => {
                  jmfData.push(element.textContent);
                });
                tableData.push({
                  href,
                  product: product,
                  jmfPrice: jmfData,
                  table: [],
                });

                return tableData;
              },
              buttonText,
              href,
              tableData
            )
          );
        }
      }

      //await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    //let allproducts = allproductsTable[1][0];
    let allproducts = allproductsTable;
    let result = [];
    for (let index = 0; index < allproducts.length; index++) {
      const product = allproducts[index];
      for (let i = 0; i < product.length; i++) {
        const element = product[i];
        //console.log(element.href);

        const productToDb = {
          href: element.href,
          product: element.product,
          jmfPrice: getLatestJmfPrice(element),
          energi1: energi1(element.table) ? energi1(element.table) : null,
          energi2: energi2(element.table) ? energi2(element.table) : null,
          fat: fat(element.table) ? fat(element.table) : null,
          saturatedFat: saturatedFat(element.table)
            ? saturatedFat(element.table)
            : null,
          carb: carbs(element.table) ? carbs(element.table) : null,
          suger: suger(element.table) ? suger(element.table) : null,
          protein: protein(element.table) ? protein(element.table) : null,
          salt: salt(element.table) ? salt(element.table) : null,
        };
        //console.log(productToDb);
        result.push(productToDb);
      }
      // console.log(product);
    }
    // Product.sync({ force: true }) Tömmer hela databasen

    await Product.sync()
      .then(() => {
        // Här kan du skapa data (result) i den skapade tabellen
        return Product.bulkCreate(result);
      })
      .then((newProducts) => {
        console.log("Nya produkter skapade:", newProducts);
      })
      .catch((error) => {
        console.error("Fel vid skapande av produkter:", error);
      });

    /*
    Product.bulkCreate(result)
      .then((newProducts) => {
        console.log("Nya produkter skapade:", newProducts);
      })
      .catch((error) => {
        console.error("Fel vid skapande av produkter:", error);
      });
  */
    // let jmf = getLatestJmfPrice(allproducts);

    await browser.close();

    //const postData = {};

    // Skapa en ny produkt med Sequelize
    //const newProduct = await Product.create(postData);
  } catch (error) {
    console.error("Ett fel uppstod:", error);
  }
}

let urlArray = [
  "https://www.willys.se/sortiment/kott-chark-och-fagel",
  "https://www.willys.se/sortiment/mejeri-ost-och-agg",
  "https://www.willys.se/sortiment/fisk-och-skaldjur",
  "https://www.willys.se/sortiment/skafferi",
];
// Kör en i taget, annars spårar det ur totalt
async function runAll(urlArray) {
  for (const url of urlArray) {
    await new Promise((resolve) => setTimeout(resolve, 60000));
    await scrapeAll(url);
  }
}
runAll(urlArray);
