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
}

/**
  Calcule le nombre total d'articles.
  @return total quantités
*/
export function computeCartCount(): number {
	const cart = loadCart();
	return Array.isArray(cart) ? cart.reduce((total, item) => total + (item?.quantity || 0), 0) : Object.values(cart).reduce((total: number, item: any) => total + (item?.quantity || 0), 0);
}

// # Fonctions principales
/**
  Ajoute une plante au panier (ou incrémente sa quantité).
  @plant objet { id, name, price }
*/
export function addToCart(plant: { id: number; name: string; price: number }): void {
	const cart = loadCart();
	const id = plant.id;
	cart[id] = cart[id] ? { ...cart[id], quantity: cart[id].quantity + 1 } : { id: plant.id, name: plant.name, price: plant.price, quantity: 1 };
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
