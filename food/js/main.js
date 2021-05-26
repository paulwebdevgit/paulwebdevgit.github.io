'use strict'; // строгий мод
console.dir(document.body)
    // window.scrollY = 500;

const cartButton = document.querySelector('#cart-button');
const counterProduct = document.querySelector(".counter-all")

const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
const returnButton = document.querySelector(".return")
const cardInfo = document.querySelector(".card-info");

cartButton.addEventListener('click', () => {
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
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

//day 3
const restaurantTitle = document.querySelector('.restaurant-title');
const rating = document.querySelector('.rating');
const price = document.querySelector('.price');
const category = document.querySelector('.category');

// day 4
const modalBody = document.querySelector('.modal-body');
const modalPrice = document.querySelector('.modal-pricetag');
const buttonClearCart = document.querySelector('.clear-cart');

// search
const inputSearch = document.querySelector('.input-search');
const liveSearch = document.querySelector('.input-address');


let login = localStorage.getItem('savedLogin');

const cart = [];

/*--------------------------------------------------   Get Data  -------------------------------------------------------*/

// Получение данных из Json файла 
const getData = async function(url) {

    // Получаем Promise (обещание), есть 3 состояния, ждёт ответа, получила положительный ответ и отрицательный
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Fehler in der Adresse ${url}, Fehlercode: ${response.status}!`);
    }


    return await response.json();
};

const response_data = getData('./db/partners.json');

// превращаем Promise в обычный массив 
response_data.then(function(data) {
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
    if (modalAuth.classList.contains('is-open')) {
        disableScroll();
    } else {
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
    cartButton.style.display = 'flex'
    buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {
    console.log('Not authorized'); // 4.

    function logIn(event) {
        event.preventDefault();
        // console.log('Login Action');

        loginInput.addEventListener('change', () => {
            loginInput.style.border = '';
        })
        if (validName(loginInput.value.trim())) {


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
            setTimeout(() => {
                loginInput.style.border = ""
            }, 1500)
            loginInput.value = '';
        }
    }

    buttonForLogin.addEventListener('click', toggleModalAuth); // 5.
    closeAuth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn); // 6.
    modalAuth.addEventListener('click', function(event) {
        if (event.target.classList.contains('is-open')) {
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

    const { image, name, time_of_delivery, stars, price, kitchen, products } = restaurant;

    const card = ` 
  <a class="card card-restaurant" data-products="${products}" data-info="${[name, stars, price, kitchen]}">
        <div class="img-wraper">
      <img src="${image}" alt="image" class="card-image" />
        </div>
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
    const { name, description, price, image, id } = goods;

    // card.insertAdjacentHTML('afterbegin', ); можно и так, после запятой обратные ковычки
    const card = `
            <div class='card'>
            <div class="img-wraper-food">
            <img src="${image}" alt="image" class="card-image" />
            </div>
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                <!-- /.card-heading -->
                <div class="card-info">
                    <div class="ingredients">
                    <p>${description}</p>
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


        getData(`./db/${restaurant.dataset.products}`).then(function(data) {
            data.forEach(goods => createCardGoods(goods));
        });

        cardsMenu.textContent = '';
        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');
        inputSearch.classList.add('hide');
        returnButton.classList.remove('hide')


        // console.log(restaurant.dataset.products)

        const info = restaurant.dataset.info;
        const [name, stars, minPrice, description] = info.split(',');

        restaurantTitle.innerHTML = name;
        rating.innerHTML = stars;
        price.innerHTML = `Ab ${minPrice}€`;
        category.innerHTML = description;





    } else {
        // toggleModalAuth();
    }


}
let b = 0;

function addToCart(event) {
    const target = event.target;
    // console.log(target)
    const buttonAddToCart = target.closest('.button-add-cart');

    if (buttonAddToCart) {
        const card = target.closest('.card');
        console.log(card);
        const title = card.querySelector('.card-title-reg').textContent;
        const cost = card.querySelector('.card-price').textContent;
        const id = buttonAddToCart.id;
        console.log(title, cost, id)

        const food = cart.find(function(item) {
            return item.id === id;
        })

        if (food) {
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
        b = cart.reduce((acc, number) => {
            return acc + number.count
        }, 0)
        console.log(b)
            // cartButton.setAttribute("data-count", b)
        if (b > 0) {
            counterProduct.classList.remove("hide")
            counterProduct.innerHTML = b;
        }


    }
}



function renderCart() {
    modalBody.textContent = '';

    cart.forEach(function({ id, title, price, count }) {
        const itemCart = `
                <div class="food-row">
                <span class="food-name">${title}</span>
                <strong class="food-price">${price} </strong>
                <div class="food-counter">
                    <button class="counter-button counter-minus" data-id=${id}>-</button>
                    <span class="counter">${count}</span>
                    <button class="counter-button counter-plus" data-id=${id}>+</button>
                </div>
            </div>
         `;

        modalBody.insertAdjacentHTML('afterbegin', itemCart);

    });

    const totalPrice = cart.reduce(function(result, item) {
        return result + (parseFloat(item.price) * item.count);
    }, 0);

    modalPrice.textContent = totalPrice + '$';

}

function changeCount(event) {
    const target = event.target;

    if (target.classList.contains('counter-button')) {
        const food = cart.find((item) => {
            return item.id === target.dataset.id;
        });
        if (target.classList.contains('counter-minus')) {
            food.count--;
            console.log(b)
            b--;
            if (b == 0) {
                counterProduct.classList.add("hide");
            } else {
                counterProduct.innerHTML = b;
            }
            if (food.count === 0) {
                cart.splice(cart.indexOf(food), 1);
            }

        }
        if (target.classList.contains('counter-plus')) {
            food.count++;
            b++;
            counterProduct.innerHTML = b;
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

buttonClearCart.addEventListener('click', () => {
    cart.length = 0;
    counterProduct.classList.add("hide");
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
    inputSearch.classList.remove('hide');
    returnButton.classList.add('hide');
})

returnButton.addEventListener("click", () => {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
    inputSearch.classList.remove('hide');
    returnButton.classList.add('hide');
})

//search
inputSearch.addEventListener("keypress", (e) => {
    if (e.charCode === 13) {
        const value = e.target.value.trim()


        if (!value) {
            e.target.style.borderColor = "red"
            setTimeout(() => {
                e.target.style.borderColor = ""
            }, 1500)
            return;
        }
        // if (value.length < 3) return;
        cardsMenu.textContent = '';
        // containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');
        restaurantTitle.innerHTML = "Suchergebnis";
        cardInfo.classList.add('hide');

        getData('./db/partners.json').then((data) => {
            const linkproducts = data.map(partners => {
                return partners.products;
            })
            return linkproducts
        }).then(linkproducts => {
            linkproducts.forEach((links) => {
                getData(`./db/${links}`).then((data) => {
                    // console.log(data)
                    const resultSearch = data.filter((product) => {
                        const name = product.name.toLowerCase()
                            //   console.log(name)
                        return name.includes(value.toLowerCase())
                    })

                    console.log(resultSearch)
                    resultSearch.forEach(goods => createCardGoods(goods))

                    window.moveTo(window.scrollX, window.scrollY);
                    // document.body.style.cssText = `
                    //  top: ${-window.scrollY}px;`;

                })
            })

        })




        inputSearch.value = "";
    }
})


//LiveSearch Restaurant

liveSearch.addEventListener("keyup", (e) => {

    const value = e.target.value

    console.dir(e)
        // if (!value) {
        //     e.target.style.borderColor = "red"
        //     setTimeout(() => {
        //         e.target.style.borderColor = ""
        //     }, 1500)
        //     return;
        // }

    // if (!/^[\w ]|[\b]$/.test(e.key) || !e.keyCode === 8) return;
    //     if (!(inputValue >= 65 && inputValue <= 123)
    //     && (inputValue != 32 && inputValue != 0)
    //     && (inputValue != 48 && inputValue != 8)
    //     && (inputValue != 9)){
    //         event.preventDefault(); 
    // }
    cardsRestaurants.textContent = '';


    getData('./db/partners.json').then((data) => {
        return data
    }).then((data) => {

        const resultRestSearch = data.filter((product) => {
            const name = product.name.toLowerCase()
            console.log(name)
            if (name.startsWith(value.toLowerCase())) {
                return name.includes(value.toLowerCase());
            }
        })
        console.log(resultRestSearch)
        resultRestSearch.forEach((rest) => {
            createCardRestorant(rest)
        })


    })

})

// new Swiper('.swiper-container', {
//     loop: true,
//     sliderPerView: 1,
// });