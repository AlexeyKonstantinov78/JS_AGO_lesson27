const filterByType = (type, ...values) => values.filter(value => typeof value === type),  // функция фильтрует по типу пепременных из масс 


	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));    // создает экземпляр Array из div с классом dialog__response-block
		responseBlocksArray.forEach(block => block.style.display = 'none'); // перебор мсасива и присваивает значение display none исчезает из видимости как тотак 
	}, // метод убирает извидимости все блоки div с классом dialog__response-block

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	}, // метод принимает три параметра селектор , текст , селектор для текста. вызывает метод для скрытия div блоков с классом dialog__response-blockю. по поступившему селектору ищет элемент и прописывает ему стиль display block отражатся ввиде блока скореевсего элемент содержит текст не являясь блоком. Поусловаи поступил spanSelektor  элементу присваивается текст поступивший в параметр msgText    

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // задаются текст что отражать б блоке 

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),// задаются текст что отражать б блоке 

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),// задаются текст что отражать б блоке 

	tryFilterByType = (type, values) => {
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // в данном случае отрабатывает метод filter по типу данных 
			const alertMsg = (valuesArray.length) ?  
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg);    // по условиею если есть запись по фильтру  присваивается переменной текст который был введен в инпуты и от фильтрован, если фильтр не дал по условию передает что нет такого типа далее результат передается в метод.
		} catch (e) {
			showError(`Ошибка: ${e}`); // выдает ошибку когда он не понимает тип а это когда в пределах запятых или без запятых введено сразу несколько типов или string не взят в ковычки 
		}
	};

const filterButton = document.querySelector('#filter-btn'); //получаем переменную 

filterButton.addEventListener('click', e => { 
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');

	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // устонавливает уведомления для поля ввода
		showNoResults(); // сброс в начало
	} else {
		dataInput.setCustomValidity(''); // пустой диалог т.к. введенно значение
		e.preventDefault(); // отключаем стандартное поведение
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // отправляем в метод tryFilterByType
	}
});  // слушатель по слику  получает данные из инпутов проверяет на пустое поле  

