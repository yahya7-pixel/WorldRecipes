// استيراد التبعيات الضرورية
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "./services/firebaseConfig";

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// إضافة تفاعل زر تسجيل الدخول في الصفحة الرئيسية
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
    window.location.href = "login.html";
  });
}

// إذا كنا في صفحة login.html، نعالج عملية تسجيل الدخول:
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // تسجيل الدخول بنجاح
        alert("تم تسجيل الدخول بنجاح!");
        // إعادة توجيه المستخدم إلى الصفحة الرئيسية أو لوحة التحكم
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert("فشل تسجيل الدخول: " + error.message);
      });
  });
}

