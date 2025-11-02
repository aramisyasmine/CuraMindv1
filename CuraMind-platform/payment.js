/**
 * payment.js - محاكاة لنظام الدفع الإلكتروني (Baridi Mob, ECCP)
 */

document.addEventListener('DOMContentLoaded', () => {
    // جدول الأسعار
    window.PRICING = {
        medicine: { 1: 1000, 2: 2000, 3: 2800, 4: 3500, 5: 4000, 6: 4800, 7: 5500 },
        dentistry: { 1: 1000, 2: 2000, 3: 2800, 4: 3500, 5: 4000 },
        pharmacy: { 1: 1000, 2: 2000, 3: 2800, 4: 3500, 5: 4000, 6: 4800 },
        currency: "DA"
    };
});

/**
 * جلب سعر الاشتراك.
 */
window.getSubscriptionPrice = function(specialty, year) {
    const price = window.PRICING[specialty] ? window.PRICING[specialty][year] : 0;
    return price ? `${price} ${window.PRICING.currency}` : "غير متاح";
};


/**
 * دالة محاكاة لعملية الدفع.
 */
window.initiatePayment = function(method, user) {
    if (confirm(`هل أنت متأكد من الدفع عبر ${method.toUpperCase()}؟ المبلغ: ${window.getSubscriptionPrice(user.specialty, user.year)}`)) {
        // [API_INTEGRATION_POINT]
        // في التطبيق الحقيقي، يتم إرسال طلب إلى API Baridi Mob/ECCP هنا.
        
        alert("جارٍ محاكاة الدفع... (في بيئة حقيقية يتم التحقق من رد API)");
        window.confirmPaymentSuccess(user);
    }
};

/**
 * محاكاة لتأكيد نجاح الدفع وتحديث صلاحية الاشتراك للطالب.
 */
window.confirmPaymentSuccess = function(user) {
    const users = window.getLocalStorageData('curamind_users');
    const userIndex = users.findIndex(u => u.id === user.id);

    if (userIndex !== -1) {
        const oneYearInMs = 365 * 24 * 60 * 60 * 1000;
        users[userIndex].subscription_valid_until = Date.now() + oneYearInMs;

        window.setLocalStorageData('curamind_users', users);
        
        // تحديث الجلسة الحالية
        localStorage.setItem('curamind_session', JSON.stringify(users[userIndex]));

        alert("✅ تم تأكيد الدفع بنجاح! تم تفعيل اشتراكك لمدة سنة. سيتم توجيهك الآن.");
        window.location.href = 'student-dashboard.html';
    } else {
        alert("خطأ: لم يتم العثور على المستخدم لتحديث الاشتراك.");
    }
};

/**
 * عرض واجهة الدفع (Mock)
 */
window.renderPaymentPage = function(user) {
    const price = window.getSubscriptionPrice(user.specialty, user.year);
    
    // إنشاء عنصر Modal/Payment view مؤقت
    const paymentModal = document.createElement('div');
    paymentModal.id = 'payment-modal';
    paymentModal.style = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); 
        display: flex; justify-content: center; align-items: center; z-index: 2000;
    `;
    
    paymentModal.innerHTML = `
        <div style="background: var(--medical-white); padding: 40px; border-radius: 15px; max-width: 500px; text-align: center; box-shadow: var(--shadow-hover);">
            <h2 style="color: var(--medical-blue);"><i class="fas fa-lock"></i> صفحة الدفع الآمنة</h2>
            <p style="margin: 10px 0;"><strong>الاشتراك:</strong> ${user.specialty.toUpperCase()} - السنة ${user.year}</p>
            <p style="margin: 20px 0;"><strong>المبلغ المستحق:</strong> <span style="font-size: 1.8em; color: var(--accent-green); font-weight: bold;">${price}</span></p>
            
            <hr style="margin: 30px 0;">
            
            <h4 style="color: #666;">اختر طريقة الدفع (محاكاة):</h4>
            
            <button class="btn btn-primary" style="margin: 10px 0; width: 90%;" onclick="window.initiatePayment('baridi mob', ${JSON.stringify(user).replace(/"/g, '&quot;')}); document.body.removeChild(document.getElementById('payment-modal'));">
                <i class="fas fa-credit-card"></i> الدفع عبر Baridi Mob (API Point)
            </button>

            <button class="btn btn-primary" style="margin: 10px 0; width: 90%;" onclick="window.initiatePayment('eccp', ${JSON.stringify(user).replace(/"/g, '&quot;')}); document.body.removeChild(document.getElementById('payment-modal'));">
                <i class="fas fa-university"></i> الدفع عبر ECCP (API Point)
            </button>
            
            <p style="margin-top: 20px; font-size: 0.8em; color: #cc0000;">*هذه محاكاة. في البيئة الحقيقية يتم التحقق من الدفع إلكترونياً.</p>
        </div>
    `;
    
    document.body.appendChild(paymentModal);
};