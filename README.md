# FREEGRAM FRONTEND

FREEGRAM FRONTEND – FREEGRAM ilovasi uchun mo'ljallangan kuchli frontend yechimidir. Ushbu repozitoriya foydalanuvchilarga intuitiv va interaktiv foydalanuvchi tajribasini taqdim etadi.

## Xususiyatlar

- **Foydalanuvchi Tashkiliyati**: JWT yordamida xavfsiz kirish va ro'yxatdan o'tish funksiyalari.
- **Postlarni Boshqarish**: Postlarni yaratish, o'qish, yangilash va o'chirish.
- **Foydalanuvchi Profilini Boshqarish**: Foydalanuvchi profillarini boshqarish va boshqalarni kuzatish/izlash.
- **Izohlar va Yoqtirishlar**: Postlarga izohlar qo'shish va yoqtirishlar.
- **Haqiqiy Vaqt Yangilanishlari**: Postlar va bildirishnomalarda haqiqiy vaqt yangilanishlarini qo'llab-quvvatlash.
- **Interaktiv UI**: Chiroyli va samarali foydalanuvchi interfeysi.

## Texnologiyalar

- **React**: UI komponentlarini yaratish uchun.
- **Redux va Redux Toolkit**: Davlat boshqaruvi uchun.
- **React Router DOM**: Marshrutlash uchun.
- **Axios**: API qo'ng'iroqlari uchun.
- **React Icons**: Piktogrammalar uchun.
- **Hot Toast**: Bildirishnomalar uchun.
- **Tailwind CSS**: Stil va dizayn uchun.
- **Socket.io Client**: Haqiqiy vaqt yangilanishlari uchun.

## Ishga Tushirish

### Talablar

- Node.js (v14.x yoki yuqori)
- NPM yoki Yarn

### O'rnatish

1. Repozitoriyani klonlash:

   ```bash
   https://github.com/elmurodvokhidov/FREEGRAM-FRONTEND.git
   ```

2. Loyihalar katalogiga o'tish:

   ```bash
   cd FREEGRAM-FRONTEND
   ```

3. Kerakli bog'liqliklarni o'rnatish:

   ```bash
   npm install
   ```

   yoki

   ```bash
   yarn install
   ```

4. Tailwind CSS ni sozlash:

   Tailwind CSS ni loyihaga qo'shish uchun, `tailwind.config.js` faylini yarating va quyidagi kodni qo'shing:

   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

   `src/index.css` fayliga quyidagi kodni qo'shing:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. Loyihaning ildiz katalogida `.env` faylini yarating va atrof-muhit o'zgaruvchilarini qo'shing:

   ```bash
   REACT_APP_API_URL=your_backend_api_url
   REACT_APP_SOCKET_URL=your_socket_io_server_url
   ```

6. Loyihani ishga tushiring:

   ```bash
   npm start
   ```

   yoki

   ```bash
   yarn start
   ```

   Ilova sizning brauzeringizda `http://localhost:3000` manzilida ochiladi.

## Loyihaning Tuzilishi

- `src/components`: Barcha React komponentlari.
- `src/redux`: Redux store va dilimlar.
- `src/pages`: Har xil sahifalar uchun komponentlar.
- `src/routes`: Marshrutlar konfiguratsiyasi.
- `src/services`: API qo'ng'iroqlari uchun xizmatlar.
- `src/styles`: Stil fayllari.

## Hissa Qo'shish

Hissa qo'shishlar xush kelibsiz! Iltimos, repozitoriyani forking qiling va o'zgarishlaringiz bilan pull request yuboring. Kodlash standartlariga rioya qiling va aniq commit xabarlari yozing.

## Litsenziya

Ushbu loyiha MIT Litsenziyasi asosida litsenziyalangan - batafsil ma'lumot uchun [LICENSE](LICENSE) faylini ko'rib chiqing.

## Aloqa

Har qanday savollar yoki muammolar uchun [elmurodvokhidov@gmail.com](mailto:elmurodvokhidov@gmail.com) elektron pochta manziliga murojaat qiling.