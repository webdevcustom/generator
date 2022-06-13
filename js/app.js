//Блок рандомизатора шаблонов 
function parseKeywords(string) {
	pattern = /\$\w+\$/g;
	keyword = string.match(pattern);
	if (keyword) {
		for (let i = keyword.length - 1; i >= 0; i--) {
			keyword[i] = keyword[i].replace(/\$/g, '');

		}
	}
	return keyword;
}

function replaceKeyword(source, keyword, variant) {
	return (source.replace('$' + keyword + '$', variant));
}

function bake(object) {
	let result = randomize(object['structure']);
	do {
		keywords = parseKeywords(result);
		if (keywords) {
			for (var i = keywords.length - 1; i >= 0; i--) {
				if (object.hasOwnProperty(keywords[i])) {
					result = replaceKeyword(result, keywords[i], randomize(object[keywords[i]]));
				}
			}
		}
		//result=prepOutput(result);
	} while (keywords);
	return result;
}

function randomize(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function send(text) {
	document.querySelector('.gen__text').innerHTML = text;
	// document.getElementById('source_here').textContent = text;
	// document.getElementById('source_here').height = document.getElementById('source_here').scrollHeight;
}


let makeWishBtn = document.querySelector('._make');
// let copyBtn = document.querySelector('._copy');
// let text = document.querySelector('.gen__text');

makeWishBtn.onclick = function () {
	makeArticle();
	makeWishBtn.classList.add('anim');
	setTimeout(function () {
		makeWishBtn.classList.remove('anim');
	}, 1000);
}

//Генератор

function makeArticle() {
	result = bake(congratulation);
	//logActivity(msg, 'Попытался сгенерить статью с подзагами');
	send(result);

}




// const makeBtn = document.getElementById('make');
const copyBtn = document.querySelector('._copy');
const makeBtn = document.querySelector('._copy');


copyBtn.addEventListener('click', function () {
	//нашли наш контейнер
	let ta = document.querySelector('.gen__text');
	//производим его выделение
	let range = document.createRange();
	range.selectNode(ta);
	window.getSelection().addRange(range);

	//пытаемся скопировать текст в буфер обмена
	try {
		document.execCommand('copy');
	} catch (err) {
		console.log('Can`t copy, boss');
	}
	//очистим выделение текста, чтобы пользователь "не парился"
	window.getSelection().removeAllRanges();
	copyBtn.classList.add('anim');
	setTimeout(function () {
		copyBtn.classList.remove('anim');
	}, 1000);
});
