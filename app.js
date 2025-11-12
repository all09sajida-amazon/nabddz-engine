// ===================================================================
// محرك "نبض الجزائر" - الإصدار 1.0
// استراتيجية الهيمنة على بلوجر
// ===================================================================

// --- إعدادات المحرك ---
const CONFIG = {
  // رابط الـ JSON feed الخاص بمدونتك. يمكنك تغيير عدد النتائج.
  blogFeedUrl: '/feeds/posts/default?alt=json-in-script&max-results=20',
  // معرّف الحاوية الرئيسية في الـ HTML
  appContainerId: 'nabd-dz-app'
};

// --- حالة التطبيق ---
let appState = {
  isLoading: true,
  posts: []
};

// --- الدالة الرئيسية لبدء التطبيق ---
function initNabdDzEngine() {
  console.log("محرك 'نبض الجزائر' يعمل... جاري استعادة السيطرة.");
  showLoading(); // عرض مؤشر التحميل
  loadBlogPosts();
}

// --- جلب بيانات المقالات من بلوجر ---
function loadBlogPosts() {
  console.log("المحرك: جاري جلب المقالات من بلوجر...");
  // نستخدم تقنية JSONP لتجاوز مشاكل CORS
  const script = document.createElement('script');
  script.src = CONFIG.blogFeedUrl + '&callback=renderBlogPosts';
  document.body.appendChild(script);
}

// --- عرض مؤشر التحميل ---
function showLoading() {
  const appContainer = document.getElementById(CONFIG.appContainerId);
  if (appContainer) {
    appContainer.innerHTML = `<div style="text-align:center; padding: 50px; font-size: 1.2rem; color: #006233;">جاري التحميل...</div>`;
  }
}

// --- دالة الاستدعاء (Callback) بعد استلام البيانات ---
function renderBlogPosts(data) {
  console.log("المحرك: تم استلام البيانات بنجاح!", data);
  
  // التحقق من وجود مقالات
  if (!data.feed || !data.feed.entry) {
    console.error("المحرك: لم يتم العثور على مقالات.");
    document.getElementById(CONFIG.appContainerId).innerHTML = "<p>عذراً، لم يتم العثور على محتوى.</p>";
    return;
  }

  // تحويل البيانات الخام إلى مصفوفة نظيفة من المقالات
  appState.posts = data.feed.entry.map(parsePostData);
  appState.isLoading = false;
  
  // بناء واجهة المستخدم وعرضها
  buildAndRenderUI(appState.posts);
}

// --- تحليل بيانات كل مقال واستخراج ما نحتاجه ---
function parsePostData(entry) {
  // البحث عن رابط المقال
  const link = entry.link.find(l => l.rel === 'alternate');
  // البحث عن صورة المقال (إن وجدت)
  let thumbnail = 'https://via.placeholder.com/400x250/006233/ffffff?text=نبض+الجزائر'; // صورة افتراضية
  if (entry.media$thumbnail) {
    thumbnail = entry.media$thumbnail.url.replace('s72-c', 's400-c');
  }
  
  return {
    title: entry.title.$t,
    url: link.href,
    contentSnippet: entry.content.$t.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
    thumbnail: thumbnail,
    publishedDate: new Date(entry.published.$t).toLocaleDateString('ar-DZ')
  };
}

// --- بناء كود HTML وعرضه في الصفحة ---
function buildAndRenderUI(posts) {
  console.log("المحرك: جاري بناء الواجهة الرسومية...");
  const appContainer = document.getElementById(CONFIG.appContainerId);
  if (!appContainer) return;

  // بناء هيكل الصفحة باستخدام Template Literals
  let html = `
    <header>
      <h1>مرحباً بك في نبض الجزائر</h1>
      <p>منصة ذكية تخدم الجزائر</p>
    </header>
    <main class="posts-grid">
  `;

  // إنشاء بطاقة لكل مقال
  posts.forEach(post => {
    html += `
      <article class='post-card'>
        <a href="${post.url}">
          <img src="${post.thumbnail}" alt="${post.title}" loading="lazy"/>
        </a>
        <div class='post-content'>
          <h2><a href="${post.url}">${post.title}</a></h2>
          <p>${post.contentSnippet}</p>
          <span class='post-date'>${post.publishedDate}</span>
        </div>
      </article>
    `;
  });

  html += `</main>`;
  
  // حقن الـ HTML الذي أنشأناه في الصفحة
  appContainer.innerHTML = html;
  console.log("المحرك: تم بناء الواجهة بنجاح. السيطرة الكاملة مكتسبة.");
}

// --- إطلاق الثورة عند تحميل الصفحة ---
document.addEventListener('DOMContentLoaded', initNabdDzEngine);
