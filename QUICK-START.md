# ملف تشغيل سريع لمكتبة الوليد

## 🚀 للتشغيل السريع:

```bash
# 1. تشغيل Laravel Server
php artisan serve

# 2. تشغيل Vite (في terminal آخر)
npm run dev
```

## 🔗 الروابط المتاحة:

- **الصفحة الرئيسية**: http://127.0.0.1:8000
- **المقر الرئيسي**: http://127.0.0.1:8000/headquarters/login
- **المندوبين**: http://127.0.0.1:8000/representatives/login  
- **السائقين**: http://127.0.0.1:8000/drivers/login
- **المجهزين**: http://127.0.0.1:8000/preparers/login
- **العملاء**: http://127.0.0.1:8000/customers

## 🔑 بيانات تجريبية:

### المقر الرئيسي (أزرق)
- الهاتف: `01234567890`
- كلمة المرور: `admin123`

### المندوبين (أخضر)
- الهاتف: `07700000001`
- كلمة المرور: `rep123`

### السائقين (أصفر)
- الهاتف: `07800000001`
- كلمة المرور: `driver123`

### المجهزين (بنفسجي)
- الهاتف: `07900000001`
- كلمة المرور: `prep123`

## 📂 الهيكل الحالي:

```
resources/js/
├── Pages/
│   ├── Index.jsx                    # الصفحة الرئيسية
│   ├── Headquarters/Login.jsx       # تسجيل دخول المقر
│   ├── Representatives/Login.jsx    # تسجيل دخول المندوبين
│   ├── Drivers/Login.jsx           # تسجيل دخول السائقين
│   ├── Preparers/Login.jsx         # تسجيل دخول المجهزين
│   └── Customers/Index.jsx         # صفحة العملاء
└── Layouts/
    ├── GuestLayout.jsx             # للصفحات العامة
    ├── HeadquartersLayout.jsx      # للمقر الرئيسي
    ├── RepresentativesLayout.jsx   # للمندوبين
    ├── DriversLayout.jsx           # للسائقين
    ├── PreparersLayout.jsx         # للمجهزين
    └── CustomersLayout.jsx         # للعملاء
```

## ✅ المطلوب التالي:

1. إنشاء صفحات Dashboard لكل قسم
2. إضافة Controllers و Models
3. تطبيق نظام Authentication
4. إنشاء Database migrations
5. ربط النماذج بالمنطق
