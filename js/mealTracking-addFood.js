'use strict';

// #----------- DOM -----------#
const grid = document.querySelector('.grid');
const recentlyBtn = document.querySelector('.switch-tab-recently');
const favoriteBtn = document.querySelector('.switch-tab-favorite');
const allBtn = document.querySelector('.switch-tab-all');
const tabs = document.querySelectorAll('.tab');
const foodSearch = document.querySelector('.food-search-input');

// #----------- CONSTS -----------#
const FOOD_DATA_URL = './data/mealTracking/foods.json';
const DEFAULT_FOOD_IMAGE = './images/mealTracking/food-img/apple.png';

// #----------- FUNCTIONS -----------#
/**
 * *render all food cards in the grid
 * *@param {*} filterFn
 */
function renderFoods(filterFn = () => true) {
	grid.innerHTML = ''; // clear existing cards

	fetch(FOOD_DATA_URL)
		.then((res) => res.json())
		.then((data) => {
			data
				.filter(filterFn) // apply filter (for filtered rendering)
				.forEach((food) => {
					grid.insertAdjacentHTML(
						'beforeend',
						`<div class="card">
							<div class="title food-name">${food.name}</div>
							<div class="card-main-section">
								<img src="${food.image || DEFAULT_FOOD_IMAGE}" alt="${food.name}" class="food-img" />
								<div class="nutrition-fact">
									<div class="nutrition-fact-item">
                                        <span class="nutrition-fact-label">cals</span>
                                        <span class="nutrition-fact-val">${food.calories}</span>
                                    </div>
                                    <div class="nutrition-fact-item">
                                        <span class="nutrition-fact-label">carbs</span>
                                        <span class="nutrition-fact-val">${food.carbs}</span>
                                    </div>
                                    <div class="nutrition-fact-item">
                                        <span class="nutrition-fact-label">protein</span>
                                        <span class="nutrition-fact-val">${food.protein}</span>
                                    </div>
                                    <div class="nutrition-fact-item">
                                        <span class="nutrition-fact-label">fats</span>
                                        <span class="nutrition-fact-val">${food.fats}</span>
                                    </div>
								</div>
							</div>
							<button class="plus" title="Add">
								<span class="material-symbols-outlined">add</span>
							</button>
						</div>`
					);
				});
		})
		.catch((err) => console.error('Error loading foods:', err));
}

function removePreviousActive() {
	tabs.forEach((t) => t.classList.remove('active'));
}

// #----------- Events -----------#
allBtn.addEventListener('click', () => {
	// 1. remove "active" class for previous tab
	removePreviousActive();

	// 2. add .active for "recently" btn
	allBtn.classList.add('active');

	// 3. render food (with filter for recently label)
	renderFoods();
});

recentlyBtn.addEventListener('click', () => {
	// 1. remove "active" class for previous tab
	removePreviousActive();

	// 2. add .active for "recently" btn
	recentlyBtn.classList.add('active');

	// 3. render food (with filter for recently label)
	renderFoods((food) => food.label.includes('recently'));
});

favoriteBtn.addEventListener('click', () => {
	// 1. remove "active" class for previous tab
	removePreviousActive();

	// 2. add .active for "recently" btn
	favoriteBtn.classList.add('active');

	// 3. render food (with filter for recently label)
	renderFoods((food) => food.label.includes('favorite'));
});

foodSearch.addEventListener('keyup', (e) => {
	let currValue = e.target.value.toLowerCase();
	let foods = document.querySelectorAll('.food-name');

	foods.forEach((food) => {
		if (food.textContent.toLowerCase().includes(currValue)) {
			food.parentNode.style.display = 'block';
		} else {
			food.parentNode.style.display = 'none';
		}
	});
});

renderFoods(); // initial render, show all foods by default
