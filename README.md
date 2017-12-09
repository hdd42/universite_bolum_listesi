# universite fakulte / bolum listesi 
### headless chrome ve puppeteer ile https://yokatlas.yok.gov.tr den universite / okul bilgilerini alir.
#### kucuk bir node.js uygulamasi olarak rest api olarak sunar.

# kullanim 
`npm install`
`npm start`

### script daha once calismis oldugu icin, ana dizinde bir sql dosyasinda 2017 icin okul/bolum ler mevcuttur

## http://localhost:3000/ adresine giderek, okullari ve bolumleri gorebilir veya sql/json olarak export edebilirsiniz

# Otomasyon scriptini tekrar calistirmak icin,
### (2017 itibariyle, okull/bolumler `yokOkulListe.db` de kayitlidir, otomasyonu calistirmadan da kullanabilirsiniz.)

### oncelikle, ana dizindeki `yokOkulListe.db` yi silin
### daha sonra sirasiyla `node spider.js` ile lisans scriptini
### lisans scripti tamamlaninca da, `node spider2.js` ile onlisans scriptini calistirin.

### yaklasik olarak 7-10dk lik bir sure de scriptler bilgileri alip html => json donusumunden sonra, yokOkulListe.db kayit edecektir. 

