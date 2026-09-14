/**
 * زنجر كينج | Zinger King
 * ملف التحكم التفاعلي بقائمة الطعام (App.js)
 * إدارة مواعيد العمل، التصفية اللحظية، السلة، والطلب عبر واتساب بالجنيه المصري
 */

// إعدادات مواعيد العمل الرسمية لمطعم زنجر كينج
// المواعيد: يومياً من 11:00 صباحاً حتى 3:00 (ليلاً/فجراً أو عصراً)
const SCHEDULE_CONFIG = {
  openHour: 11,       // 11:00 صباحاً
  closeHour: 3,       // 3:00 (بعد منتصف الليل فجراً) - إذا أردت 3:00 عصراً فقط غيّرها إلى 15 واجعل isOvernight: false
  isOvernight: true   // تمتد ساعات العمل بعد منتصف الليل لتغطي السهرة حتى 3 فجراً
};

// بيانات منيو مطعم زنجر كينج (Zinger King) بالجنيه المصري
const menuData = [
  // 1. ساندوتشات الزنجر (Zinger Sandwiches)
  {
    id: "z1",
    name: "سوبر زنجر كينج الحار",
    nameEn: "Super Zinger King",
    category: "zinger",
    price: 95,
    calories: 780,
    prepTime: "10-12 دقيقة",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
    description: "قطعتان من صدور الدجاج المقرمشة بتتبيلة الزنجر الحارة الملكية، جبنة شيدر سائلة، كول سلو فريش، خس مقرمش، وصوص مايتي كينج في خبز بريوش فاخر.",
    tags: ["bestseller", "spicy"]
  },
  {
    id: "z2",
    name: "ساندوتش زنجر رانش كرانش",
    nameEn: "Zinger Ranch Crunch",
    category: "zinger",
    price: 105,
    calories: 740,
    prepTime: "10-12 دقيقة",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    description: "فيليه دجاج كريسبي مقرمش مع شرائح الرومي المدخن، صوص الرانش الغني، خيار مخلل، وجبنة شيدر ذائبة وخس طازج.",
    tags: ["bestseller"]
  },
  {
    id: "z3",
    name: "تاور زنجر العملاق",
    nameEn: "Giant Tower Zinger",
    category: "zinger",
    price: 120,
    calories: 890,
    prepTime: "12-15 دقيقة",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    description: "برج الزنجر الأسطوري: صدر دجاج زنجر مقرمش + قرص بطاطس هاش براون ذهبي مقرمش + شريحتا شيدر مع صوص المايونيز والفلفل الأسود.",
    tags: ["new"]
  },
  {
    id: "z4",
    name: "كلاسيك زنجر ساندوتش",
    nameEn: "Classic Zinger Sandwich",
    category: "zinger",
    price: 75,
    calories: 620,
    prepTime: "8-10 دقائق",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80",
    description: "الساندوتش الكلاسيكي المفضل: صدر دجاج زنجر متبل ومقلي بعناية حتى القرمشة الذهبية، مايونيز، خس طازج في خبز السمسم المحمص.",
    tags: ["bestseller"]
  },
  {
    id: "z5",
    name: "تشيزي زنجر لافا",
    nameEn: "Cheesy Zinger Lava",
    category: "zinger",
    price: 115,
    calories: 860,
    prepTime: "12 دقيقة",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80",
    description: "غرقان بصوص الجبنة الشيدر والموزاريلا السايحة مع قطعة زنجر كرانشي عملاقة وهالبينو حار وبصل مكرمل.",
    tags: ["spicy", "new"]
  },
  {
    id: "z6",
    name: "سموكي باربكيو زنجر",
    nameEn: "Smoky BBQ Zinger",
    category: "zinger",
    price: 110,
    calories: 790,
    prepTime: "10 دقائق",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80",
    description: "قطعة زنجر كريسبي مع صوص الباربكيو المدخن، حلقات بصل مقرمشة، شرائح بيف بيكون وجبنة شيدر أمريكية.",
    tags: []
  },

  // 2. وجبات الفرايد تشيكن والكومبو (Fried Chicken Meals)
  {
    id: "m1",
    name: "وجبة زنجر كينج بوكس (3 قطع)",
    nameEn: "Zinger King Box 3 Pcs",
    category: "meals",
    price: 165,
    calories: 980,
    prepTime: "12-15 دقيقة",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    description: "3 قطع دجاج بروستد ذهبي ومقرمش (عادي أو حار) + بطاطس مقلية + سلطة كول سلو + خبز طازج + صوص ثومية + كانز كولا.",
    tags: ["bestseller"]
  },
  {
    id: "m2",
    name: "باكت السعادة العائلي (9 قطع)",
    nameEn: "Family Bucket 9 Pcs",
    category: "meals",
    price: 340,
    calories: 2200,
    prepTime: "18-20 دقيقة",
    image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&w=800&q=80",
    description: "باكت التوفير العائلي: 9 قطع دجاج مقرمش طازج + بطاطس عائلية + 3 كول سلو كبير + 4 خبز + لتر بيبسي عائلي.",
    tags: ["family", "bestseller"]
  },
  {
    id: "m3",
    name: "وجبة دينر بوكس (4 قطع)",
    nameEn: "Dinner Box 4 Pcs",
    category: "meals",
    price: 195,
    calories: 1250,
    prepTime: "15 دقيقة",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=800&q=80",
    description: "4 قطع دجاج كرسبي شهية + بطاطس مقلية + كول سلو + خبز طازج + صوص شيدر + مشروب غازي.",
    tags: []
  },
  {
    id: "m4",
    name: "باكت الملوك التوفيري (12 قطعة)",
    nameEn: "Mega Kings Bucket 12 Pcs",
    category: "meals",
    price: 430,
    calories: 2900,
    prepTime: "20-25 دقيقة",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    description: "12 قطعة بروستد زنجر كينج المقرمشة + 2 بطاطس لارج + 4 كول سلو + 6 خبز + لتر ونص بيبسي + تشكيلة صوصات.",
    tags: ["family", "new"]
  },

  // 3. أطباق الريزو والمقبلات والبطاطس (Appetizers & Rizo)
  {
    id: "a1",
    name: "طبق ريزو زنجر كينج المقرمش",
    nameEn: "Crispy Zinger Rizo Bowl",
    category: "appetizers",
    price: 60,
    calories: 520,
    prepTime: "8 دقائق",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    description: "أرز ريزو مبهر ومطبوخ على طريقة زنجر كينج السرية، يعلوه قطع صدور الدجاج المقرمشة وصوص الريزو الحار والباربكيو.",
    tags: ["bestseller"]
  },
  {
    id: "a2",
    name: "بطاطس زنجر لودد بالجبنة",
    nameEn: "Loaded Zinger Fries",
    category: "appetizers",
    price: 65,
    calories: 680,
    prepTime: "8 دقائق",
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80",
    description: "طبق بطاطس مقلية مغطى بقطع الزنجر المقرمشة، شلال جبنة شيدر ذائبة، شرائح هالبينو حارة وصوص الرانش الخاص.",
    tags: ["spicy", "bestseller"]
  },
  {
    id: "a3",
    name: "أصابع تشيكن استربس (5 قطع)",
    nameEn: "Crispy Chicken Strips 5 pcs",
    category: "appetizers",
    price: 85,
    calories: 490,
    prepTime: "8-10 دقائق",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
    description: "5 أصابع استربس دجاج طازجة بدون عظم، مقرمشة جداً من الخارج وطرية من الداخل، تقدم مع صوص هوني ماسترد أو ثومية.",
    tags: ["bestseller"]
  },
  {
    id: "a4",
    name: "بطاطس مقلية كرانشي ذهبية",
    nameEn: "Golden French Fries",
    category: "appetizers",
    price: 30,
    calories: 380,
    prepTime: "5 دقائق",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
    description: "أصابع بطاطس مقلية ذهبية ومقرمشة ومتبلة بخلطة بهارات البطاطس الخاصة بزنجر كينج.",
    tags: []
  },
  {
    id: "a5",
    name: "سلطة كول سلو بالمايونيز",
    nameEn: "Creamy Coleslaw Cup",
    category: "appetizers",
    price: 25,
    calories: 190,
    prepTime: "دقيقتان",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    description: "كول سلو فريش ومحضرة يومياً من الكرنب والجزر الطازج مع دريسينج المايونيز الكريمي واللمسة الحلوة.",
    tags: []
  },

  // 4. المشروبات (Drinks)
  {
    id: "d1",
    name: "كانز صودا مثلج (بيبسي / كولا / سفن)",
    nameEn: "Cold Can Soda 330ml",
    category: "drinks",
    price: 18,
    calories: 140,
    prepTime: "دقيقة",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    description: "كانز صودا بارد ومنعش حسب اختيارك لتعزيز متعة القرمشة.",
    tags: ["bestseller"]
  },
  {
    id: "d2",
    name: "لتر بيبسي عائلي مثلج",
    nameEn: "Pepsi 1 Liter Family",
    category: "drinks",
    price: 25,
    calories: 420,
    prepTime: "دقيقة",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80",
    description: "زجاجة بيبسي حجم عائلي 1 لتر تكفي لمشاركة الوجبات العائلية.",
    tags: ["family"]
  },
  {
    id: "d3",
    name: "عصير برتقال طبيعي فريش",
    nameEn: "Fresh Orange Juice",
    category: "drinks",
    price: 25,
    calories: 120,
    prepTime: "3 دقائق",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
    description: "عصير برتقال طبيعي 100% بدون أي سكر مضاف، منعش وغني بالفيتامين.",
    tags: []
  },

  // 5. الحلويات (Desserts)
  {
    id: "ds1",
    name: "مولتن لافا كيك الشوكولاتة",
    nameEn: "Molten Lava Chocolate Cake",
    category: "desserts",
    price: 45,
    calories: 580,
    prepTime: "8 دقائق",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80",
    description: "كيكة شوكولاتة دافئة بحشوة الشوكولاتة الذائبة التي تتدفق فور فتحها، تقدم ساخنة وشهية.",
    tags: ["bestseller"]
  },
  {
    id: "ds2",
    name: "كوكيز الشوكولاتة الساخنة",
    nameEn: "Warm Chocolate Chip Cookie",
    category: "desserts",
    price: 35,
    calories: 440,
    prepTime: "5 دقائق",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    description: "قطعة كوكيز طازجة بحبيبات الشوكولاتة، مخبوزة حتى القوام المثالي المقرمش من الأطراف والهش من الداخل.",
    tags: []
  }
];

