<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class ShareHeadquartersUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // مشاركة بيانات المستخدم مع جميع صفحات Inertia
        Inertia::share([
            'auth' => [
                'headquarters_user' => Auth::guard('headquarters')->check()
                    ? Auth::guard('headquarters')->user()->getFullInfoAttribute()
                    : null,
            ],
        ]);

        return $next($request);
    }
}
