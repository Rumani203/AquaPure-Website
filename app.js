
    // Navigation
    function navigateTo(pageId) {
      const pages = document.querySelectorAll('.page-view');
      pages.forEach(p => p.classList.remove('active'));

      const targetPage = document.getElementById(`page-${pageId}`);
      if (targetPage) {
        targetPage.classList.add('active');
      }

      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Dynamic Bubbles
    const bubbleContainer = document.getElementById('bubbleContainer');
    for (let i = 0; i < 16; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      const size = Math.random() * 40 + 15;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDuration = `${Math.random() * 8 + 7}s`;
      bubble.style.animationDelay = `${Math.random() * 5}s`;
      bubbleContainer.appendChild(bubble);
    }

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    function toggleMobileMenu() {
      mobileMenu.classList.toggle('open');
    }
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Theme Toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      themeToggleBtn.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });

    // Accordion Toggle
    function toggleFaq(el) {
      const item = el.parentElement;
      const allFaqs = document.querySelectorAll('.faq-item');
      allFaqs.forEach(faq => {
        if (faq !== item) {
          faq.classList.remove('active');
        }
      });
      item.classList.toggle('active');
    }

    /* ================= UNIQUE ORDER ID GENERATION & TRACKING ================= */
    let currentActiveOrderId = localStorage.getItem('aquapure_last_order_id') || 'AQP-8492';

    function generateUniqueOrderId() {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const newId = `AQP-${randomNum}`;
      currentActiveOrderId = newId;
      localStorage.setItem('aquapure_last_order_id', newId);
      return newId;
    }

    function showOrderSuccessModal(orderId) {
      document.getElementById('generatedOrderIdDisplay').textContent = orderId;
      document.getElementById('orderSuccessModal').classList.add('active');
    }

    function closeOrderSuccessModal() {
      document.getElementById('orderSuccessModal').classList.remove('active');
    }

    function proceedToTrackFromModal() {
      closeOrderSuccessModal();
      navigateTo('track');
      document.getElementById('trackInput').value = currentActiveOrderId;
      trackOrder();
    }

    function trackOrder() {
      const input = document.getElementById('trackInput').value.trim();
      const resultBox = document.getElementById('trackResultBox');

      if (!input) {
        alert('Kripya apna Order ID (jaise AQP-8492) ya Mobile Number daalein!');
        return;
      }

      document.getElementById('trackDisplayId').textContent = input.toUpperCase();
      resultBox.style.display = 'block';
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /* ================= SMART CALLING & EMAIL WORKAROUNDS ================= */
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    function executeSmartCall(phoneNo) {
      if (isMobileDevice) {
        window.location.href = `tel:+91${phoneNo}`;
      } else {
        document.getElementById('smartCallModal').classList.add('active');
      }
    }

    function closeSmartCallModal() {
      document.getElementById('smartCallModal').classList.remove('active');
    }

    function copyContactNumber(num) {
      navigator.clipboard.writeText(`+91${num}`);
      alert(`+91 ${num} copied to clipboard! You can paste it into your phone or call app.`);
    }

    function executeSmartEmail(emailAddr) {
      const subject = encodeURIComponent("AquaPure Drinking Water Inquiry");
      const body = encodeURIComponent("Hello AquaPure team,\n\nI want to inquire about drinking water cans / subscription.");

      if (!isMobileDevice) {
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddr}&su=${subject}&body=${body}`;
        window.open(gmailUrl, '_blank');
      } else {
        window.location.href = `mailto:${emailAddr}?subject=${subject}&body=${body}`;
      }
    }

    function sendViaDirectWebEmail() {
      const name = document.getElementById('msgName').value.trim() || 'Customer';
      const phone = document.getElementById('msgPhone').value.trim() || 'N/A';
      const subject = encodeURIComponent(document.getElementById('msgSubject').value.trim() || 'AquaPure Water Query');
      const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\n\nMessage:\n${document.getElementById('msgBody').value.trim()}`);

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=rumanimahurkar668@gmail.com&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank');
    }

    function handleSendMessage(e) {
      e.preventDefault();
      const name = document.getElementById('msgName').value.trim();
      const phone = document.getElementById('msgPhone').value.trim();
      const subject = document.getElementById('msgSubject').value.trim() || 'General Inquiry';
      const body = document.getElementById('msgBody').value.trim();

      let text = `*NEW WEBSITE MESSAGE - AQUAPURE*%0A`;
      text += `---------------------------------%0A`;
      text += `*Sender Name:* ${name}%0A`;
      text += `*Phone / WhatsApp:* ${phone}%0A`;
      text += `*Subject:* ${subject}%0A`;
      text += `*Message:* ${body}%0A`;
      text += `---------------------------------%0A`;

      window.open(`https://wa.me/919201767987?text=${text}`, '_blank');
    }

    /* ================= LOGIN & LOGOUT STATE MANAGEMENT ================= */
    const authModal = document.getElementById('authModal');
    const openAuthModalBtn = document.getElementById('openAuthModalBtn');
    const userProfileBadge = document.getElementById('userProfileBadge');
    const loggedInUserName = document.getElementById('loggedInUserName');

    openAuthModalBtn.addEventListener('click', () => {
      authModal.classList.add('active');
    });

    function closeAuthModal() {
      authModal.classList.remove('active');
    }

    function checkLoginStatus() {
      const savedUser = localStorage.getItem('aquapure_user');
      if (savedUser) {
        const userObj = JSON.parse(savedUser);
        loggedInUserName.textContent = userObj.name || 'Customer';
        userProfileBadge.style.display = 'inline-flex';
        openAuthModalBtn.style.display = 'none';

        if (document.getElementById('orderCustName') && userObj.name) {
          document.getElementById('orderCustName').value = userObj.name;
        }
        if (document.getElementById('subName') && userObj.name) {
          document.getElementById('subName').value = userObj.name;
        }
      } else {
        userProfileBadge.style.display = 'none';
        openAuthModalBtn.style.display = 'inline-flex';
      }
    }

    function handleUserLogin(e) {
      e.preventDefault();
      const identifier = document.getElementById('loginUserIdentifier').value.trim();
      const userData = {
        name: identifier,
        role: 'customer',
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('aquapure_user', JSON.stringify(userData));
      alert(`Welcome ${identifier}! Your login info has been saved.`);
      closeAuthModal();
      checkLoginStatus();
    }

    function handleAdminLogin(e) {
      e.preventDefault();
      const adminId = document.getElementById('adminUserIdentifier').value.trim();
      const adminData = {
        name: `Admin (${adminId})`,
        role: 'admin',
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('aquapure_user', JSON.stringify(adminData));
      alert(`Admin Access Granted: ${adminId}`);
      closeAuthModal();
      checkLoginStatus();
    }

    function handleLogout() {
      const confirmLogout = confirm('Are you sure you want to logout? All saved session data will be deleted.');
      if (confirmLogout) {
        localStorage.removeItem('aquapure_user');
        cart = [];
        updateCartUI();
        
        const orderName = document.getElementById('orderCustName');
        const subName = document.getElementById('subName');
        if (orderName) orderName.value = '';
        if (subName) subName.value = '';

        checkLoginStatus();
        alert('You have successfully logged out.');
      }
    }

    // Cart System
    let cart = [];
    const cartDrawer = document.getElementById('cartDrawer');
    const openCartBtn = document.getElementById('openCartBtn');
    const cartCount = document.getElementById('cartCount');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalDisplay = document.getElementById('cartTotalDisplay');

    function toggleCart() {
      cartDrawer.classList.toggle('open');
    }
    openCartBtn.addEventListener('click', toggleCart);

    function addToCart(title, price) {
      const existing = cart.find(i => i.title === title);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ title, price, quantity: 1 });
      }
      updateCartUI();
      if (!cartDrawer.classList.contains('open')) {
        toggleCart();
      }
    }

    function changeQty(title, change) {
      const item = cart.find(i => i.title === title);
      if (!item) return;
      item.quantity += change;
      if (item.quantity <= 0) {
        cart = cart.filter(i => i.title !== title);
      }
      updateCartUI();
    }

    function updateCartUI() {
      cartItemsContainer.innerHTML = '';
      let total = 0;
      let count = 0;

      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="color: var(--text-muted); text-align:center; margin-top:3rem;">Your cart is empty.</p>';
      } else {
        cart.forEach(item => {
          total += item.price * item.quantity;
          count += item.quantity;

          const el = document.createElement('div');
          el.className = 'cart-item';
          el.innerHTML = `
            <div>
              <div style="font-weight: 600; font-size: 0.95rem;">${item.title}</div>
              <div style="color: var(--primary-color); font-size: 0.85rem;">₹${item.price} each</div>
            </div>
            <div class="cart-qty-ctrls">
              <button class="qty-btn" onclick="changeQty('${item.title}', -1)">-</button>
              <span style="font-weight: 600;">${item.quantity}</span>
              <button class="qty-btn" onclick="changeQty('${item.title}', 1)">+</button>
            </div>
          `;
          cartItemsContainer.appendChild(el);
        });
      }

      cartCount.textContent = count;
      cartTotalDisplay.textContent = `₹${total}`;
    }

    function checkoutWhatsApp() {
      if (cart.length === 0) {
        alert('Cart is empty. Please add items first!');
        return;
      }
      
      const newOrderId = generateUniqueOrderId();
      let text = `*AQUAPURE NEW ORDER [${newOrderId}]*%0A`;
      text += `---------------------------------%0A`;
      let total = 0;
      cart.forEach(item => {
        text += `• ${item.title} x ${item.quantity} = ₹${item.price * item.quantity}%0A`;
        total += item.price * item.quantity;
      });
      text += `---------------------------------%0A`;
      text += `*Total Amount:* ₹${total}%0A*Delivery City:* Nagpur%0A%0APlease confirm my order delivery!`;

      cart = [];
      updateCartUI();
      toggleCart();

      window.open(`https://wa.me/919201767987?text=${text}`, '_blank');
      showOrderSuccessModal(newOrderId);
    }

    function handleOrderSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('orderCustName').value;
      const phone = document.getElementById('orderCustPhone').value;
      const item = document.getElementById('orderSelectedItem').value;
      const qty = document.getElementById('orderQuantity').value;
      const address = document.getElementById('orderCustAddress').value;
      const slot = document.getElementById('orderCustSlot').value;
      const payment = document.getElementById('orderPaymentMode').value;

      const newOrderId = generateUniqueOrderId();

      let msg = `*NEW AQUAPURE ORDER [${newOrderId}]*%0A`;
      msg += `-----------------------------------%0A`;
      msg += `*Order ID:* ${newOrderId}%0A`;
      msg += `*Customer:* ${name}%0A`;
      msg += `*Contact:* ${phone}%0A`;
      msg += `*Item:* ${item}%0A`;
      msg += `*Quantity:* ${qty}%0A`;
      msg += `*Delivery Address:* ${address}%0A`;
      msg += `*Time Preference:* ${slot}%0A`;
      msg += `*Payment:* ${payment}%0A`;
      msg += `-----------------------------------%0A`;
      msg += `Please confirm my order delivery!`;

      window.open(`https://wa.me/919201767987?text=${msg}`, '_blank');
      showOrderSuccessModal(newOrderId);
    }

    let isYearly = false;
    function toggleBillingCycle() {
      isYearly = document.getElementById('billingToggle').checked;
      const monthlyLabel = document.getElementById('monthlyLabel');
      const yearlyLabel = document.getElementById('yearlyLabel');
      const cycleTexts = document.querySelectorAll('.cycle-text');

      if (isYearly) {
        monthlyLabel.style.color = 'var(--text-muted)';
        yearlyLabel.style.color = 'var(--primary-color)';
        document.getElementById('priceAlternate').textContent = '5,760';
        document.getElementById('priceFamily').textContent = '11,040';
        document.getElementById('priceCorporate').textContent = '21,120';
        cycleTexts.forEach(el => el.textContent = '/ year');
      } else {
        monthlyLabel.style.color = 'var(--primary-color)';
        yearlyLabel.style.color = 'var(--text-muted)';
        document.getElementById('priceAlternate').textContent = '600';
        document.getElementById('priceFamily').textContent = '1,150';
        document.getElementById('priceCorporate').textContent = '2,200';
        cycleTexts.forEach(el => el.textContent = '/ month');
      }
    }

    function selectPlanForBooking(planName, monthlyRate) {
      const cycle = isYearly ? 'Yearly' : 'Monthly';
      const finalPrice = isYearly ? (monthlyRate * 12 * 0.8) : monthlyRate;
      document.getElementById('subSelectedPlan').value = `${planName} (${cycle}) - ₹${finalPrice}`;
      
      const formBox = document.getElementById('subscriptionDetailsForm');
      formBox.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('subName').focus();
    }

    function handleSubscriptionSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('subName').value;
      const phone = document.getElementById('subPhone').value;
      const email = document.getElementById('subEmail').value || 'N/A';
      const plan = document.getElementById('subSelectedPlan').value;
      const address = document.getElementById('subAddress').value;
      const slot = document.getElementById('subSlot').value;
      const startDate = document.getElementById('subStartDate').value;

      const newSubId = generateUniqueOrderId();

      let msg = `*NEW AQUAPURE SUBSCRIPTION [${newSubId}]*%0A`;
      msg += `-----------------------------------%0A`;
      msg += `*Subscription ID:* ${newSubId}%0A`;
      msg += `*Customer:* ${name}%0A`;
      msg += `*Contact:* ${phone}%0A`;
      msg += `*Email:* ${email}%0A`;
      msg += `*Plan Selected:* ${plan}%0A`;
      msg += `*Delivery Address:* ${address}%0A`;
      msg += `*Preferred Time Slot:* ${slot}%0A`;
      msg += `*Starting From:* ${startDate}%0A`;
      msg += `-----------------------------------%0A`;
      msg += `Please confirm my subscription setup!`;

      window.open(`https://wa.me/919201767987?text=${msg}`, '_blank');
      showOrderSuccessModal(newSubId);
    }

    document.addEventListener("DOMContentLoaded", () => {
      const today = new Date().toISOString().split('T')[0];
      const dateInput = document.getElementById('subStartDate');
      if (dateInput) dateInput.value = today;

      checkLoginStatus();

      const lastId = localStorage.getItem('aquapure_last_order_id');
      if (lastId && document.getElementById('trackInput')) {
        document.getElementById('trackInput').placeholder = `e.g. ${lastId} or Mobile No.`;
      }
    });

    function switchAuthTab(type) {
      const tabUser = document.getElementById('tabUser');
      const tabAdmin = document.getElementById('tabAdmin');
      const userAuthForm = document.getElementById('userAuthForm');
      const adminAuthForm = document.getElementById('adminAuthForm');

      if (type === 'user') {
        tabUser.classList.add('active');
        tabAdmin.classList.remove('active');
        userAuthForm.style.display = 'block';
        adminAuthForm.style.display = 'none';
      } else {
        tabAdmin.classList.add('active');
        tabUser.classList.remove('active');
        adminAuthForm.style.display = 'block';
        userAuthForm.style.display = 'none';
      }
    }
