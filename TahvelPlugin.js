// ==UserScript==
// @name         TahvelPlugin
// @namespace    http://tampermonkey.net/
// @version      0.0
// @description  Make interface convenient
// @author       NB&LB
// @match        https://tahvel.edu.ee/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Delay the execution to ensure all elements are loaded before processing
    setTimeout(() => {
        document.querySelector("#main-menu-button").click();

        // кнопка опозданий
        var button = document.querySelector('.home-absences-and-remarks-section-icon');
        button.click();


        // текст tunniplaan
        var tunniDiv = document.createElement('div');
        tunniDiv.textContent = 'TUNNIPLAAN';
        tunniDiv.classList.add('tunniplaan');
        var targetElement = document.querySelector('.home-data-section-tabs-header');
        targetElement.insertAdjacentElement('beforebegin', tunniDiv);


        // покраска дневника
        var rows = document.querySelectorAll('tr[ng-repeat-start="result in lastResults"]');
        rows.forEach(function(row) {
        var grade = parseInt(row.innerText.trim());
        if (grade <= 2) {
            row.style.backgroundColor = 'rgb(255, 64, 129, 0.2)';
        } else {
            row.style.backgroundColor = 'rgb(17,92,208, 0.2)';
        }
        });

        // удаляем красные сообщения
        var elementToRemove = document.querySelector('[ng-if="siteMessages.length > 0"]');
        if (elementToRemove) {
            console.log('Before removing element');
            elementToRemove.remove();
            console.log('After removing element');
        }


  // Сортировка по алфавиту от Эрвина

  const elements = document.querySelectorAll('.schoolTileFooter');
  const firstLetters = [];
        // '‌‌‎ ‎' emptycharacter.com
  const isNbsp = '‏';
  // Проходимся по каждому элементу
  elements.forEach(element => {
   // Находим элемент <span> внутри <figcaption>
   const spanElement = element.querySelector('figcaption > span');
   // Проверяем, существует ли элемент <span> и содержит ли текстовое содержимое

   if(spanElement && spanElement.textContent.trim().length > 0){
    // Получаем первую букву текстового содержимого
    const firstLetter = spanElement.textContent.trim().charAt(0).toUpperCase();
    // Добавляем первую букву в массив

    firstLetters.push(firstLetter);
    // Добавляем класс, соответствующий первой букве
    element.classList.add('firstLetterIs'+firstLetter);
 }
});

const spacedLetters = firstLetters.map((letter, index) => {
      if (index !== 0 && letter === firstLetters[index - 1]) {
          return isNbsp;
      }
      return letter;
        });

const menuContainer = document.createElement('div');
menuContainer.style.position = 'fixed';
menuContainer.style.top = '50%';
menuContainer.style.right = '0';
menuContainer.style.padding = '0';
menuContainer.style.textAlign = 'center';
menuContainer.style.transform = 'translateY(-50%)';
menuContainer.style.zIndex = 9999;

spacedLetters.forEach(letter => {
    const menuItem = document.createElement('div');
    menuItem.textContent = letter;
    menuItem.className = 'letters';

    if(letter == isNbsp){
        menuItem.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        menuItem.style.marginBottom = '0px';
        menuItem.style.height = '0';
    }

    menuItem.addEventListener('click', () => {
        const targetElement = document.querySelector('.firstLetterIs'+letter);
        const parentElement = targetElement.parentElement.parentElement.parentElement;

        if (targetElement) {
            // Прокрутка к элементу
            targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
            setTimeout(() => {
                parentElement.style.boxShadow = '0px 10px 20px 2px rgba(0, 0, 0, 0.25)'
                setTimeout(() => {
                    parentElement.style.boxShadow = ''
                }, 1000); // Через 1 секунду (1000 миллисекунд)
            }, 200); // Через 1 секунду (1000 миллисекунд)
        }
    });

    menuContainer.appendChild(menuItem);
});


document.body.appendChild(menuContainer);
const style = document.createElement('style');
style.innerHTML = `
        .fade-out {
            animation: fadeOut 1s ease;
        }

        .letters {
        font-family: cursive;
        margin-bottom: 5px;
        width: 7vh;
        height: 3.75vh;
        border-radius: 10px 0px 0px 10px;
        background-color: rgb(17,92,208, 0.75);
        color: white;
        cursor: pointer;
        }

        #main-wrapper {
            background-color: #0d47a1;
        }

        .tunniplaan {
        font-size: 1.25rem;
        font-weight: 700;
        color: rgb(63, 63, 63);
        padding: 10px 0px 10px 0px;
        text-align: center;
        }

        #site-sidenav, #site-sidenav-scroll-wrapper, #site-sidenav-wrapper {
            transition: max-width .2s cubic-bezier(.35,0,.25,1);
        }
`;

        document.head.appendChild(style);
    }, 2400);
})()