// حالة التطبيق (Application State)
const state = {
  currentCategory: "all",
  searchQuery: "",
  activeDietFilter: "all",
  sortBy: "default",
  cart: [], // عناصر السلة
  orderType: "delivery", // "delivery" أو "pickup"
  paymentMethod: "نقداً عند الاستلام",
  pickupTime: "خلال 20-30 دقيقة"
};

// عناصر واجهة المستخدم (DOM Elements)
const DOM = {
  header: document.getElementById("siteHeader"),
  productsGrid: document.getElementById("productsGrid"),
  emptyState: document.getElementById("emptyState"),
  resultsCountBadge: document.getElementById("resultsCountBadge"),
  currentSectionTitle: document.getElementById("currentSectionTitle"),
  categoryTabs: document.querySelectorAll(".category-tab"),
  dietPills: document.querySelectorAll(".diet-filter-pill"),
  searchInput: document.getElementById("menuSearchInput"),
  clearSearchBtn: document.getElementById("clearSearchBtn"),
  searchFocusBtn: document.getElementById("searchFocusBtn"),
  priceSortSelect: document.getElementById("priceSortSelect"),
  resetSearchBtn: document.getElementById("resetSearchBtn"),
  
  // عناصر حالة المطعم
  statusIndicator: document.getElementById("restaurantStatusIndicator"),
  statusDot: document.getElementById("statusDot"),
  statusText: document.getElementById("statusText"),
  footerStatusText: document.getElementById("footerStatusText"),
  
  // عناصر سلة الطلبات
  cartTriggerBtn: document.getElementById("cartTriggerBtn"),
  cartDrawer: document.getElementById("cartDrawer"),
  cartDrawerBackdrop: document.getElementById("cartDrawerBackdrop"),
  cartCloseBtn: document.getElementById("cartCloseBtn"),
  cartCountBadge: document.getElementById("cartCountBadge"),
  cartTotalPreview: document.getElementById("cartTotalPreview"),
  drawerItemsCount: document.getElementById("drawerItemsCount"),
  cartItemsList: document.getElementById("cartItemsList"),
  drawerSubtotal: document.getElementById("drawerSubtotal"),
  drawerGrandTotal: document.getElementById("drawerGrandTotal"),
  checkoutWhatsappBtn: document.getElementById("checkoutWhatsappBtn"),
  clearCartBtn: document.getElementById("clearCartBtn"),

  // عناصر نموذج استلام الطلب والدفع
  orderTypeBtns: document.querySelectorAll(".order-type-btn"),
  deliveryAddressBlock: document.getElementById("deliveryAddressBlock"),
  pickupTimeBlock: document.getElementById("pickupTimeBlock"),
  orderAddressInput: document.getElementById("orderAddressInput"),
  orderPickupTimeInput: document.getElementById("orderPickupTimeInput"),
  pickupChips: document.querySelectorAll(".pickup-chip"),
  paymentMethodBtns: document.querySelectorAll(".payment-method-btn"),
  orderCustomerNameInput: document.getElementById("orderCustomerNameInput"),
  
  // النافذة المنبثقة للتفاصيل
  quickViewModal: document.getElementById("quickViewModal"),
  modalCloseBtn: document.getElementById("modalCloseBtn"),
  modalContentBody: document.getElementById("modalContentBody"),

  // نافذة الاتصال الهاتفي
  callPopupBtn: document.getElementById("callPopupBtn"),
  phoneModal: document.getElementById("phoneModal"),
  phoneModalCloseBtn: document.getElementById("phoneModalCloseBtn"),

  // التنبيهات والصعود للأعلى
  toastContainer: document.getElementById("toastContainer"),
  scrollTopBtn: document.getElementById("scrollTopBtn")
};

