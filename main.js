let products = [
	{
		title: 'Crew Nation Hoodie',
		img: 'src/CrewNationHoodie.webp',
		price: 65.99,
		priceDiscount: 65.99,
		rating: 4.78,
		availability: 'In stock',
		filters: ['Unisex', 'S', 'M', 'L', 'XL', 'XXL', 'Hoodies', 'Trench']
	},
	{
		title: 'Skeleton Green Crewneck',
		img: 'src/SkeletonGreenCrewneck.webp',
		price: 69.99,
		priceDiscount: 64.99,
		rating: 4.78,
		availability: 'In stock',
		filters: ['Unisex', 'S', 'M', 'L', 'XL', 'XXL', 'Tees', 'Clancy']
	},
	{
		title: 'Doubt T-Shirt',
		img: 'src/DoubtT-Shirt.webp',
		price: 45.99,
		priceDiscount: 45.99,
		rating: 4.99,
		availability: 'Pre-Order',
		filters: ['Unisex', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'Tees', 'Blurryface']
	},
	{
		title: 'Color Block Hoodie',
		img: 'src/ColorBlockHoodie.webp',
		price: 55.99,
		priceDiscount: 49.99,
		rating: 4.88,
		availability: 'In stock',
		filters: ['Unisex', 'S', 'M', 'L', 'Hoodies', 'Trench']
	},
	{
		title: 'Stage T-Shirt',
		img: 'src/StageT-Shirt.webp',
		price: 25.99,
		priceDiscount: 22.99,
		rating: 4.76,
		availability: 'Limited',
		filters: ['Unisex', 'M', 'L', 'Tees', 'Clancy']
	},
	{
		title: 'Vulture Trench Coat',
		img: 'src/VultureTrenchCoat.webp',
		price: 113.99,
		priceDiscount: 113.99,
		rating: 4.88,
		availability: 'In stock',
		filters: ['Unisex', 'S', 'M', 'L', 'XL', 'XXL', 'Outerwear', 'Trench']
	},
	{
		title: 'Vessel Logo T-Shirt',
		img: 'src/VesselLogoT-Shirt.webp',
		price: 27.99,
		priceDiscount: 27.99,
		rating: 4.66,
		availability: 'In stock',
		filters: ['Unisex', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'Tees', 'Vessel']
	},
	{
		title: 'Blurryface Keychain',
		img: 'src/BlurryfaceKeychain.webp',
		price: 24.99,
		priceDiscount: 24.99,
		rating: 5.00,
		availability: 'Pre-Order',
		filters: ['Unisex', 'Accessories', 'Blurryface']
	},
	{
		title: 'Saturday Hoodie',
		img: 'src/SaturdayHoodie.webp',
		price: 55.99,
		priceDiscount: 50.99,
		rating: 4.74,
		availability: 'Limited',
		filters: ['Unisex', 'S', 'Hoodies', 'SAI']
	},
];

let cartCount = 0;
let activeFilters = [];
let currentSearchQuery = '';

const filtersPanel = document.querySelector('.filters');
const mainElement = document.querySelector('main');
const searchPanel = document.querySelector('.search-panel');
const content = document.querySelector('.content');
const productsContainer = document.querySelector('.products');
const discount = document.querySelector('.discount');
const cartCountElement = document.querySelector('.cart-count');
const searchInput = document.querySelector('input[type="search"]');
const filterButton = document.querySelector('.search-panel__buttons-wrapper button:last-child');
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

document.addEventListener('DOMContentLoaded', function() {
	setupEventListeners();
	renderProducts(products);
	updateCartCount();
});

function setupEventListeners() {
	filterButton.addEventListener('click', showHideFilters);
	overlay.addEventListener('click', closeFilters);

	document.querySelectorAll('.filters__option').forEach(option => {
		option.addEventListener('click', handleFilterClick);
	});
	
	searchInput.addEventListener('input', handleSearch);
	
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape' && filtersPanel.classList.contains('active')) {
			closeFilters();
		}
	});
}

