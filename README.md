- これはある会社を想定した勤怠管理アプリです
- vercelのurl:https://attendance-drab.vercel.app/
- ※追記vercelでの環境上サーバーサイドはUTCで時間が登録されている（日本時間と時差が9時間ほどある）
- supabase https://supabase.com/dashboard/project/ffezlqgzrptsgmmcrrcf


### 使用技術
- Next.js
- prisma
- Supabase

### 使用言語
- Typescript

### 仕様

#### 仕様書
https://docs.google.com/document/d/17juWF7GBGzaEiDT-gjs988CC0VPfS1B9bFenDPbJsb0/edit


##### ホーム
- ホームのページでは現在時刻や勤怠管理におけるボタンが設置されている
- 社内ページは社内の従業員の状況を見ることが出来る
- 管理者ページでは各従業員の勤務時間を管理できる
<img width="1126" alt="スクリーンショット 2024-01-30 131900" src="https://github.com/TaiGa02/book-gather/assets/135023031/8e4392dd-de76-4082-b909-1568c246b3cd">


#### 出退勤管理
- ５種類のボタンを押すとフォームが表示される。
- 正確に登録することで出勤や退勤等を登録することが出来る
- リモートワークで登録するとメールが届くようになっている（本番環境ではエラーが発生したため現在削除）
- またリモートワークでなくても出勤から８時間経過すると確認のメールが届くようになっている　（本番環境ではエラーが発生したため現在削除）
<img width="1127" alt="スクリーンショット 2024-01-30 131947" src="https://github.com/TaiGa02/book-gather/assets/135023031/e57fa5e3-a33f-4959-a3d3-cc344c43a344">
<img width="1128" alt="スクリーンショット 2024-01-30 132007" src="https://github.com/TaiGa02/book-gather/assets/135023031/9b251bad-7092-4a16-95fd-ff1f46f3a2dc">



#### 社内ページ
- 社内ページを押すと社内の状況に遷移
- 社員名、出勤時間、退勤時間、社員の状況が表示される。
- ピンクがオフィス内で仕事、青がリモートワーク、緑が休憩中、灰色がオフィスにないまたは仕事中ではないことを表示している
- 従業員名をホバーするとメールアドレスが見れるので、連絡を取れそうな状況の社員にはこれを利用して連絡を取ってもよい
- オフィス内対応可能のタブを押すと、ピンクの状態の社員が見れる。個々の社員はオフィスで現在仕事しているので直接コンタクトを取る際の参考にしてほしい
- 検索バーを使うと特定の社員の検索できる。
- フルネームを打たなくても少しでも該当する文字があればヒットした社員をすべて表示する
<img width="1118" alt="スクリーンショット 2024-01-30 132420" src="https://github.com/TaiGa02/book-gather/assets/135023031/7c54f83e-d93a-4457-a9db-85aec838acc3">
<img width="1122" alt="スクリーンショット 2024-01-30 132112" src="https://github.com/TaiGa02/book-gather/assets/135023031/f3eec7bb-40dc-4e33-8f01-5ae8d8a3835f">
<img width="1113" alt="スクリーンショット 2024-01-30 132135" src="https://github.com/TaiGa02/book-gather/assets/135023031/6811fcdd-ac66-440f-8cea-a1aef6299dd0">
<img width="1125" alt="スクリーンショット 2024-01-30 132151" src="https://github.com/TaiGa02/book-gather/assets/135023031/92c5dcfd-70d0-4b7b-8653-64482b28bee6">