// أسماء الفئات بالعربية
const categoryNames = {
  all: "جميع الأصناف",
  zinger: "ساندوتشات الزنجر",
  meals: "وجبات الفرايد تشيكن والكومبو",
  appetizers: "الريزو والمقبلات والبطاطس",
  drinks: "المشروبات والصودا",
  desserts: "الحلويات"
};

// ==========================================================================
// التهيئة وبدء التشغيل (Initialization)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  checkCustomLogo();
  updateRestaurantStatus();
  updateCategoryCounts();
  renderProducts();
  setupEventListeners();
  loadCartFromStorage();

  // فحص حالة المطعم تلقائياً كل دقيقة
  setInterval(updateRestaurantStatus, 60000);
});

// فحص وجود صورة لوجو مخصصة باسم logo.png أو images/logo.png
function checkCustomLogo() {
  const possiblePaths = ["images/logo.png", "logo.png", "images/logo.jpg", "logo.jpg"];
  possiblePaths.forEach(path => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      const container = document.getElementById("logoContainer");
      if (container) {
        container.innerHTML = `<img src="${path}" alt="زنجر كينج" style="width:100%;height:100%;object-fit:cover;">`;
      }
    };
  });
}

// ==========================================================================
// منطق ساعات العمل وحالة المطعم (من 11:00 صباحاً حتى 3:00)
// ==========================================================================
function isRestaurantCurrentlyOpen() {
  const now = new Date();
  const hour = now.getHours(); // 0 إلى 23

  if (SCHEDULE_CONFIG.isOvernight) {
    // مفتوح إذا كان الوقت بعد 11:00 صباحاً (11) حتى نهاية اليوم (23)، أو بعد منتصف الليل حتى ما قبل 3:00 (0, 1, 2)
    return (hour >= SCHEDULE_CONFIG.openHour || hour < SCHEDULE_CONFIG.closeHour);
  } else {
    // من 11:00 صباحاً حتى 3:00 مساءً (15:00)
    return (hour >= SCHEDULE_CONFIG.openHour && hour < SCHEDULE_CONFIG.closeHour);
  }
}

