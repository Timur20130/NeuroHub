/* =========================
   NEUROHUB SCRIPT
========================= */

/* =========================
   PROFILE BUTTON
========================= */

function updateUserUI() {

    const userArea =
    document.getElementById(
    "userArea"
    );

    if(!userArea) return;

    const logged =
    localStorage.getItem(
    "isLoggedIn"
    );

    if(logged){

        userArea.innerHTML = `
        <a href="profile.html" class="btn">
            👤 Профиль
        </a>
        `;

    } else {

        userArea.innerHTML = `
        <a href="login.html" class="btn">
            Вход
        </a>
        `;

    }

}

/* =========================
   FAVORITES
========================= */

function getFavorites(){

    return JSON.parse(
        localStorage.getItem(
            "favorites"
        )
    ) || [];

}

function saveFavorites(data){

    localStorage.setItem(
        "favorites",
        JSON.stringify(data)
    );

}

function addFavorite(name){

    const favorites =
    getFavorites();

    if(
        favorites.includes(name)
    ){

        alert(
            "Уже в избранном"
        );

        return;
    }

    favorites.push(name);

    saveFavorites(
        favorites
    );

    alert(
        "Добавлено в избранное"
    );

}

function removeFavorite(name){

    let favorites =
    getFavorites();

    favorites =
    favorites.filter(
        item =>
        item !== name
    );

    saveFavorites(
        favorites
    );

    renderFavorites();

}

/* =========================
   FAVORITES PAGE
========================= */

function renderFavorites(){

    const container =
    document.getElementById(
    "favoritesContainer"
    );

    if(!container) return;

    const favorites =
    getFavorites();

    container.innerHTML = "";

    if(
        favorites.length === 0
    ){

        container.innerHTML =
        `
        <div class="tool-card">
            <h3>Избранное пусто</h3>
        </div>
        `;

        return;

    }

    favorites.forEach(item => {

        container.innerHTML += `
        <div class="tool-card">

            <h3>${item}</h3>

            <br>

            <button
            class="btn"
            onclick="removeFavorite('${item}')">

                Удалить

            </button>

        </div>
        `;

    });

}

/* =========================
   REGISTER
========================= */

function registerUser(){

    const username =
    document.getElementById(
    "username"
    )?.value;

    const password =
    document.getElementById(
    "password"
    )?.value;

    if(
        !username ||
        !password
    ){

        alert(
        "Заполните поля"
        );

        return;

    }

    localStorage.setItem(

        "user",

        JSON.stringify({

            username,
            password

        })

    );

    alert(
    "Регистрация завершена"
    );

    window.location =
    "login.html";

}

/* =========================
   LOGIN
========================= */

function loginUser(){

    const username =
    document.getElementById(
    "username"
    )?.value;

    const password =
    document.getElementById(
    "password"
    )?.value;

    const user =
    JSON.parse(

        localStorage.getItem(
        "user"
        )

    );

    if(!user){

        alert(
        "Пользователь не найден"
        );

        return;

    }

    if(

        username ===
        user.username

        &&

        password ===
        user.password

    ){

        localStorage.setItem(
        "isLoggedIn",
        "true"
        );

        window.location =
        "profile.html";

    }

    else{

        alert(
        "Неверный пароль"
        );

    }

}

/* =========================
   LOGOUT
========================= */

function logout(){

    localStorage.removeItem(
    "isLoggedIn"
    );

    window.location =
    "index.html";

}

/* =========================
   REVIEWS
========================= */

function addReview(){

    const reviewInput =
    document.getElementById(
    "reviewInput"
    );

    const reviewsContainer =
    document.getElementById(
    "reviewsContainer"
    );

    if(
        !reviewInput ||
        !reviewsContainer
    ) return;

    const text =
    reviewInput.value.trim();

    if(text === "")
    return;

    const reviews =
    JSON.parse(
    localStorage.getItem(
    "reviews"
    )) || [];

    reviews.push(text);

    localStorage.setItem(
    "reviews",
    JSON.stringify(reviews)
    );

    reviewInput.value = "";

    renderReviews();

}

function renderReviews(){

    const container =
    document.getElementById(
    "reviewsContainer"
    );

    if(!container) return;

    const reviews =
    JSON.parse(
    localStorage.getItem(
    "reviews"
    )) || [];

    container.innerHTML = "";

    reviews.forEach(review => {

        container.innerHTML += `
        <div class="tool-card">
            <p>${review}</p>
        </div>
        `;

    });

}

/* =========================
   START
========================= */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        updateUserUI();

        renderFavorites();

        renderReviews();

    }

);