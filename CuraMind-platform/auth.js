/**
 * auth.js - نظام المصادقة (Authentication Mock)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const authBtn = document.getElementById('auth-btn');
    const subscribeBtn = document.getElementById('subscribe-cta-btn');
    
    if (authBtn) {
        // حدث عند الضغط على زر تسجيل/دخول
        authBtn.addEventListener('click', () => {
            const action = prompt("الرجاء تحديد الإجراء: (login/register)");
            
            if (action === 'register') {
                handleRegister();
            } else if (action === 'login') {
                handleLogin();
            } else {
                checkSessionAndRedirect(); // إذا كان مسجل الدخول، يوجهه للوحة التحكم
            }
        });
    }

    // ---------------------------------------------
    // 1. التحقق من الجلسة والتوجيه
    // ---------------------------------------------
    
    /**
     * يتحقق من جلسة المستخدم المخزنة محليًا ويوجه إلى لوحة التحكم المناسبة.
     */
    function checkSessionAndRedirect() {
        const user = JSON.parse(localStorage.getItem('curamind_session'));
        
        if (user) {
            if (user.role === 'admin') {
                alert(`أهلاً بك أيها المشرف ${user.email}! سيتم توجيهك إلى لوحة التحكم.`);
                window.location.href = 'dashboard.html';
            } else if (user.role === 'student') {
                const now = Date.now();
                if (user.subscription_valid_until > now) {
                    alert(`أهلاً بك أيها الطالب ${user.email}! اشتراكك فعال. سيتم توجيهك إلى لوحة الطالب.`);
                    window.location.href = 'student-dashboard.html';
                } else {
                    alert(`أهلاً بك أيها الطالب ${user.email}! يرجى تجديد اشتراكك.`);
                    // توجيه إلى صفحة الدفع (محاكاة)
                    window.renderPaymentPage(user);
                }
            }
        } else {
            alert("يرجى تسجيل الدخول أولاً.");
        }
    }

    // ---------------------------------------------
    // 2. وظيفة التسجيل (Register)
    // ---------------------------------------------
    
    function handleRegister() {
        const email = prompt("أدخل بريدك الإلكتروني:");
        const password = prompt("أدخل كلمة المرور:");
        const specialty = prompt("اختر التخصص (medicine/dentistry/pharmacy):").toLowerCase();
        const year = parseInt(prompt("اختر السنة الدراسية (1-7):"));

        if (!email || !password || !['medicine', 'dentistry', 'pharmacy'].includes(specialty) || !(year >= 1 && year <= 7)) {
            alert("يرجى إدخال بيانات صحيحة.");
            return;
        }

        let users = window.getLocalStorageData('curamind_users');
        if (users.find(u => u.email === email)) {
            alert("هذا البريد الإلكتروني مسجل بالفعل.");
            return;
        }

        const newUser = {
            id: Date.now(),
            email,
            password, 
            role: 'student',
            specialty,
            year,
            subscription_valid_until: 0 // اشتراك غير فعال حتى يتم الدفع
        };

        users.push(newUser);
        window.setLocalStorageData('curamind_users', users);
        
        // تسجيل الدخول مباشرة بعد التسجيل
        localStorage.setItem('curamind_session', JSON.stringify(newUser));
        alert("تم التسجيل بنجاح! سيتم توجيهك الآن لعملية الدفع.");
        
        // توجيه إلى صفحة الدفع (محاكاة)
        window.renderPaymentPage(newUser); 
    }

    // ---------------------------------------------
    // 3. وظيفة تسجيل الدخول (Login)
    // ---------------------------------------------
    
    function handleLogin() {
        const email = prompt("أدخل بريدك الإلكتروني:");
        const password = prompt("أدخل كلمة المرور:");

        if (!email || !password) {
            alert("يرجى إدخال البريد وكلمة المرور.");
            return;
        }

        const users = window.getLocalStorageData('curamind_users');
        const user = users.find(u => u.email === email && u.password === password); 
        
        if (user) {
            localStorage.setItem('curamind_session', JSON.stringify(user));
            alert("تم تسجيل الدخول بنجاح.");
            checkSessionAndRedirect();
        } else {
            alert("خطأ في البريد الإلكتروني أو كلمة المرور.");
        }
    }
    
    // ---------------------------------------------
    // 4. وظيفة تسجيل الخروج (Logout)
    // ---------------------------------------------

    window.logout = function() {
        localStorage.removeItem('curamind_session');
        alert("تم تسجيل الخروج.");
        window.location.href = 'index.html';
    };
    
});