function updateRestaurantStatus() {
  const isOpen = isRestaurantCurrentlyOpen();

  if (isOpen) {
    if (DOM.statusIndicator) DOM.statusIndicator.classList.remove("closed");
    if (DOM.statusDot) DOM.statusDot.classList.remove("closed");
    if (DOM.statusText) DOM.statusText.textContent = "المطعم مفتوح الآن لاستقبال طلباتكم";
    if (DOM.footerStatusText) {
      DOM.footerStatusText.className = "footer-status-pill open";
      DOM.footerStatusText.textContent = "مفتوح الآن 🟢 (11 ص - 3 ص)";
    }
  } else {
    if (DOM.statusIndicator) DOM.statusIndicator.classList.add("closed");
    if (DOM.statusDot) DOM.statusDot.classList.add("closed");
    if (DOM.statusText) DOM.statusText.textContent = "المطعم مغلق الآن (مواعيد العمل: يومياً من 11 ص إلى 3 ص)";
    if (DOM.footerStatusText) {
      DOM.footerStatusText.className = "footer-status-pill closed";
      DOM.footerStatusText.textContent = "مغلق الآن 🔴 (نستقبلكم 11 ص)";
    }
  }
}

// تحديث عدادات الأصناف في شريط الفئات
function updateCategoryCounts() {
  const countAll = document.getElementById("count-all");
  if (countAll) countAll.textContent = menuData.length;

  ["zinger", "meals", "appetizers", "drinks", "desserts"].forEach(cat => {
    const el = document.getElementById(`count-${cat}`);
    if (el) {
      el.textContent = menuData.filter(item => item.category === cat).length;
    }
  });
}

// ==========================================================================
// منطق التصفية والفرز وعرض البطاقات (Filtering, Sorting & Rendering)
// ==========================================================================
function getFilteredAndSortedProducts() {
  let list = [...menuData];

  // 1. تصفية الفئة
  if (state.currentCategory !== "all") {
    list = list.filter(item => item.category === state.currentCategory);
  }

  // 2. تصفية الفلاتر السريعة (Dietary / Tags)
  if (state.activeDietFilter !== "all") {
    list = list.filter(item => item.tags && item.tags.includes(state.activeDietFilter));
  }

  // 3. تصفية البحث بالاسم أو الوصف
  if (state.searchQuery.trim() !== "") {
    const q = state.searchQuery.toLowerCase().trim();
    list = list.filter(item => 
      item.name.toLowerCase().includes(q) ||
      item.nameEn.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  }

  // 4. الفرز والترتيب
  switch (state.sortBy) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "name":
      list.sort((a, b) => a.name.localeCompare(b.name, "ar"));
      break;
    default:
      break;
  }

  return list;
}

