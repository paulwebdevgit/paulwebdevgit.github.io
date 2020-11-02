'use strict'; // строгий мод

const cartButton = document.querySelector('#cart-button');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');

cartButton.addEventListener('click', ()=>{
    renderCart();
    toggleModal();
    
});
close.addEventListener('click', toggleModal);

function toggleModal() {
    modal.classList.toggle('is-open');
}

// day 1

const buttonForLogin = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');

const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const pass = document.querySelector('#password');

// day 2
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo')
const cardsMenu = document.querySelector('.cards-menu')

//day 3
const restaurantTitle = document.querySelector('.restaurant-title')
const rating = document.querySelector('.rating')
const price = document.querySelector('.price')
const category = document.querySelector('.category')

// day 4
const modalBody = document.querySelector('.modal-body')
const modalPrice = document.querySelector('.modal-pricetag')
const buttonClearCart = document.querySelector('.clear-cart');

let login = localStorage.getItem('savedLogin');

const cart = [];

/*--------------------------------------------------   Get Data  -------------------------------------------------------*/

// Получение данных из Json файла 
const getData = async function (url) {

    // Получаем Promise (обещание), есть 3 состояния, ждёт ответа, получила положительный ответ и отрицательный
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Fehler in der Adresse ${url}, Fehlercode: ${response.status}!`);
    }


    return await response.json();
};

const response_data = getData('./db/partners.json');

// превращаем Promise в обычный массив 
response_data.then(function (data) {
    // столько сколько элементов в массиве мы вызваем Функцию createCardRestorant
    // console.log(data);
    data.forEach(element => {
        createCardRestorant(element);
        // console.log(element);

    });
});

/*------------------------------------------------------------------------------------------------------------------------*/

function toggleModalAuth() {
    modalAuth.classList.toggle('is-open');
    loginInput.style.border = '';
    if (modalAuth.classList.contains('is-open')){
        disableScroll();
    }else{
        enableScroll();
    }
};

const validName = (name) => {
    const regName = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
    return regName.test(name)
    
}



function authorized() {
    

    function logOut() {
        login = '';
        localStorage.removeItem('savedLogin');
        checkAuth();

        buttonForLogin.style.display = '';
        userName.style.display = '';
        buttonOut.style.display = '';
        cartButton.style.display = ''

        buttonOut.removeEventListener('click', logOut);
    }

    console.log('Authorized');
    // oder innerHTML
    userName.textContent = login;
    buttonForLogin.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'flex';
    cartButton.style.display ='flex'
    buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {
    console.log('Not authorized'); // 4.

    function logIn(event) {
        event.preventDefault();
        // console.log('Login Action');
        
        loginInput.addEventListener('change', () =>{
            loginInput.style.border = '';
        })
        if (validName(loginInput.value.trim()) ){

            
            // console.log(login);
            
            login = loginInput.value; // 7. admin
            toggleModalAuth(); // закрывает форму
            localStorage.setItem('savedLogin', login);
            
            buttonForLogin.removeEventListener('click', toggleModalAuth);
            closeAuth.removeEventListener('click', toggleModalAuth);
            logInForm.removeEventListener('submit', logIn);
            logInForm.reset();
            checkAuth();
        } else {
            loginInput.style.border = '1.5px solid red';
            loginInput.value = '';
        }
    }

    buttonForLogin.addEventListener('click', toggleModalAuth); // 5.
    closeAuth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn); // 6.
    modalAuth.addEventListener('click', function(event){
        if(event.target.classList.contains('is-open')) {
            toggleModalAuth();
        }
    })
}

function checkAuth() {
    if (login) {
        // 2. первый раз он пустой => 3.
        authorized();
    } else {
        notAuthorized(); // 3.
    }
}
checkAuth(); // 1.


// day 2 

function createCardRestorant(restaurant) {

    const {image, name, time_of_delivery, stars, price, kitchen, products} = restaurant;
    
    const card = ` 
  <a class="card card-restaurant" data-products="${products}" data-info="${[name, stars, price, kitchen]}">
      <img src="${image}" alt="image" class="card-image" />
          <div class="card-text">
              <div class="card-heading">
                <h3 class="card-title">${name}</h3>
                <span class="card-tag tag">${time_of_delivery}</span>
              </div>
              <!-- /.card-heading -->
              <div class="card-info">
                <div class="rating">${stars}</div>
                <div class="price">Ab ${price} €</div>
                <div class="category">${kitchen}</div>
              </div>
              <!-- /.card-info -->
          </div>
        <!-- /.card-text -->
  </a>
<!-- /.card -->`
    // вставляем в блок cardsRestaurants наши карточки
    cardsRestaurants.insertAdjacentHTML('afterbegin', card);

};



function createCardGoods(goods) {
    // const card = document.createElement('div'); // можно article
    // добавляем класс card.className = 'card'
    // добавляем id card.id = id;

    // console.log(goods);
    const {name, description, price, image, id} = goods;

    // card.insertAdjacentHTML('afterbegin', ); можно и так, после запятой обратные ковычки
    const card = `
            <div class='card'>
            <img src="${image}" alt="image" class="card-image" />
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                <!-- /.card-heading -->
                <div class="card-info">
                    <div class="ingredients">
                    ${description}
                    </div>
                </div>
                <!-- /.card-info -->
                <div class="card-buttons">
                    <button class="button button-primary button-add-cart" id=${id}>
                        <span class="button-card-text">Bestellen</span>
                        <span class="button-cart-svg"></span>
                    </button>
                    <strong class="card-price card-price-bold">${price} €</strong>
                </div>
            </div>
            <!-- /.card-text -->
            </div>
     `
     

    cardsMenu.insertAdjacentHTML('beforeend', card)

}

// event создаётся во время того как происходит событие 
function openGoods(event) {
    // не важно куда мы нажмём по карточке, мы поднимимся до элемента .card-restaurant, если он есть.
    // это нужно потому что мы навесили обработчик события именно на cardsRestaurants
    const target = event.target; // элемент по которому мы нажимаем 
    const restaurant = target.closest('.card-restaurant'); // поднимается по дом дереву до того елемента который нам нужен
    // console.log(restaurant)

    if (restaurant) {

        cardsMenu.textContent = '';
        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');
        // console.log(restaurant.dataset.products)

        getData(`./db/${restaurant.dataset.products}`).then(function(data){
            data.forEach(goods => createCardGoods(goods));
        });
        
       const info = restaurant.dataset.info;
       const [name, stars, minPrice, description] = info.split(',');
       
       restaurantTitle.innerHTML = name;
       rating.innerHTML = stars;
       price.innerHTML = `Ab ${minPrice}€`;
       category.innerHTML = description;



        
        
    } else {
        toggleModalAuth();
    }


}

function addToCart(event){
    const target = event.target;
    console.log(target)
    const buttonAddToCart = target.closest('.button-add-cart');

    if (buttonAddToCart){
        const card = target.closest('.card');
        console.log(card);
        const title = card.querySelector('.card-title-reg').textContent;
        const cost = card.querySelector('.card-price').textContent;
        const id = buttonAddToCart.id;
        console.log(title,cost,id)

        const food = cart.find(function(item){
            return item.id === id;
        })

        if (food){
            food.count += 1;
        } else {
            cart.push({
                id: id,
                title: title,
                price: cost,
                count: 1
        })
    }
        console.log(cart)

    }
}

function renderCart(){
    modalBody.textContent = '';
    cart.forEach(function({id, title, price, count}){
        const itemCart = `
                <div class="food-row">
                <span class="food-name">${title}</span>
                <strong class="food-price">${price} €</strong>
                <div class="food-counter">
                    <button class="counter-button counter-minus" data-id=${id}>-</button>
                    <span class="counter">${count}</span>
                    <button class="counter-button counter-plus" data-id=${id}>+</button>
                </div>
            </div>
         `;

         modalBody.insertAdjacentHTML('afterbegin', itemCart);

    });

    const totalPrice = cart.reduce(function(result, item){
        return result + (parseFloat(item.price) * item.count);
    }, 0);

    modalPrice.textContent = totalPrice + '$';
}
function changeCount(event){
   const target = event.target;

   if(target.classList.contains('counter-button')){
        const food = cart.find((item) =>{
             return item.id === target.dataset.id;
        });
            if(target.classList.contains('counter-minus')){
                food.count--;
                if(food.count === 0){
                    cart.splice(cart.indexOf(food), 1);
                }
            }
            if(target.classList.contains('counter-plus')){
                food.count++;
            }
        renderCart();
   }

//    if(target.classList.contains('counter-minus')){
//        const food = cart.find((item) =>{
//             return item.id === target.dataset.id;
//        });
//        food.count--;
//        renderCart();
//    }
//    if(target.classList.contains('counter-plus')){
//     const food = cart.find((item) =>{
//          return item.id === target.dataset.id;
//     });
//     food.count++;
//     renderCart();
//     }

}

buttonClearCart.addEventListener('click', ()=>{
    cart.length = 0;
    renderCart();
})
modalBody.addEventListener('click', changeCount);

cardsMenu.addEventListener('click', addToCart);

cardsRestaurants.addEventListener('click', openGoods);
// по нажатию на лого мы скрываем меню нажатого ресторана и показываем все рестораны 
logo.addEventListener('click', () => {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
})

// new Swiper('.swiper-container', {
//     loop: true,
//     sliderPerView: 1,
// });