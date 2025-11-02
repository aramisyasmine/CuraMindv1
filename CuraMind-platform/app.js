/**
 * app.js - المنطق الرئيسي لمنصة CuraMind
 * يشمل: إدارة اللغات، تحميل البيانات المحلية، والتحكم بالواجهة.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ---------------------------------------------
    // 1. نظام تعدد اللغات (Multilingual System)
    // ---------------------------------------------

    const translations = {
        ar: {
            title: "CuraMind | منصة التعليم الطبي الأولى في الجزائر",
            nav_home: "الرئيسية", nav_specialties: "التخصصات", nav_features: "المميزات", nav_pricing: "الأسعار", nav_support: "الدعم",
            btn_login_register: "تسجيل / دخول",
            hero_title: "منصة التعليم الطبي الأولى لطلاب الجزائر 🇩🇿",
            hero_subtitle: "محتوى مخصص، اختبارات تفاعلية، ودروس عالية الجودة في الطب، طب الأسنان، والصيدلة.",
            btn_start_learning: "ابدأ التعلم الآن", btn_view_pricing: "عرض الأسعار",
            stat_students: "طالب", stat_lessons: "درس", stat_specialties: "تخصصات",
            sec_specialties_title: "تخصصاتنا الطبية", sec_specialties_subtitle: "محتوى شامل ومحدث لكل تخصص وسنة دراسية.",
            spec_med_title: "الطب", spec_med_years: "7 سنوات دراسية",
            spec_dent_title: "طب الأسنان", spec_dent_years: "5 سنوات دراسية",
            spec_pharm_title: "الصيدلة", spec_pharm_years: "6 سنوات دراسية",
            btn_view_details: "عرض التفاصيل",
            sec_features_title: "لماذا CuraMind؟",
            feat_time_title: "تعلم في أي وقت وأي مكان", feat_time_desc: "المرونة الكاملة للتعلم من أي جهاز وفي أي وقت يناسبك.",
            feat_custom_title: "محتوى مخصص لتخصصك", feat_custom_desc: "دروس واختبارات مصممة بدقة لتخصصك وسنتك الدراسية.",
            feat_qcm_title: "اختبارات تقييمية (QCM)", feat_qcm_desc: "اختبر معرفتك بتصحيح فوري ونتائج مفصلة.",
            feat_support_title: "دعم تقني متكامل", feat_support_desc: "فريق دعم مستعد لمساعدتك في كل خطوة.",
            sec_pricing_title: "الأسعار والاشتراكات", sec_pricing_subtitle: "اشتراك سنوي واحد يمنحك وصولاً كاملاً لجميع محتوى سنتك الدراسية.",
            table_year: "السنة", btn_secure_subscribe: "اشترك الآن وابدأ التعلم", payment_note: "*جميع الأسعار بالدينار الجزائري (DA) لعام دراسي كامل.",
            footer_contact: "اتصل بنا", footer_phone: "الهاتف: 0553577917", footer_email: "البريد الإلكتروني: nourhanemalak74@gmail.com", footer_hours: "ساعات العمل: 8:00 - 20:00",
            footer_help: "روابط مساعدة", link_faq: "الأسئلة الشائعة", link_guides: "أدلة الاستخدام", link_contact_form: "نموذج الاتصال", footer_rights: "جميع الحقوق محفوظة.",
        },
        fr: {
            title: "CuraMind | Première plateforme d'e-learning médical en Algérie",
            nav_home: "Accueil", nav_specialties: "Spécialités", nav_features: "Fonctionnalités", nav_pricing: "Tarifs", nav_support: "Support",
            btn_login_register: "S'inscrire / Connexion",
            hero_title: "La Première Plateforme d'Apprentissage Médical pour les Étudiants Algériens 🇩🇿",
            hero_subtitle: "Contenu personnalisé, QCM interactifs et cours de haute qualité en Médecine, Dentisterie et Pharmacie.",
            btn_start_learning: "Commencez à Apprendre Maintenant", btn_view_pricing: "Voir les Tarifs",
            stat_students: "Étudiants", stat_lessons: "Cours", stat_specialties: "Spécialités",
            sec_specialties_title: "Nos Spécialités Médicales", sec_specialties_subtitle: "Contenu complet et mis à jour pour chaque spécialité et année universitaire.",
            spec_med_title: "Médecine", spec_med_years: "7 années d'études",
            spec_dent_title: "Dentisterie", spec_dent_years: "5 années d'études",
            spec_pharm_title: "Pharmacie", spec_pharm_years: "6 années d'études",
            btn_view_details: "Voir Détails",
            sec_features_title: "Pourquoi CuraMind ?",
            feat_time_title: "Apprenez n'importe où, n'importe quand", feat_time_desc: "Flexibilité totale pour apprendre depuis n'importe quel appareil et à votre meilleur moment.",
            feat_custom_title: "Contenu adapté à votre spécialité", feat_custom_desc: "Cours et quiz conçus spécifiquement pour votre spécialité et votre année.",
            feat_qcm_title: "Quiz d'Évaluation (QCM)", feat_qcm_desc: "Testez vos connaissances avec correction immédiate et résultats détaillés.",
            feat_support_title: "Support Technique Intégral", feat_support_desc: "Une équipe de support prête à vous aider à chaque étape.",
            sec_pricing_title: "Tarifs et Abonnements", sec_pricing_subtitle: "Un seul abonnement annuel vous donne un accès complet à tout le contenu de votre année universitaire.",
            table_year: "Année", btn_secure_subscribe: "Abonnez-vous Maintenant et Commencez à Apprendre", payment_note: "*Tous les prix sont en Dinars Algériens (DA) pour une année académique complète.",
            footer_contact: "Contactez-nous", footer_phone: "Téléphone: 0553577917", footer_email: "Email: nourhanemalak74@gmail.com", footer_hours: "Heures d'ouverture: 8:00 - 20:00",
            footer_help: "Liens Utiles", link_faq: "FAQ", link_guides: "Guides d'Utilisation", link_contact_form: "Formulaire de Contact", footer_rights: "Tous droits réservés.",
        },
        en: {
            title: "CuraMind | The Premier Medical E-Learning Platform in Algeria",
            nav_home: "Home", nav_specialties: "Specialties", nav_features: "Features", nav_pricing: "Pricing", nav_support: "Support",
            btn_login_register: "Register / Login",
            hero_title: "The Premier Medical E-Learning Platform for Algerian Students 🇩🇿",
            hero_subtitle: "Customized content, interactive QCMs, and high-quality lessons in Medicine, Dentistry, and Pharmacy.",
            btn_start_learning: "Start Learning Now", btn_view_pricing: "View Pricing",
            stat_students: "Students", stat_lessons: "Lessons", stat_specialties: "Specialties",
            sec_specialties_title: "Our Medical Specialties", sec_specialties_subtitle: "Comprehensive and updated content for every specialty and academic year.",
            spec_med_title: "Medicine", spec_med_years: "7 Academic Years",
            spec_dent_title: "Dentistry", spec_dent_years: "5 Academic Years",
            spec_pharm_title: "Pharmacy", spec_pharm_years: "6 Academic Years",
            btn_view_details: "View Details",
            sec_features_title: "Why CuraMind?",
            feat_time_title: "Learn Anytime, Anywhere", feat_time_desc: "Full flexibility to learn from any device at a time that suits you.",
            feat_custom_title: "Content Tailored to Your Specialty", feat_custom_desc: "Lessons and quizzes meticulously designed for your specialty and academic year.",
            feat_qcm_title: "Assessment Quizzes (QCM)", feat_qcm_desc: "Test your knowledge with instant correction and detailed results.",
            feat_support_title: "Integrated Technical Support", feat_support_desc: "A support team ready to assist you every step of the way.",
            sec_pricing_title: "Pricing and Subscriptions", sec_pricing_subtitle: "A single annual subscription grants you full access to all content for your academic year.",
            table_year: "Year", btn_secure_subscribe: "Subscribe Now and Start Learning", payment_note: "*All prices are in Algerian Dinars (DA) for a full academic year.",
            footer_contact: "Contact Us", footer_phone: "Phone: 0553577917", footer_email: "Email: nourhanemalak74@gmail.com", footer_hours: "Working Hours: 8:00 - 20:00",
            footer_help: "Helpful Links", link_faq: "FAQ", link_guides: "User Guides", link_contact_form: "Contact Form", footer_rights: "All rights reserved.",
        }
    };

    const langSwitcher = document.getElementById('language-switcher');
    let currentLang = localStorage.getItem('curamind_lang') || 'ar'; 

    function updateContentLanguage(lang) {
        const selectedTranslations = translations[lang];

        if (lang === 'ar') {
            document.body.style.direction = 'rtl';
            document.body.style.textAlign = 'right';
        } else {
            document.body.style.direction = 'ltr';
            document.body.style.textAlign = 'left';
        }

        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (selectedTranslations[key]) {
                if (element.tagName === 'TITLE') {
                    document.title = selectedTranslations[key];
                } else {
                    element.textContent = selectedTranslations[key];
                }
            }
        });

        localStorage.setItem('curamind_lang', lang);
    }

    langSwitcher.value = currentLang;
    updateContentLanguage(currentLang);

    langSwitcher.addEventListener('change', (e) => {
        currentLang = e.target.value;
        updateContentLanguage(currentLang);
    });

    // ---------------------------------------------
    // 2. نظام التخزين المحلي (Local Storage/Mock Data)
    // ---------------------------------------------
    
    // محاكاة لـ database.json باستخدام localStorage
    if (!localStorage.getItem('curamind_lessons')) {
        const mockLessons = [
            { id: "L001", title: "مقدمة في التشريح", content: "محتوى درس التشريح الأساسي...", video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", specialty: "medicine", year: 1, created_at: Date.now() },
            { id: "L002", title: "أساسيات علم الأدوية", content: "محتوى درس علم الأدوية الأساسي...", video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", specialty: "pharmacy", year: 2, created_at: Date.now() },
            { id: "L003", title: "تركيب السن", content: "محتوى درس تركيب السن الأساسي...", video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", specialty: "dentistry", year: 1, created_at: Date.now() },
        ];
        localStorage.setItem('curamind_lessons', JSON.stringify(mockLessons));
    }

    if (!localStorage.getItem('curamind_users')) {
        const mockUsers = [
            // حساب المشرف (المدير)
            { id: 1, email: "admin@curamind.dz", password: "adminPassword", role: "admin", specialty: null, year: null },
            // حساب طالب افتراضي (اشتراك فعال)
            { id: 2, email: "student@curamind.dz", password: "studentPassword", role: "student", specialty: "medicine", year: 1, subscription_valid_until: Date.now() + (365 * 24 * 60 * 60 * 1000) }
        ];
        localStorage.setItem('curamind_users', JSON.stringify(mockUsers));
    }
    
    // ---------------------------------------------
    // 3. التحكم بالانتقال (Mock)
    // ---------------------------------------------
    
    // يتم التعامل مع منطق التسجيل/الدخول في auth.js
    
});

// وظيفة عامة لاسترجاع وتخزين البيانات
window.getLocalStorageData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

window.setLocalStorageData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};