<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\HeadquartersUser;
use Illuminate\Support\Facades\Hash;

class HeadquartersUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // إنشاء المستخدم الإداري الافتراضي
        HeadquartersUser::create([
            'name' => 'مدير المقر الرئيسي',
            'phone' => '07742209251',
            'email' => 'admin@maktabalwaleed.com',
            'password' => '12345678',
            'role' => 'admin',
            'department' => 'management',
            'is_active' => true,
            'permissions' => [
                'view_dashboard',
                'manage_representatives',
                'manage_suppliers',
                'manage_warehouse',
                'view_reports',
                'manage_settings',
                'manage_users'
            ]
        ]);

        // إضافة مستخدمين إضافيين للاختبار
        HeadquartersUser::create([
            'name' => 'مدير المبيعات',
            'phone' => '07701234567',
            'email' => 'sales@maktabalwaleed.com',
            'password' => '12345678',
            'role' => 'manager',
            'department' => 'sales',
            'is_active' => true,
            'permissions' => [
                'view_dashboard',
                'manage_representatives',
                'view_reports'
            ]
        ]);

        HeadquartersUser::create([
            'name' => 'مدير المخازن',
            'phone' => '07709876543',
            'email' => 'warehouse@maktabalwaleed.com',
            'password' => '12345678',
            'role' => 'manager',
            'department' => 'warehouse',
            'is_active' => true,
            'permissions' => [
                'view_dashboard',
                'manage_warehouse',
                'manage_suppliers',
                'view_reports'
            ]
        ]);
    }
}