// رسم بطاقات المنتجات
function renderProducts() {
  const products = getFilteredAndSortedProducts();
  DOM.productsGrid.innerHTML = "";

  DOM.resultsCountBadge.textContent = `عرض ${products.length} صنف`;
  DOM.currentSectionTitle.textContent = categoryNames[state.currentCategory] || "جميع الأصناف";

  if (products.length === 0) {
    DOM.emptyState.style.display = "block";
    return;
  } else {
    DOM.emptyState.style.display = "none";
  }

  const fragment = document.createDocumentFragment();

  products.forEach(item => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.setAttribute("data-id", item.id);

    // تجهيز شارات الحالة
    let badgesHtml = "";
    if (item.tags.includes("bestseller")) {
      badgesHtml += `<span class="badge-tag bestseller"><i class="fa-solid fa-star"></i> الأكثر طلباً</span>`;
    }
    if (item.tags.includes("spicy")) {
      badgesHtml += `<span class="badge-tag spicy"><i class="fa-solid fa-pepper-hot"></i> حار نار</span>`;
    }
    if (item.tags.includes("family")) {
      badgesHtml += `<span class="badge-tag family"><i class="fa-solid fa-users"></i> عائلي</span>`;
    }
    if (item.tags.includes("new")) {
      badgesHtml += `<span class="badge-tag new"><i class="fa-solid fa-sparkles"></i> جديد كينج</span>`;
    }

    card.innerHTML = `
      <div class="card-media-wrapper" onclick="openQuickView('${item.id}')">
        <img 
          src="${item.image}" 
          alt="${item.name}" 
          class="card-img" 
          loading="lazy" 
          onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'300\\' viewBox=\\'0 0 400 300\\'><rect fill=\\'%231a1a24\\' width=\\'400\\' height=\\'300\\'/><text fill=\\'%23ff5722\\' font-size=\\'22\\' font-family=\\'sans-serif\\' x=\\'50%\\' y=\\'50%\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'>👑 ${encodeURIComponent(item.name)}</text></svg>';"
        >
        <div class="card-badges">${badgesHtml}</div>
        <button class="quick-view-overlay-btn" aria-label="عرض تفاصيل الوجبة">
          <i class="fa-solid fa-eye"></i> تفاصيل سريعة
        </button>
      </div>
      
      <div class="card-content">
        <div class="card-title-row">
          <h4 class="meal-name">${item.name}</h4>
          <span class="meal-en-name">${item.nameEn}</span>
        </div>
        
        <p class="meal-description">${item.description}</p>
        
        <div class="card-meta-info">
          <span class="meta-item"><i class="fa-solid fa-fire text-accent"></i> ${item.calories} سعرة</span>
          <span class="meta-item"><i class="fa-regular fa-clock text-accent"></i> ${item.prepTime}</span>
        </div>

        <div class="card-footer">
          <div class="price-wrapper">
            <span class="price-label">السعر</span>
            <div class="price-value">
              ${item.price.toFixed(2)} <span class="currency">ج.م</span>
            </div>
          </div>
          <button class="add-to-cart-btn" onclick="addToCart('${item.id}', event)">
            <i class="fa-solid fa-plus"></i>
            <span>أضف للطلب</span>
          </button>
        </div>
      </div>
    `;

    fragment.appendChild(card);
  });

  DOM.productsGrid.appendChild(fragment);
}

// ==========================================================================
// إدارة سلة الطلبات (Cart Management)
// ==========================================================================
function addToCart(productId, event) {
  if (event) event.stopPropagation();

  const item = menuData.find(p => p.id === productId);
  if (!item) return;

  const existing = state.cart.find(c => c.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      ...item,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`تمت إضافة "${item.name}" إلى سلة طلباتك 🛍️`);
}

function updateCartItemQty(productId, change) {
  const index = state.cart.findIndex(c => c.id === productId);
  if (index === -1) return;

  state.cart[index].quantity += change;

  if (state.cart[index].quantity <= 0) {
    state.cart.splice(index, 1);
  }

  saveCartToStorage();
  updateCartUI();
}

function removeCartItem(productId) {
  state.cart = state.cart.filter(c => c.id !== productId);
  saveCartToStorage();
  updateCartUI();
  showToast("تم حذف الصنف من السلة", "info");
}

function clearCart() {
  if (state.cart.length === 0) return;
  state.cart = [];
  saveCartToStorage();
  updateCartUI();
  showToast("تم إفراغ سلة الطلبات");
}

