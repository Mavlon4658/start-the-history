window.addEventListener("resize", function(){
    // fire when above 1203
    if (document.documentElement.clientWidth > 1200) {
      this.document.querySelector(".resident_photo").style.display = "block";
    }
    // fire when below 1203
    else {
        this.document.querySelector(".resident_photo").style.display = "none";
    }
}, true);

window.addEventListener('DOMContentLoaded', () => {

    if (document.documentElement.clientWidth > 1200) {
        this.document.querySelector(".resident_photo").style.display = "block";
      }
      // fire when below 1203
      else {
          this.document.querySelector(".resident_photo").style.display = "none";
      }

    const swiper = new Swiper('.reviews_swiper', {
        slidesPerView: 3,
        spaceBetween: 24,   // Space between slides
        pagination: {
            el: '.reviews_pagination',
            clickable: true,      // Allow users to click on bullets
        },
        navigation: {
            nextEl: '.reviews-next',
            prevEl: '.reviews-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1.1,
                spaceBetween: 16,
            },
            834: {
                slidesPerView: 3,
                spaceBetween: 16
            },
            1200: {
                spaceBetween: 24
            }
        }
    });

    const headerBars = document.querySelector('.header-bars');
    const headSection = document.querySelector('header.header');

    if (headerBars) {
        headerBars.onclick = () => {
            headSection.classList.toggle('active');
        }
    }

    window.addEventListener('click', function (event) {
        if (headerBars && !headSection.contains(event.target)) {
            headSection.classList.remove('active');
        }
    })

    const forSwp = new Swiper('.for-swiper', {
        slidesPerView: 1,
        spaceBetween: 16,
        breakpoints: {
            1200: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            832: {
                slidesPerView: 2,
                spaceBetween: 18,
            }
        }
    })

    const faqaccordion = document.querySelectorAll('.faq-accordion');

    if (faqaccordion.length) {
        faqaccordion.forEach((item) => {
            const accBtn = item.querySelector('.faq-accordion__btn');
            const accBody = item.querySelector('.faq-accordion__body');

            if (item.classList.contains('active')) {
                accBody.style.maxHeight = accBody.scrollHeight + 'px';
            }
    
            accBtn.addEventListener('click', () => {
                item.classList.toggle('active');
                accBody.style.maxHeight = accBody.style.maxHeight ? null : accBody.scrollHeight + 'px';
            });
        });
    }

    // modal
    const openModalPro = document.getElementById('openModalPro');
    const closeModal = document.getElementById('closeModalPro');
    const modalOverlay = document.getElementById('modalOverlayPro');
    // lite
    const openModalLite = document.getElementById('openModalLite');
    const closeModalLite = document.getElementById('closeModalLite');
    const modalOverlayLite = document.getElementById('modalOverlayLite');
    // premium
    const openModalPremium = document.getElementById('openModalPremium');
    const closeModalPremium = document.getElementById('closeModalPremium');
    const modalOverlayPremium = document.getElementById('modalOverlayPremium');

    function modal(openModal, closeModal, modalOverlay) {
        if (openModal) {
            openModal.addEventListener('click', (e) => {
                e.preventDefault();
                modalOverlay.classList.add('show');
            });
        }

        closeModal.addEventListener('click', () => {
            modalOverlay.classList.remove('show');
        });

        // Close modal if clicking outside of it
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('show');
            }
        });
    }

    modal(openModalPro, closeModal, modalOverlay);
    modal(openModalLite, closeModalLite, modalOverlayLite);
    modal(openModalPremium, closeModalPremium, modalOverlayPremium);

    if (window.innerWidth <= 832) {
        document.querySelector('.benefit_block').classList.add('swiper')
        document.querySelector('.benefit_row').classList.add('swiper-wrapper')
        const benefit_items = document.querySelectorAll('.benefit_item')
        benefit_items.forEach(item => {
            item.classList.add('swiper-slide')
        });


        const swiperBenefit = new Swiper('.benefit_block', {
            slidesPerView: 1.1,
            spaceBetween: 16,   // Space between slides
            pagination: {
                el: '.benefit-pagination',
                clickable: true,      // Allow users to click on bullets
            },

        });
    }
})

