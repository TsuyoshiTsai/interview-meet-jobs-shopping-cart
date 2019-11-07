## Meet jobs 面試小作業

### 說明

1. 建立 Fake API 的方式: 使用 [json-server](https://github.com/typicode/json-server)
2. 在商品細節頁填寫數量，加入購物車，只會影響購物車的商品數量
3. 商品購買成功後才會影響商品庫存，並導頁到購買成功頁面
4. 使用者開啟多個分頁，將商品加入購物車/結帳時，皆有做資料上的考量，不過礙於時間緊迫，只使用瀏覽器提供的 `alert` 做提示
5. 多了觀看訂單的頁面
6. 原本打算在 admin 頁做新增/編輯商品的功能，不過目前的功能已達成需求，故不再往下走

### 使用流程

1. `npm install`
2. `npm run start:db` 啟動資料庫
3. `npm run start` 啟動應用程式

### 測試瀏覽器

1. Chrome - Version 78.0.3904.87 (Official Build) (64-bit)
2. Firefox Developer Edition - 71.0b6 (64-bit)
   - 請把 Preferences -> Privacy & Security -> Cookies and Site Data 區塊中 "Delete cookies and site data when Firefox Developer Edition is closed" 的設定取消勾選，或是將 `http://localhost:3000` 加入到白名單內
   - 否則會發生 Firefox 不允許註冊 ServiceWorker 的問題，詳見: https://github.com/angular/angular/issues/28373#issuecomment-457660975
3. Safari - Version 13.0.3 (14608.3.10.10.1)