#### 管理者ページ
- 管理者のユーザー名、パスワードを正確に打つと、管理者用のページに遷移
- 簡易的に名前：admin、パスワード：adminで登録している
- ここでは従業員の当月の勤務時間及び残業時間を確認することが出来る
- ここでの時間は分で表示している（１分単位で給与管理をしたいため）
- 表示順は残業時間の多い順となっている
- 社内ページと同様に検索機能を搭載している
- また新しい従業員の登録のための新規登録ボタンもナビゲーションバーに搭載している
<img width="1127" alt="スクリーンショット 2024-01-30 132219" src="https://github.com/TaiGa02/book-gather/assets/135023031/c40ca9c4-e78b-4f54-889a-b989eb5b1109">
<img width="1114" alt="スクリーンショット 2024-01-30 132248" src="https://github.com/TaiGa02/book-gather/assets/135023031/952ba366-fd99-4092-b3a4-f4adb3e36b98">
<img width="1116" alt="スクリーンショット 2024-01-30 132313" src="https://github.com/TaiGa02/book-gather/assets/135023031/8ef97c4a-f1f2-4ca3-a976-a426fd04a4e9">
<img width="1128" alt="スクリーンショット 2024-01-30 132331" src="https://github.com/TaiGa02/book-gather/assets/135023031/14e0ca30-57f3-4c5c-bc6b-8e5fd7d5ae91">
<img width="1128" alt="スクリーンショット 2024-01-30 132347" src="https://github.com/TaiGa02/book-gather/assets/135023031/8e33dbd4-d845-4fc0-9f1d-6c6b363a7b04">


### 従業員情報

名前 | アドレス | パスワード
-- | -- | --
石原大河 | d-taiga.4869@outlook.jp | Taiga021300
石川太郎 | dahe31012@gmail.com | A1234bcd
塚本優子 | dahe31012@gmail.com | Abcd1234
大澤美玲 | d-taiga.4869@outlook.jp | Abcd1234
古谷優斗 | dahe31012@gmail.com | Abcd1234
町田佐那 | dahe31012@gmail.com | Abcd1234
吉原紗奈 | dahe31012@gmail.com | Abcd1234
稲田心菜 | dahe31012@gmail.com | Abcd1234
茂木一 | dahe31012@gmail.com | Abcd1234
藤岡蓮 | dahe31012@gmail.com | Abcd1234
甲斐柚乃 | dahe31012@gmail.com | Abcd1234
佐伯彰人 | dahe31012@gmail.com | Abcd1234
村田美優 | dahe31012@gmail.com | Abcd1234
石橋春樹 | dahe31012@gmail.com | Abcd1234
白石大地 | dahe31012@gmail.com | Abcd1234
佐野昌磨 | dahe31012@gmail.com | Abcd1234
中山優佳 | dahe31012@gmail.com | Abcd1234
小川圭介 | dahe31012@gmail.com | Abcd1234
上村真子 | dahe31012@gmail.com | Abcd1234
和田芽衣 | dahe31012@gmail.com | Abcd1234
平田丈 | dahe31012@gmail.com | Abcd1234
三浦雅人 | dahe31012@gmail.com | Abcd1234
木下風香 | dahe31012@gmail.com | Abcd1234
宮田晴 | dahe31012@gmail.com | Abcd1234
上原流星 | dahe31012@gmail.com | Abcd1234
矢野瀬奈 | dahe31012@gmail.com | Abcd1234
本間昌治 | dahe31012@gmail.com | Abcd1234
平井麗奈 | dahe31012@gmail.com | Abcd1234
野田登夢 | dahe31012@gmail.com | Abcd1234
小野慧 | dahe31012@gmail.com | Abcd1234
山中由奈 | dahe31012@gmail.com | Abcd1234
藤田大河 | dahe31012@gmail.com | Abcd1234
宮本一馬 | dahe31012@gmail.com | Abcd1234
岩崎志保 | dahe31012@gmail.com | Abcd1234
遠藤亮 | dahe31012@gmail.com | Abcd1234
丸山一 | dahe31012@gmail.com | Abcd1234
小島雪乃 | dahe31012@gmail.com | Abcd1234
横田健太郎 | dahe31012@gmail.com | Abcd1234
吉田玲 | dahe31012@gmail.com | Abcd1234

### データベーススキーマ
```
model Admin{
  id Int @id @default(autoincrement())
  name String
  password String
}

model Employee{
  id Int @id @default(autoincrement())
  name String
  password String
  email String
  work Boolean?
  rest Boolean?
  out Boolean?
  remote Boolean?
  monthly_time Int @default(0)
  monthly_overtime Int @default(0)
  startTime DateTime?
  endTime DateTime?
}
```
