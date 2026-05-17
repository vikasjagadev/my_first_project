import fs from 'fs';

const categories = [
  "Electronics", "Fashion", "Groceries", "Mobiles", 
  "Laptops", "Home Appliances", "Beauty", "Sports"
];

const adjectives = ["Premium", "Smart", "Eco-friendly", "Ultra", "Wireless", "Advanced", "Classic", "Pro", "Max", "Lite"];
const nouns = {
  "Electronics": ["Headphones", "Camera", "Speaker", "Drone", "Watch", "Tablet"],
  "Fashion": ["Sneakers", "Jacket", "T-Shirt", "Jeans", "Backpack", "Sunglasses"],
  "Groceries": ["Coffee Beans", "Almonds", "Olive Oil", "Honey", "Protein Bar", "Green Tea"],
  "Mobiles": ["Smartphone", "Flip Phone", "Gamer Phone", "Camera Phone"],
  "Laptops": ["Gaming Laptop", "Ultrabook", "Creator Studio", "Workstation"],
  "Home Appliances": ["Vacuum", "Blender", "Air Purifier", "Microwave", "Coffee Maker"],
  "Beauty": ["Serum", "Moisturizer", "Perfume", "Lipstick", "Face Wash"],
  "Sports": ["Tennis Racket", "Yoga Mat", "Dumbbells", "Football", "Running Shoes"]
};

const images = {
  "Electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=80",
  "Fashion": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=80",
  "Groceries": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80",
  "Mobiles": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
  "Laptops": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80",
  "Home Appliances": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80",
  "Beauty": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80",
  "Sports": "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=80"
};

const products = [];

for (let i = 1; i <= 10000; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const nounList = nouns[category];
  const noun = nounList[Math.floor(Math.random() * nounList.length)];
  
  const price = Math.floor(Math.random() * 50000) + 500; 
  const discountPercent = Math.floor(Math.random() * 40) + 10; // 10% to 50% discount
  const discountedPrice = Math.floor(price * (1 - (discountPercent / 100)));
  const rewards = Math.floor(discountedPrice * 0.05); // 5% rewards
  
  products.push({
    id: i,
    name: `${adj} ${noun} ${i}`,
    category,
    price,
    discountedPrice,
    image: images[category],
    rewards
  });
}

fs.mkdirSync('./src/data', { recursive: true });
fs.writeFileSync('./src/data/products.json', JSON.stringify(products));
console.log('Successfully generated 10,000 products!');
