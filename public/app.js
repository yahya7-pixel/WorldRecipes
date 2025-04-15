// استيراد التبعيات الضرورية
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "./services/firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function loadRecipes() {
  const recipesCol = collection(db, "recipes");
  const recipesSnapshot = await getDocs(recipesCol);
  const recipesList = recipesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  displayRecipes(recipesList);
}

function displayRecipes(recipes) {
  const recipeGrid = document.getElementById("recipeGrid");
  if (recipeGrid) {
    recipeGrid.innerHTML = ""; // تفريغ المحتوى الحالي
    recipes.forEach(recipe => {
      const card = document.createElement("div");
      card.classList.add("recipe-card");

      card.innerHTML = `
        <img src="${recipe.imageURL || 'images/sample-dish.jpg'}" alt="${recipe.name}">
        <div class="recipe-info">
          <h2>${recipe.name}</h2>
          <p>بواسطة: ${recipe.chef}</p>
        </div>
      `;
      // يمكن إضافة تفاعل النقر للذهاب إلى صفحة التفاصيل
      card.addEventListener("click", () => {
        // إعادة التوجيه مع معرف الوصفة
        window.location.href = `recipe.html?id=${recipe.id}`;
      });
      recipeGrid.appendChild(card);
    });
  }
}

// استدعاء تحميل الوصفات عند تحميل الصفحة (تأكد أن هذه الوظيفة تُستدعى في index.html)
loadRecipes();
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