function showHideFilters() {
	if (filtersPanel.classList.contains('active')) {
		closeFilters();
	} else {
		openFilters();
	}
}

function openFilters() {
	filtersPanel.classList.add('active');
	mainElement.classList.add('filters-open');
	searchPanel.classList.add('filters-open');
	content.classList.add('filters-open');
	overlay.classList.add('active');
	filterButton.classList.add('active');
}

function closeFilters() {
	filtersPanel.classList.remove('active');
	mainElement.classList.remove('filters-open');
	searchPanel.classList.remove('filters-open');
	content.classList.remove('filters-open');
	overlay.classList.remove('active');
	filterButton.classList.remove('active');
}

function handleFilterClick(e) {
	const filterValue = e.target.textContent.trim();
	
	if (filterValue === 'All') {
		activeFilters = [];
		document.querySelectorAll('.filters__option').forEach(option => {
			option.classList.remove('active');
		});
		e.target.classList.add('active');
	} else {
		const allFilter = document.querySelector('.filters__option');
		allFilter.classList.remove('active');
		e.target.classList.toggle('active');
		
		if (activeFilters.includes(filterValue)) {
			activeFilters = activeFilters.filter(filter => filter !== filterValue);
		} else {
			activeFilters.push(filterValue);
		}
		
		if (activeFilters.length === 0) {
			allFilter.classList.add('active');
		}
	}
	
	filterAndRenderProducts();
}

function handleSearch(e) {
	currentSearchQuery = e.target.value.toLowerCase().trim();
	filterAndRenderProducts();
}

function filterAndRenderProducts() {
	let filteredProducts = products;
	
	if (currentSearchQuery) {
		filteredProducts = filteredProducts.filter(product =>
			product.title.toLowerCase().includes(currentSearchQuery)
		);
	}
	
	if (activeFilters.length > 0) {
		filteredProducts = filteredProducts.filter(product =>
			activeFilters.some(filter => product.filters.includes(filter))
		);
	}
	
	renderProducts(filteredProducts);
}

function renderProducts(productsToRender) {
	productsContainer.innerHTML = '';
	
	productsToRender.forEach(product => {
		const productCard = createProductCard(product);
		productsContainer.appendChild(productCard);
	});
}

function createProductCard(product) {
	const card = document.createElement('div');
	card.className = 'product-card';
	
	const discountPercentage = product.price !== product.priceDiscount 
		? Math.round(((product.price - product.priceDiscount) / product.price) * 100)
		: 0;

	if (discountPercentage > 0) {
		const discountText = `DISCOUNT -${discountPercentage}%`;

		card.innerHTML = `
		<div class="img-wrapper">
			<img src="${product.img}" alt="${product.title}">
			<span class="discount">${discountText}</span>
		</div>
		<h3 class="product-card__title">${product.title}</h3>
		<h3 class="product-card__price">$${product.priceDiscount.toFixed(2)}</h3>
		<div class="product-card__addit-info">
			<small class="product-card__rating">Rating: ${product.rating}</small>
			<small class="product-card__availability">${product.availability}</small>
		</div>
		<button class="product-card__buy">Buy</button>`;
	} else {
		card.innerHTML = `
		<div class="img-wrapper">
			<img src="${product.img}" alt="${product.title}">
		</div>
		<h3 class="product-card__title">${product.title}</h3>
		<h3 class="product-card__price">$${product.priceDiscount.toFixed(2)}</h3>
		<div class="product-card__addit-info">
			<small class="product-card__rating">Rating: ${product.rating}</small>
			<small class="product-card__availability">${product.availability}</small>
		</div>
		<button class="product-card__buy">Buy</button>`;
	}
	
	const buyButton = card.querySelector('.product-card__buy');
	buyButton.addEventListener('click', function() {
		addToCart();
	});
	
	return card;
}

function addToCart() {
	cartCount++;
	cartCountElement.textContent = cartCount;
}