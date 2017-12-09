# universite fakulte / bolum listesi 
### headless chrome ve puppeteer ile https://yokatlas.yok.gov.tr den univeriste / okul bilgilerini alir.
####kucuk bir node.js ile res api olarak sunar.

#kullanim 
`npm install`
`npm start`

### script daha once calismis oldugu icin, ana dizinde bir sql dosyasinda 2017 icin okul/bolum ler mevcuttur

## http://localhost:3000/ adresine giderek, okullari ve bolumleri gorebilir veya sql/json olarak export edebilirsiniz

#Otomasyon scriptini tekrar calistirmak icin,
###()

### oncelikle, ana dizindeki `yokOkulListe.db` yi silin
### daha sonra sirasiyla `node spider.js` ile lisan scriptini
### lisan scripti tamamlanincada, `node spider2.js` ile onlisans scriptini calistirin.

### yaklasik oalrak 7-10dk lik bir sure de scriptler bilgielri alip html => json donusumunden sonra, yokOkulListe.db kayit edecektir. 