function updateCartUI() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  DOM.cartCountBadge.textContent = totalCount;
  DOM.drawerItemsCount.textContent = `(${totalCount})`;
  DOM.cartTotalPreview.textContent = `${subtotal.toFixed(2)} ج.م`;
  DOM.drawerSubtotal.textContent = `${subtotal.toFixed(2)} ج.م`;
  DOM.drawerGrandTotal.textContent = `${subtotal.toFixed(2)} ج.م`;

  const checkoutForm = document.getElementById("cartCheckoutForm");

  if (state.cart.length === 0) {
    if (checkoutForm) checkoutForm.style.display = "none";
    DOM.cartItemsList.innerHTML = `
      <div class="cart-empty-msg">
        <i class="fa-solid fa-basket-shopping"></i>
        <p>سلة طلباتك فارغة حالياً</p>
        <small style="display:block; margin-top:0.4rem; color:var(--text-muted);">تصفح منيو زنجر كينج وأضف أشهى وجبات الدجاج المقرمش!</small>
      </div>
    `;
    DOM.checkoutWhatsappBtn.disabled = true;
    DOM.checkoutWhatsappBtn.style.opacity = "0.5";
    DOM.checkoutWhatsappBtn.style.cursor = "not-allowed";
  } else {
    if (checkoutForm) checkoutForm.style.display = "block";
    DOM.checkoutWhatsappBtn.disabled = false;
    DOM.checkoutWhatsappBtn.style.opacity = "1";
    DOM.checkoutWhatsappBtn.style.cursor = "pointer";

    DOM.cartItemsList.innerHTML = state.cart.map(item => `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
        <div class="cart-item-info">
          <h5 class="cart-item-name">${item.name}</h5>
          <span class="cart-item-price">${(item.price * item.quantity).toFixed(2)} ج.م</span>
        </div>
        <div class="cart-qty-ctrls">
          <button class="qty-btn" onclick="updateCartItemQty('${item.id}', -1)" aria-label="تقليل الكمية">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span class="qty-num">${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartItemQty('${item.id}', 1)" aria-label="زيادة الكمية">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <button class="cart-item-delete" onclick="removeCartItem('${item.id}')" aria-label="حذف الصنف">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `).join("");
  }
}

// حفظ واسترجاع السلة محلياً
function saveCartToStorage() {
  try {
    localStorage.setItem("zinger_king_cart", JSON.stringify(state.cart));
  } catch (e) {
    // LocalStorage fallback
  }
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("zinger_king_cart");
    if (saved) {
      state.cart = JSON.parse(saved);
      updateCartUI();
    }
  } catch (e) {
    state.cart = [];
  }
}

