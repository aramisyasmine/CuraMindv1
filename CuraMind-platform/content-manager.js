/**
 * content-manager.js - إدارة محتوى منصة CuraMind
 * يشمل: CRUD للدروس، وظيفة تصفية المحتوى للطلاب.
 */

document.addEventListener('DOMContentLoaded', () => {
    const lessonForm = document.getElementById('lesson-form');
    if (lessonForm) {
        lessonForm.addEventListener('submit', handleLessonSubmission);
    }
});

/**
 * جلب جميع الدروس من التخزين المحلي.
 */
window.getAllLessons = function() {
    return window.getLocalStorageData('curamind_lessons');
};

/**
 * وظيفة معالجة إرسال النموذج (إضافة/تعديل درس).
 */
function handleLessonSubmission(e) {
    e.preventDefault();

    const lessonId = document.getElementById('lesson-id').value;
    const title = document.getElementById('lesson-title').value;
    const specialty = document.getElementById('lesson-specialty').value;
    const year = parseInt(document.getElementById('lesson-year').value);
    const content = document.getElementById('lesson-content').value;
    const video_url = document.getElementById('lesson-video').value;
    const qcm_json = document.getElementById('lesson-qcm').value;

    let lessons = window.getAllLessons();
    
    const newLesson = {
        title, specialty, year, content, video_url,
        qcm_data: qcm_json ? JSON.parse(qcm_json) : [], 
    };

    if (lessonId) {
        const lessonIndex = lessons.findIndex(l => l.id === lessonId);
        if (lessonIndex !== -1) {
            lessons[lessonIndex] = { ...lessons[lessonIndex], ...newLesson, updated_at: Date.now() };
            alert(`تم تعديل الدرس "${title}" بنجاح.`);
        }
    } else {
        const id = 'L' + Date.now();
        lessons.push({ id, ...newLesson, created_at: Date.now() });
        alert(`تم إضافة الدرس "${title}" بنجاح (ID: ${id}).`);
    }

    window.setLocalStorageData('curamind_lessons', lessons);
    if (window.loadContentTable) window.loadContentTable(); // تحديث الجدول في لوحة المشرف
    document.getElementById('lesson-form').reset();
}

/**
 * تحميل جدول المحتوى في لوحة المشرف.
 */
window.loadContentTable = function() {
    const lessons = window.getAllLessons();
    const tableBody = document.getElementById('content-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';

    lessons.forEach(lesson => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${lesson.id}</td>
            <td>${lesson.title}</td>
            <td>${lesson.specialty.toUpperCase()}</td>
            <td>${lesson.year}</td>
            <td>
                <button class="btn btn-primary btn-link" onclick="window.editLesson('${lesson.id}')"><i class="fas fa-edit"></i></button>
                <button class="btn btn-secondary btn-link" onclick="window.deleteLesson('${lesson.id}', '${lesson.title}')" style="color: red;"><i class="fas fa-trash"></i></button>
            </td>
        `;
    });
};

/**
 * دالة لتعديل درس موجود (للوحة المشرف).
 */
window.editLesson = function(lessonId) {
    const lesson = window.getAllLessons().find(l => l.id === lessonId);
    if (!lesson) return alert("الدرس غير موجود.");

    document.getElementById('lesson-id').value = lesson.id;
    document.getElementById('lesson-title').value = lesson.title;
    document.getElementById('lesson-specialty').value = lesson.specialty;
    document.getElementById('lesson-year').value = lesson.year;
    document.getElementById('lesson-content').value = lesson.content;
    document.getElementById('lesson-video').value = lesson.video_url;
    document.getElementById('lesson-qcm').value = lesson.qcm_data ? JSON.stringify(lesson.qcm_data, null, 2) : '';

    if (window.showSection) window.showSection('add-lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * دالة لحذف درس (للوحة المشرف).
 */
window.deleteLesson = function(lessonId, lessonTitle) {
    if (confirm(`هل أنت متأكد من حذف الدرس: "${lessonTitle}"؟`)) {
        let lessons = window.getAllLessons();
        lessons = lessons.filter(l => l.id !== lessonId);
        window.setLocalStorageData('curamind_lessons', lessons);
        alert(`تم حذف الدرس "${lessonTitle}" بنجاح.`);
        if (window.loadContentTable) window.loadContentTable(); 
    }
};

// ---------------------------------------------
// وظيفة تصفية المحتوى للطالب
// ---------------------------------------------

/**
 * تصفية المحتوى لإظهار الدروس المخصصة لتخصص وسنة معينة.
 */
window.filterContent = function(specialty, year) {
    const allLessons = window.getAllLessons();
    return allLessons.filter(lesson => 
        lesson.specialty === specialty && lesson.year === year
    );
};