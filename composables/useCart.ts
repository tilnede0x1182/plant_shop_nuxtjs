// # Importations

// # Données
const STORAGE_KEY = "cart";

// # Fonctions utilitaires
/**
  Lit le panier depuis localStorage.
  @return objet panier indexé par id
*/
export function loadCart(): Record<number, any> {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
	} catch {
		return {};
	}
}

/**
  Sauvegarde le panier et émet l'événement global.
  @cart panier à persister
*/
export function saveCart(cart: Record<number, any>): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
	window.dispatchEvent(new Event("cart-updated"));
	window.dispatchEvent(new Event("storage"));
}


/**
  Calcule le nombre total d'articles.
  @return total quantités
*/
export function computeCartCount(): number {
	const cart = loadCart();
	return Array.isArray(cart) ? cart.reduce((total, item) => total + (item?.quantity || 0), 0) : Object.values(cart).reduce((total: number, item: any) => total + (item?.quantity || 0), 0);
}

/**
  Affiche une alerte temporaire pour stock insuffisant
  @name nom de la plante
  @stock stock disponible
*/
export function showStockAlert(name: string, stock: number): void {
	// Créer l'élément d'alerte
	const alert = document.createElement("div");
	alert.className = "alert alert-warning fade position-absolute top-0 start-50 translate-middle-x mt-3 shadow";
	alert.role = "alert";
	alert.style.zIndex = "1055";
	alert.style.maxWidth = "600px";
	alert.style.pointerEvents = "none";

	// Contenu de l'alerte
	const text1 = document.createTextNode("Stock insuffisant pour cette plante (");
	const strong = document.createElement("strong");
	strong.textContent = name;
	const text2 = document.createTextNode(`), actuellement, il en reste ${stock}.`);

	alert.appendChild(text1);
	alert.appendChild(strong);
	alert.appendChild(text2);

	// Ajouter au DOM et animer
	document.body.appendChild(alert);
	setTimeout(() => alert.classList.add("show"), 10);
	setTimeout(() => {
		alert.classList.remove("show");
		alert.classList.add("fade");
		setTimeout(() => alert.remove(), 300);
	}, 3000);
}

// # Fonctions principales
/**
  Ajoute une plante au panier (ou incrémente sa quantité).
  @plant objet { id, name, price, stock }
*/
export function addToCart(plant: { id: number; name: string; price: number; stock?: number }): void {
	const cart = loadCart();
	const id = plant.id;
	const stock = plant.stock || 1;

	if (!cart[id]) {
		cart[id] = { id: plant.id, name: plant.name, price: plant.price, quantity: 0, stock };
	}

	// Vérifier le stock disponible
	if (cart[id].quantity >= stock) {
		showStockAlert(plant.name, stock);
		setTimeout(() => {
			cart[id].quantity = stock;
			saveCart(cart);
		}, 300);
	} else {
		cart[id].quantity++;
		saveCart(cart);
	}
}

/**
  Met à jour la quantité d'un article dans le panier
  @id ID de la plante
  @value nouvelle valeur de quantité
*/
export function updateCartItem(id: number, value: string): void {
  const qty = parseInt(value, 10);
  if (Number.isNaN(qty)) return;

  const cart = loadCart();
  if (!cart[id]) return;

  const input = document.querySelector(`input[data-cart-id='${id}']`) as HTMLInputElement | null;
  if (!input) return;

  const stock = parseInt(input.dataset.stock || "1", 10);
  const corrected = Math.min(Math.max(qty, 1), stock);

  cart[id].quantity = corrected;
  input.value = String(corrected);

  saveCart(cart);
}

/**
  Retire un article du panier.
  @id identifiant plante
*/
export function removeFromCart(id: number): void {
	const cart = loadCart();
	delete cart[id];
	saveCart(cart);
}

/**
  Retarde la mise à jour (debounce)
  @id ID de la plante
  @input élément input
*/
export function delayedUpdateCart(id: number, input: HTMLInputElement): void {
	clearTimeout((input as any)._t);
	(input as any)._t = setTimeout(() => updateCartItem(id, input.value), 300);
}
