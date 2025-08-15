<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Representative;
use App\Models\RepresentativeCommissionPlan;
use Carbon\Carbon;

class RepresentativeSeeder extends Seeder
{
    public function run(): void
    {
        // إنشاء مندوبين تجريبيين
        $representatives = [
            [
                'name' => 'أحمد محمد الكريم',
                'phone' => '07901234567',
                'identity_number' => '19900101001',
                'address' => 'بغداد - حي الجامعة',
                'status' => 'active',
                'areas' => ['بغداد - الكرخ', 'بغداد - الرصافة'],
                'product_categories' => ['مواد غذائية', 'منظفات'],
                'monthly_target' => 5000000, // 5 مليون دينار
                'current_sales' => 4200000, // 4.2 مليون دينار
                'hire_date' => Carbon::parse('2024-01-15'),
                'notes' => 'مندوب متميز مع خبرة واسعة في المبيعات',
            ],
            [
                'name' => 'فاطمة علي حسن',
                'phone' => '07812345678',
                'identity_number' => '19850505002',
                'address' => 'البصرة - حي الحسين',
                'status' => 'active',
                'areas' => ['البصرة'],
                'product_categories' => ['مواد غذائية'],
                'monthly_target' => 3000000, // 3 مليون دينار
                'current_sales' => 3500000, // 3.5 مليون دينار
                'hire_date' => Carbon::parse('2024-03-01'),
                'notes' => 'متخصصة في المواد الغذائية',
            ],
            [
                'name' => 'محمد جاسم العبودي',
                'phone' => '07723456789',
                'identity_number' => '19921010003',
                'address' => 'نينوى - الموصل',
                'status' => 'active',
                'areas' => ['نينوى'],
                'product_categories' => ['منظفات'],
                'monthly_target' => 2500000, // 2.5 مليون دينار
                'current_sales' => 1800000, // 1.8 مليون دينار
                'hire_date' => Carbon::parse('2024-02-20'),
                'notes' => 'يركز على منتجات التنظيف',
            ],
            [
                'name' => 'زينب عبد الرحمن',
                'phone' => '07634567890',
                'identity_number' => '19880808004',
                'address' => 'كربلاء - حي الحسين',
                'status' => 'inactive',
                'areas' => ['كربلاء', 'النجف'],
                'product_categories' => ['مواد غذائية', 'منظفات'],
                'monthly_target' => 4000000, // 4 مليون دينار
                'current_sales' => 2100000, // 2.1 مليون دينار
                'hire_date' => Carbon::parse('2023-12-01'),
                'notes' => 'مندوبة في إجازة مؤقتة',
            ],
        ];

        foreach ($representatives as $repData) {
            $representative = Representative::create($repData);

            // إنشاء خطة عمولة لكل مندوب
            $this->createCommissionPlan($representative);
        }
    }

    private function createCommissionPlan($representative)
    {
        // خطط عمولة مختلفة لكل مندوب
        $planTypes = ['target_based', 'box_based', 'profit_based'];
        $planType = $planTypes[array_rand($planTypes)];

        $planData = [
            'representative_id' => $representative->id,
            'plan_type' => $planType,
            'fixed_salary' => 1000000, // مليون دينار راتب ثابت
            'is_active' => true,
            'minimum_performance_rate' => 80,
        ];

        switch ($planType) {
            case 'target_based':
                $planData['target_settings'] = [
                    '1' => 2000000, // هدف من مورد رقم 1
                    '2' => 1500000, // هدف من مورد رقم 2
                ];
                break;
            case 'box_based':
                $planData['box_target'] = 6000; // 6000 كرتون
                $planData['box_commission'] = 300; // 300 دينار لكل كرتون
                break;
            case 'profit_based':
                $planData['profit_percentage'] = 15; // 15% من الربح
                break;
        }

        RepresentativeCommissionPlan::create($planData);
    }
}
