// ===================================================================
// محرك "نبض الجزائر" - الإصدار 2.0 (التكامل الذكي)
// استراتيجية الهيمنة على بلوجر - الطرح الثاني
// ===================================================================

// --- إعدادات المحرك ---
const CONFIG = {
  // رابط الـ JSON feed الخاص بمدونتك.
  blogFeedUrl: '/feeds/posts/default?alt=json-in-script&max-results=20',
  // معرّف الحاوية التي سنحقن المحتوى فيها
  appContainerId: 'nabd-dz-app'
};

// --- الدالة الرئيسية لبدء التطبيق ---
function initNabdDzEngine() {
  console.log("محرك 'نبض الجزائر' v2.0 يعمل... جاري تحسين المحتوى.");
  loadBlogPosts();
}

// --- جلب بيانات المقالات من بلوجر ---
function loadBlogPosts() {
  console.log("المحرك: جاري جلب المقالات من بلوجر...");
  const script = document.createElement('script');
  script.src = CONFIG.blogFeedUrl + '&callback=renderBlogPosts';
  document.body.appendChild(script);
}

// --- دالة الاستدعاء (Callback) بعد استلام البيانات ---
function renderBlogPosts(data) {
  console.log("المحرك: تم استلام البيانات بنجاح!", data);
  
  const appContainer = document.getElementById(CONFIG.appContainerId);
  if (!appContainer) {
    console.error("المحرك: لم يتم العثور على الحاوية المستهدفة.");
    return;
  }

  if (!data.feed || !data.feed.entry) {
    appContainer.innerHTML = "<p>عذراً، لم يتم العثور على محتوى.</p>";
    return;
  }

  // تحويل البيانات الخام إلى مصفوفة نظيفة من المقالات
  const posts = data.feed.entry.map(parsePostData);
  
  // بناء واجهة المستخدم وعرضها
  buildAndRenderUI(posts);
}

// --- تحليل بيانات كل مقال واستخراج ما نحتاجه ---
function parsePostData(entry) {
  const link = entry.link.find(l => l.rel === 'alternate');
  let thumbnail = 'https://via.placeholder.com/400x250/006233/ffffff?text=نبض+الجزائر';
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
  console.log("المحرك: جاري بناء شبكة المقالات...");
  const appContainer = document.getElementById(CONFIG.appContainerId);
  
  let html = `<div class="posts-grid">`;

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

  html += `</div>`;
  
  appContainer.innerHTML = html;
  console.log("المحرك: تم تحديث شبكة المقالات بنجاح.");
}

// --- إطلاق المحرك عند تحميل الصفحة ---
document.addEventListener('DOMContentLoaded', initNabdDzEngine);
