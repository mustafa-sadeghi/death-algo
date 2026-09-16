# الگوریتم‌های مرگ — GitHub Pages

وب‌سایت استاتیک و واکنش‌گرا برای معرفی و انتشار نسخه PDF کتاب
**«الگوریتم‌های مرگ؛ نقش هوش مصنوعی در تحول میدان نبرد»**.

## ساختار پروژه

```text
.
├── index.html
├── styles.css
├── script.js
├── book.pdf
├── manifest.webmanifest
├── robots.txt
└── assets/
    ├── cover.png
    └── favicon.svg
```

## انتشار روی GitHub Pages

1. یک Repository جدید در GitHub بسازید.
2. همه فایل‌ها و پوشه‌های این پروژه را در ریشه Repository آپلود کنید.
3. وارد `Settings` شوید.
4. از منوی سمت چپ `Pages` را باز کنید.
5. در بخش **Build and deployment**:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
6. روی Save بزنید.
7. چند دقیقه بعد آدرس سایت در همان صفحه نمایش داده می‌شود.

## جایگزینی نسخه جدید کتاب

فقط فایل `book.pdf` را با نسخه جدید جایگزین کنید و تغییرات را Commit کنید.
لینک‌های مطالعه آنلاین و دانلود به‌صورت خودکار همان فایل را استفاده می‌کنند.

## جایگزینی جلد

فایل زیر را عوض کنید:

```text
assets/cover.png
```

بهتر است نسبت تصویر جلد حدود 2:3 باشد.

## سفارشی‌سازی

- رنگ‌ها و ظاهر: `styles.css`
- متن‌ها و ساختار صفحه: `index.html`
- تعامل‌ها، PDF Reader و اشتراک‌گذاری: `script.js`

این پروژه نیاز به Node.js، npm یا فرآیند Build ندارد و مستقیماً روی GitHub Pages اجرا می‌شود.
