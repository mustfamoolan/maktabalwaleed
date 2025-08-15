# مكتبة الوليد - Laravel + Inertia.js + React

## نظرة عامة

مشروع مكتبة الوليد مبني باستخدام:
- **Laravel 12** (Backend)
- **Inertia.js** (Bridge بين Laravel و React)
- **React 19** (Frontend)
- **Tailwind CSS** (Styling)
- **Vite** (Build Tool)

## هيكل النظام

النظام مقسم إلى **5 أقسام منفصلة**:

### 1. 🏢 المقر الرئيسي (Headquarters)
- **المسار**: `/headquarters/login`
- **اللون**: أزرق (Blue)
- **الوظيفة**: الإدارة العامة ومراقبة النظام

### 2. 👨‍💼 المندوبين (Representatives)  
- **المسار**: `/representatives/login`
- **اللون**: أخضر (Green)
- **الوظيفة**: إدارة الطلبات والعملاء

### 3. 🚛 السائقين (Drivers)
- **المسار**: `/drivers/login`
- **اللون**: أصفر (Yellow)  
- **الوظيفة**: التوصيل والنقل

### 4. 📦 المجهزين (Preparers)
- **المسار**: `/preparers/login`
- **اللون**: بنفسجي (Purple)
- **الوظيفة**: تحضير وتجهيز الطلبات

### 5. 👥 العملاء (Customers)
- **المسار**: `/customers`
- **اللون**: نيلي (Indigo)
- **الوظيفة**: تصفح الكتب وتقديم الطلبات (بدون تسجيل دخول)

## المتطلبات

- PHP 8.2+
- Node.js 20+
- Composer
- NPM/Yarn

## التثبيت

### 1. تثبيت dependencies

```bash
composer install
npm install
```

### 2. إعداد البيئة

```bash
cp .env.example .env
php artisan key:generate
```

### 3. إعداد قاعدة البيانات

```bash
php artisan migrate
```

## التشغيل

### Development

```bash
# Terminal 1: Laravel Server
php artisan serve

# Terminal 2: Vite Dev Server
npm run dev
```

### Production Build

```bash
npm run build
```

## هيكل المشروع

### Frontend (React + Inertia.js)

```
resources/js/
├── Pages/              # صفحات التطبيق
│   ├── Index.jsx       # الصفحة الرئيسية (عرض جميع الأقسام)
│   ├── Headquarters/   # صفحات المقر الرئيسي
│   │   └── Login.jsx
│   ├── Representatives/ # صفحات المندوبين
│   │   └── Login.jsx
│   ├── Drivers/        # صفحات السائقين
│   │   └── Login.jsx
│   ├── Preparers/      # صفحات المجهزين
│   │   └── Login.jsx
│   └── Customers/      # صفحات العملاء
│       └── Index.jsx
├── Layouts/            # قوالب الصفحات
│   ├── GuestLayout.jsx         # للصفحات العامة
│   ├── HeadquartersLayout.jsx  # للمقر الرئيسي
│   ├── RepresentativesLayout.jsx # للمندوبين
│   ├── DriversLayout.jsx       # للسائقين
│   ├── PreparersLayout.jsx     # للمجهزين
│   └── CustomersLayout.jsx     # للعملاء
├── Components/         # مكونات قابلة للإعادة
│   ├── Button.jsx
│   └── FormField.jsx
├── config/            # إعدادات التطبيق
│   └── app.js
├── app.jsx           # ملف التطبيق الرئيسي
└── ziggy.js          # إعداد routes
```

### Backend (Laravel)

```
app/Http/
├── Controllers/      # Controllers (سيتم إضافتها لاحقاً)
├── Middleware/
│   └── HandleInertiaRequests.php
└── ...
routes/
├── web.php          # Web routes (Inertia.js)
└── api.php          # API routes (للمستقبل)
```

## المسارات المتاحة

### الصفحة الرئيسية
- `/` - عرض جميع الأقسام

### المقر الرئيسي  
- `/headquarters/login` - تسجيل دخول
- `/headquarters/dashboard` - لوحة التحكم

### المندوبين
- `/representatives/login` - تسجيل دخول  
- `/representatives/dashboard` - لوحة التحكم

### السائقين
- `/drivers/login` - تسجيل دخول
- `/drivers/dashboard` - لوحة التحكم

### المجهزين  
- `/preparers/login` - تسجيل دخول
- `/preparers/dashboard` - لوحة التحكم

### العملاء
- `/customers` - الصفحة الرئيسية
- `/customers/catalog` - كتالوج الكتب
- `/customers/orders` - طلبات العميل

## البيانات التجريبية

### المقر الرئيسي
- **الهاتف**: 01234567890
- **كلمة المرور**: admin123

### المندوبين
- **الهاتف**: 07700000001  
- **كلمة المرور**: rep123

### السائقين
- **الهاتف**: 07800000001
- **كلمة المرور**: driver123

### المجهزين
- **الهاتف**: 07900000001
- **كلمة المرور**: prep123

## الميزات المتاحة

### ✅ تم إعداده

- [x] Laravel + Inertia.js + React setup
- [x] Tailwind CSS styling  
- [x] Arabic RTL support
- [x] 5 أقسام منفصلة مع layouts مخصصة
- [x] صفحات تسجيل دخول مميزة لكل قسم
- [x] Reusable components (Button, FormField)
- [x] Ziggy for Laravel routes in JavaScript
- [x] Hot Module Replacement (HMR)
- [x] مسارات منظمة لكل قسم

### 🚧 جاهز للتطوير

- [ ] Authentication system
- [ ] Database models & migrations  
- [ ] CRUD operations
- [ ] Form validation
- [ ] File uploads
- [ ] Email notifications
- [ ] Dashboard pages لكل قسم

## كيفية العمل

### إضافة صفحة جديدة

1. إنشاء React component في المجلد المناسب `resources/js/Pages/{Section}/`
2. إضافة route في `routes/web.php`
3. استخدام `Inertia::render()` في Controller

### مثال

```php
// routes/web.php
Route::get('/headquarters/users', function () {
    return Inertia::render('Headquarters/Users', [
        'users' => User::all()
    ]);
});
```

```jsx
// resources/js/Pages/Headquarters/Users.jsx
import HeadquartersLayout from '@/Layouts/HeadquartersLayout';

export default function Users({ users }) {
    return (
        <HeadquartersLayout title="إدارة المستخدمين">
            {/* محتوى الصفحة */}
        </HeadquartersLayout>
    );
}
```

## ملاحظات التطوير

- الخادم يعمل على: `http://127.0.0.1:8000`
- Vite dev server: `http://localhost:5173`
- جميع التغييرات يتم تحديثها تلقائياً (HMR)
- استخدم `useForm` من Inertia.js للنماذج
- استخدم `Link` من Inertia.js للتنقل
- كل قسم له Layout مخصص ولون مميز

## روابط مفيدة

- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js Documentation](https://inertiajs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