// Оплата

document.querySelectorAll(".modal_form").forEach(form => {
    form.addEventListener("submit", function(e) {
        e.preventDefault();    //stop form from submitting

        const formData = new FormData(e.target);

        const obj = Object.fromEntries(formData);
        const emailBuyer = obj.email,
              nameBuyer = obj.name,
              priceBuyer = parseInt(obj.price);

        console.log(emailBuyer, nameBuyer, priceBuyer)

        let receipt = {
          "Items": [//товарные позиции
              {
                  "label": "Резиденство Start The History", //наименование товара
                  "price": priceBuyer, //цена
                  "quantity": 1.00, //количество
                  "amount": priceBuyer, //сумма
                  "vat": 0, //ставка НДС
                  "method": 0, // тег-1214 признак способа расчета - признак способа расчета
                  "object": 0, // тег-1212 признак предмета расчета - признак предмета товара, работы, услуги, платежа, выплаты, иного предмета расчета
                  "measurementUnit": "шт" //единица измерения
              }
          ],
          "calculationPlace": "www.sth-res.ru", //место осуществления расчёта, по умолчанию берется значение из кассы
          "taxationSystem": 1, //система налогообложения; необязательный, если у вас одна система налогообложения
          "email": emailBuyer, //e-mail покупателя, если нужно отправить письмо с чеком
          "phone": "", //телефон покупателя в любом формате, если нужно отправить сообщение со ссылкой на чек
          "isBso": false, //чек является бланком строгой отчётности
          "AgentSign": null, //признак агента, тег ОФД 1057
          "amounts":
          {
              "electronic": priceBuyer, // Сумма оплаты электронными деньгами
              "advancePayment": 0.00, // Сумма из предоплаты (зачетом аванса) (2 знака после запятой)
              "credit": 0.00, // Сумма постоплатой(в кредит) (2 знака после запятой)
              "provision": 0.00 // Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) (2 знака после запятой)
          }
        }

        this.pay = function () {
            var widget = new cp.CloudPayments();
               widget.pay('charge', // или 'charge'
                   { //options
                       publicId: 'pk_56a723bb8215060523c5e48fd40b5', //id из личного кабинета
                       description: 'Резиденство Start The History', //назначение
                       amount: priceBuyer, //сумма
                       currency: 'RUB', //валюта
                       accountId: emailBuyer, //идентификатор плательщика (необязательно)
                    //    invoiceId: '1234567', //номер заказа  (необязательно)
                       email: emailBuyer, //email плательщика (необязательно)
                       skin: "mini", //дизайн виджета (необязательно)
                    //    autoClose: 3, //время в секундах до авто-закрытия виджета (необязательный)
                       data: {
                            Name: nameBuyer,
                            "CloudPayments": {
                                "CustomerReceipt": receipt, //онлайн-чек
                            }
                       },
                       configuration: {
                           common: {
                               successRedirectUrl: "https://sth-res.ru/book/index.html", // адреса для перенаправления 
                               failRedirectUrl: "https://sth-res.ru/"        // при оплате по T-Pay
                           }
                       },
                    //    payer: { 
                    //        firstName: 'Тест',
                    //        lastName: 'Тестов',
                    //        middleName: 'Тестович',
                    //        birth: '1955-02-24',
                    //        address: 'тестовый проезд дом тест',
                    //        street: 'Lenina',
                    //        city: 'MO',
                    //        country: 'RU',
                    //        phone: '123',
                    //        postcode: '345'
                    //    }
                   },
                   {
                       onSuccess: function (options) { // success
                           window.location.href = "https://sth-res.ru/book/index.html";
                       },
                       onFail: function (reason, options) { // fail
                           window.location.href = "https://sth-res.ru/";
                       },
                       onComplete: function (paymentResult, options) { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
                           //например вызов вашей аналитики
                       }
                   }
               )
           };
        
        this.pay()
    });
})