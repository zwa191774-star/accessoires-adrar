document.addEventListener('DOMContentLoaded', () => {
    // 1. نظام قائمة التنقل المتجاوبة للهواتف (Hamburger Menu)
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. نظام إدارة نافذة خيارات الطلب (واتساب / إنستغرام)
    const modal = document.getElementById('order-modal');
    const closeModal = document.querySelector('.close-modal');
    const orderButtons = document.querySelectorAll('.order-btn');
    const modalTitle = document.getElementById('modal-title-product');

    // أزرار التوجيه داخل النافذة المنبثقة
    const whatsappBtn = document.getElementById('order-whatsapp-btn');
    const instagramBtn = document.getElementById('order-instagram-btn');

    // متغيرات لحفظ بيانات المنتج الذي ضغط عليه الزبون مؤقتاً
    let currentProductName = "";
    let currentProductPrice = "";

    // روابط حساباتك الرسمية لاستقبال طلبات الزبائن
    const ownerPhoneNumber = "213655562019"; // رقم الواتساب الخاص بك بدون + أو أصفار إضافية
    const instagramProfileUrl = "https://instagram.com"; // 👈 ضع هنا رابط حساب إنستغرام لمتجرك بدلاً من الرابط العام

    // عند الضغط على زر "شراء الآن" لكل كرت منتج
    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.price-card');
            if (card) {
                currentProductName = card.getAttribute('data-product');
                currentProductPrice = card.getAttribute('data-price');

                // تحديث عنوان النافذة باسم المنتج وسعره تلقائياً ليرى الزبون ماذا يطلب
                if (modalTitle) {
                    modalTitle.textContent = `طلب: ${currentProductName} (${currentProductPrice})`;
                }

                // إظهار النافذة بسلاسة بنظام flex المتجاوب
                if (modal) {
                    modal.style.display = 'flex';
                }
            }
        });
    });

    // تشغيل زر الواتساب وتوليد رسالة الطلب التلقائية والمشفرة بعناية
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const messageText = `🛍️ *استفسار وطلب من الموقع* 🛍️\n\n` +
                                `📦 *المنتج المختار:* ${currentProductName}\n` +
                                `💰 *السعر المعروض:* ${currentProductPrice}\n\n` +
                                `👋 السلام عليكم، أريد طلب هذا المنتج والاستفسار عن تفاصيل التوصيل المتوفرة.`;

            // تشفير النص لحماية الرموز التعبيرية والمسافات من الكسر في المتصفح
            const encodedMessage = encodeURIComponent(messageText);
            
            // تصحيح بناء الرابط بإضافة علامة / لتفادي خطأ تعذر الوصول
            const whatsappUrl = `https://wa.me{ownerPhoneNumber}?text=${encodedMessage}`;

            // فتح المحادثة المجهزة في نافذة جديدة للزبون
            window.open(whatsappUrl, '_blank');
            modal.style.display = 'none'; // إغلاق النافذة المنبثقة تلقائياً
        });
    }

    // تشغيل زر إنستغرام للتوجه الفوري والمباشر لحساب المحل الخاص بك
    if (instagramBtn) {
        instagramBtn.addEventListener('click', () => {
            window.open(instagramProfileUrl, '_blank');
            modal.style.display = 'none'; // إغلاق النافذة المنبثقة تلقائياً
        });
    }

    // إغلاق النافذة عند الضغط على زر الإغلاق (X)
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // إغلاق النافذة المنبثقة تلقائياً إذا ضغط الزبون في أي مكان فارغ خارج الصندوق الرئيسي
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});