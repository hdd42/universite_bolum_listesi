const puppeteer = require("puppeteer");
const { Okul,Bolum } = require("./db");

const url = `https://yokatlas.yok.gov.tr/onlisans-anasayfa.php`;
const uniListSelector = `#flip1 > div > div.face.back > div > form > div > div > div`;

let page; //
let Browser;

parse();
async function parse() {
  try {
    const Browser = await puppeteer.launch({ headless: false });
    page = await Browser.newPage();
    await page.goto(url);
    await page.waitForSelector(uniListSelector);
    //let html = await page.content();

    await page.click(
      "#flip1 > div > div.face.front.flipControl > div > div > img"
    );
    let okullar = await page.evaluate(() => {
      let liste = document.getElementById("univ2");
      let okullar = [];

      for (var i = 0; i < liste.length; i++) {
        let okulKod = liste[i].value;
        let okulIsim = liste[i].text;
        let url = `https://yokatlas.yok.gov.tr/onlisans-univ.php?u=${okulKod}`;
        let okul = {
          kod: okulKod,
          isim: okulIsim,
          url
        };
        if (liste[i].value) okullar.push(okul);
      }

      return okullar;
    });

    /*
       await   Okul.query()
       .then(people => {
         console.log('there are', people.length, 'People in total');
       })
       .catch(err => {
         console.log('oh noes');
       }); */

    // let okulUrl = "https://yokatlas.yok.gov.tr/lisans-univ.php?u=1001";
    // console.log("HTML : ", html , "\n type : ", typeof html)
    //console.log("ds :" , devletOkullari)
    let tumBolumler = [];
    for (let okul of okullar) {
      await page.goto(okul.url);
      let bListe = await page.evaluate(() => {
        let bolumLinkeri = document.querySelectorAll(
          "#bs-collapse > div > div > h4 > a"
        );
        let bolumListesi = [];
        for (var i = 0; i < bolumLinkeri.length; i++) {
          let elm = bolumLinkeri[i];
          let url = elm.href;
          let kod = url.substring(url.indexOf("?y=") + 3);
          let bolumText = elm.childNodes[1].textContent;
          let fakulte = elm.childNodes[3].textContent;
          let puanTuru = elm.childNodes[5].textContent;
          let bolum = {
            isim: bolumText,
            fakulte,
            kod,
            url,
            tur: "onlisans",
            puanTuru,
            okulKod: kod.substring(0, 4)
          };
          bolumListesi.push(bolum);
        }
        return bolumListesi;
      });
      //console.log("bolumListesi : ", bListe);
      tumBolumler.push(...bListe);
    }

    console.log("Tum Bolumler L ", tumBolumler);
    await page.evaluate(() => document.body.innerHTML = "<h3 style='margin:100px'>Veri toplama tamamlandi. Json donusumu yapilirken bekleyin...</h3>");

    await page.evaluate(() => document.body.innerHTML = `<h3 style='margin:100px'>Okul Listesi Kayit Edildi.</h3>`);
    await page.evaluate(() => document.body.innerHTML = `<h3 style='margin:100px'>Bolumler Kayit Ediliyor...</h3>`);

    //console.log("Okullar : ", okullar);
    for (const bolum of tumBolumler) {
      await Bolum.query()
        .insert(bolum)
    }
    await page.evaluate(() => document.body.innerHTML = "<h3 style='margin:100px'>JSON Donusumu Tamamlandi. Tarayici Kapatiliyor.....</h3>");
    setTimeout(async () => { await Browser.close(); }, 2000)

  } catch (error) {
    console.log("Error : ", error);
    if (Browser) {
      await Browser.close();
    }
    process.exit(0);
  }
}