// فتح وإغلاق درج السلة
function toggleCartDrawer(open = true) {
  if (open) {
    DOM.cartDrawer.classList.add("active");
    DOM.cartDrawerBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  } else {
    DOM.cartDrawer.classList.remove("active");
    DOM.cartDrawerBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// الطلب المباشر عبر واتساب إلى الرقم: 01030104997
function handleWhatsappCheckout() {
  if (state.cart.length === 0) {
    showToast("سلة طلباتك فارغة! أضف وجباتك المفضلة أولاً 🍔", "info");
    return;
  }

  // 1. التحقق من العنوان في حالة الدليفري
  let address = "";
  if (state.orderType === "delivery") {
    address = DOM.orderAddressInput ? DOM.orderAddressInput.value.trim() : "";
    if (!address) {
      if (DOM.orderAddressInput) {
        DOM.orderAddressInput.classList.add("has-error");
        DOM.orderAddressInput.focus();
      }
      showToast("⚠️ برجاء كتابة عنوان التوصيل بالتفصيل لإرسال الطلب", "info");
      return;
    }
  }

  // 2. التحقق من ميعاد الاستلام في حالة الاستلام من المطعم
  let pickupTime = "";
  if (state.orderType === "pickup") {
    pickupTime = (DOM.orderPickupTimeInput && DOM.orderPickupTimeInput.value.trim()) 
      ? DOM.orderPickupTimeInput.value.trim() 
      : (state.pickupTime || "خلال 20-30 دقيقة");
  }

  // 3. اسم العميل (اختياري)
  const customerName = DOM.orderCustomerNameInput ? DOM.orderCustomerNameInput.value.trim() : "";

  // 4. توقيت إنشاء الطلب الحالي
  const now = new Date();
  const dateStr = now.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
  const timeStr = now.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit", hour12: true });
  const orderTimeFormatted = `${dateStr} (${timeStr})`;

  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // بناء نص رسالة واتساب المنسقة
  let msg = `👑 *طلب جديد من منيو مطعم زنجر كينج (Zinger King)*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🕒 *توقيت إنشاء الطلب:* ${orderTimeFormatted}\n`;
  if (customerName) {
    msg += `👤 *اسم العميل:* ${customerName}\n`;
  }
  
  if (state.orderType === "delivery") {
    msg += `🛵 *نوع الطلب:* دليفري (توصيل للمنزل)\n`;
    msg += `📍 *عنوان التوصيل:* ${address}\n`;
  } else {
    msg += `🛍️ *نوع الطلب:* استلام من المطعم (تيك أواي)\n`;
    msg += `⏰ *ميعاد الاستلام المتوقع:* ${pickupTime}\n`;
  }

  msg += `💳 *طريقة الدفع:* ${state.paymentMethod}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📋 *تفاصيل الوجبات والطلبات:*\n`;
  
  state.cart.forEach((item, idx) => {
    msg += `${idx + 1}. ${item.name} (${item.quantity}×) = ${(item.price * item.quantity).toFixed(2)} ج.م\n`;
  });

  msg += `━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *المبلغ الإجمالي:* ${total.toFixed(2)} جنيه مصري (ج.م)\n\n`;
  msg += `✨ *برجاء تأكيد استلام الطلب وبدء التجهيز. شكراً لاختياركم زنجر كينج!*`;

  const phone = "201030104997"; // رقم واتساب زنجر كينج بالصيغة الدولية
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  
  showToast("تم تجهيز تفاصيل طلبك وجارٍ فتح واتساب لتأكيده 🚀");
  window.open(url, "_blank");
}

// ==========================================================================
// نافذة تفاصيل المنتج (Quick View Modal)
// ==========================================================================
function openQuickView(productId) {
  const item = menuData.find(p => p.id === productId);
  if (!item) return;

  let tagsHtml = "";
  if (item.tags.includes("bestseller")) tagsHtml += `<span class="badge-tag bestseller"><i class="fa-solid fa-star"></i> الأكثر طلباً</span>`;
  if (item.tags.includes("spicy")) tagsHtml += `<span class="badge-tag spicy"><i class="fa-solid fa-pepper-hot"></i> حار نار</span>`;
  if (item.tags.includes("family")) tagsHtml += `<span class="badge-tag family"><i class="fa-solid fa-users"></i> عائلي</span>`;
  if (item.tags.includes("new")) tagsHtml += `<span class="badge-tag new"><i class="fa-solid fa-sparkles"></i> جديد كينج</span>`;

  DOM.modalContentBody.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="modal-food-img">
    <div class="modal-details">
      <div class="modal-header-row">
        <div>
          <h3 class="modal-food-title">${item.name}</h3>
          <span class="meal-en-name" style="font-size:0.85rem;">${item.nameEn}</span>
        </div>
        <div class="modal-food-price">${item.price.toFixed(2)} <span class="currency">ج.م</span></div>
      </div>
      
      <div class="modal-tags">${tagsHtml}</div>

      <h5 class="modal-desc-heading">المكونات وتفاصيل الوجبة:</h5>
      <p class="modal-food-desc">${item.description}</p>

      <div class="modal-nutrition-grid">
        <div class="nutri-item">
          <div class="nutri-label"><i class="fa-solid fa-fire text-accent"></i> السعرات</div>
          <div class="nutri-val">${item.calories} kcal</div>
        </div>
        <div class="nutri-item">
          <div class="nutri-label"><i class="fa-regular fa-clock text-accent"></i> مدة التجهيز</div>
          <div class="nutri-val">${item.prepTime}</div>
        </div>
        <div class="nutri-item">
          <div class="nutri-label"><i class="fa-solid fa-crown text-accent"></i> التتبيلة</div>
          <div class="nutri-val">ملكية خاصة</div>
        </div>
      </div>

      <div class="modal-actions-bar">
        <button class="modal-add-cart-btn" onclick="addToCart('${item.id}'); closeQuickView();">
          <i class="fa-solid fa-plus"></i> أضف هذا الصنف للطلب
        </button>
      </div>
    </div>
  `;

  DOM.quickViewModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeQuickView() {
  DOM.quickViewModal.classList.remove("active");
  document.body.style.overflow = "";
}

// ==========================================================================
// نافذة اختيار رقم الاتصال المباشر
// ==========================================================================
function togglePhoneModal(open = true) {
  if (!DOM.phoneModal) return;
  if (open) {
    DOM.phoneModal.classList.add("active");
    document.body.style.overflow = "hidden";
  } else {
    DOM.phoneModal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ==========================================================================
// رسائل التنبيه العائمة (Toast Notifications)
// ==========================================================================
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  const icon = type === "success" 
    ? '<i class="fa-solid fa-circle-check" style="color:var(--accent-green)"></i>' 
    : '<i class="fa-solid fa-circle-info" style="color:var(--primary)"></i>';

  toast.innerHTML = `${icon} <span>${message}</span>`;
  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-remove");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ==========================================================================
// إعداد مستمعي الأحداث (Event Listeners)
// ==========================================================================
function setupEventListeners() {
  // 1. التبديل بين الفئات
  DOM.categoryTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      DOM.categoryTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      state.currentCategory = tab.getAttribute("data-category");
      renderProducts();
      
      if (window.innerWidth <= 768) {
        tab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });
  });

  // 2. الفلاتر السريعة
  DOM.dietPills.forEach(pill => {
    pill.addEventListener("click", () => {
      DOM.dietPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.activeDietFilter = pill.getAttribute("data-filter");
      renderProducts();
    });
  });

  // 3. البحث الفوري
  DOM.searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    DOM.clearSearchBtn.style.display = state.searchQuery ? "flex" : "none";
    renderProducts();
  });

  DOM.clearSearchBtn.addEventListener("click", () => {
    DOM.searchInput.value = "";
    state.searchQuery = "";
    DOM.clearSearchBtn.style.display = "none";
    renderProducts();
    DOM.searchInput.focus();
  });

  DOM.searchFocusBtn.addEventListener("click", () => {
    DOM.searchInput.focus();
    DOM.searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // 4. الفرز حسب السعر والاسم
  DOM.priceSortSelect.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });

  // 5. زر إعادة ضبط البحث
  DOM.resetSearchBtn.addEventListener("click", () => {
    state.searchQuery = "";
    state.currentCategory = "all";
    state.activeDietFilter = "all";
    state.sortBy = "default";
    DOM.searchInput.value = "";
    DOM.clearSearchBtn.style.display = "none";
    DOM.priceSortSelect.value = "default";

    DOM.categoryTabs.forEach(t => t.classList.toggle("active", t.getAttribute("data-category") === "all"));
    DOM.dietPills.forEach(p => p.classList.toggle("active", p.getAttribute("data-filter") === "all"));

    renderProducts();
  });

  // 6. أحداث سلة الطلبات
  DOM.cartTriggerBtn.addEventListener("click", () => toggleCartDrawer(true));
  DOM.cartCloseBtn.addEventListener("click", () => toggleCartDrawer(false));
  DOM.cartDrawerBackdrop.addEventListener("click", () => toggleCartDrawer(false));
  DOM.clearCartBtn.addEventListener("click", clearCart);
  DOM.checkoutWhatsappBtn.addEventListener("click", handleWhatsappCheckout);

  // أحداث تحديد نوع الطلب (دليفري أو استلام من المطعم)
  if (DOM.orderTypeBtns) {
    DOM.orderTypeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        DOM.orderTypeBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.orderType = btn.getAttribute("data-type");

        if (state.orderType === "delivery") {
          if (DOM.deliveryAddressBlock) DOM.deliveryAddressBlock.style.display = "block";
          if (DOM.pickupTimeBlock) DOM.pickupTimeBlock.style.display = "none";
        } else {
          if (DOM.deliveryAddressBlock) DOM.deliveryAddressBlock.style.display = "none";
          if (DOM.pickupTimeBlock) DOM.pickupTimeBlock.style.display = "block";
        }
      });
    });
  }

  // أزرار أوقات الاستلام السريعة
  if (DOM.pickupChips) {
    DOM.pickupChips.forEach(chip => {
      chip.addEventListener("click", () => {
        DOM.pickupChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        const timeVal = chip.getAttribute("data-time");
        state.pickupTime = timeVal;
        if (DOM.orderPickupTimeInput) {
          DOM.orderPickupTimeInput.value = timeVal;
        }
      });
    });
  }

  if (DOM.orderPickupTimeInput) {
    DOM.orderPickupTimeInput.addEventListener("input", (e) => {
      state.pickupTime = e.target.value;
    });
  }

  // أزرار تحديد طريقة الدفع (كاش، فودافون كاش، انستا باي)
  if (DOM.paymentMethodBtns) {
    DOM.paymentMethodBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        DOM.paymentMethodBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.paymentMethod = btn.getAttribute("data-payment");
      });
    });
  }

  // إزالة إشارة الخطأ عند كتابة العنوان
  if (DOM.orderAddressInput) {
    DOM.orderAddressInput.addEventListener("input", () => {
      DOM.orderAddressInput.classList.remove("has-error");
    });
  }

  // 7. أحداث نافذة الاتصال
  if (DOM.callPopupBtn) {
    DOM.callPopupBtn.addEventListener("click", () => togglePhoneModal(true));
  }
  if (DOM.phoneModalCloseBtn) {
    DOM.phoneModalCloseBtn.addEventListener("click", () => togglePhoneModal(false));
  }
  if (DOM.phoneModal) {
    DOM.phoneModal.addEventListener("click", (e) => {
      if (e.target === DOM.phoneModal) togglePhoneModal(false);
    });
  }

  // 8. أحداث النافذة المنبثقة للوجبة
  DOM.modalCloseBtn.addEventListener("click", closeQuickView);
  DOM.quickViewModal.addEventListener("click", (e) => {
    if (e.target === DOM.quickViewModal) closeQuickView();
  });

  // 9. زر الصعود للأعلى وتأثير تمرير الهيدر
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 100) {
      DOM.header.classList.add("scrolled");
    } else {
      DOM.header.classList.remove("scrolled");
    }

    if (scrollPos > 400) {
      DOM.scrollTopBtn.classList.add("visible");
    } else {
      DOM.scrollTopBtn.classList.remove("visible");
    }
  });

  DOM.scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // إغلاق النوافذ عند الضغط على Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeQuickView();
      toggleCartDrawer(false);
      togglePhoneModal(false);
    }
  });
}
