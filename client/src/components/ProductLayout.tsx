import React from 'react'
import '../styles/ProductLayout.css'

type Product = {
	id: string
	name: string
	price: number
	ImageURL: string
}

type ProductLayoutProps = {
	products: Product[]
}

const ProductLayout: React.FC<ProductLayoutProps> = ({ products }) => {
	const formatPrice = (price: number): string => {
		return `R${price.toLocaleString()}`
	}

	const sortProductsByPrice = () => {
		return products.sort((a, b) => a.price - b.price)
	}

	const sortedProducts = sortProductsByPrice()

	return (
		<div className="product-grid">
			{sortedProducts.map((product) => (
				<div key={product.id} className="product-card">
					<img
						src={product.ImageURL}
						alt={product.name}
						className="product-img"
					/>
					<div className="product-details">
						<h2>{product.name}</h2>
						<p>{formatPrice(product.price)}</p>
					</div>
					<div className="button-container">
						<button className="product-card-btn add-to-cart-btn">
							Add to Cart
						</button>
						<button className="product-card-btn buy-now-btn">Buy Now</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default ProductLayout
