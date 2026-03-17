// Etapa 1: Interfaces das Models Base

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
}

// Etapa 2: Usuários

enum Role {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER"
}

class User {
  id: number;
  username: string;
  email: string;
  role: Role;

  constructor(id: number, username: string, email: string, role: Role) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
  }
}

// Etapa 3: Carrinho

interface CartItem {
  product: Product;
  quantity: number;
}

class Cart {

  private items: CartItem[] = [];

  addItem(product: Product, quantity: number): void {

    const exists = this.items.some(item => item.product.id === product.id);

    if (exists) {
      this.items = this.items.map(item => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + quantity
          };
        }
        return item;
      });
    } else {
      this.items.push({ product, quantity });
    }

  }

  getTotalItems(): number {

    return this.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

  }

  getFinalPrice(): number {

    return this.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

  }

}


// Exemplo prático de uso

const category: Category = {
  id: 1,
  name: "Eletrônicos"
};

const product1: Product = {
  id: 1,
  name: "Mouse",
  price: 50,
  category
};

const product2: Product = {
  id: 2,
  name: "Teclado",
  price: 150,
  category
};

const cart = new Cart();

cart.addItem(product1, 2);
cart.addItem(product2, 1);
cart.addItem(product1, 1);

console.log("Total de itens:", cart.getTotalItems());
console.log("Preço final:", cart.getFinalPrice()); 