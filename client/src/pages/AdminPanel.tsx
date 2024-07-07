import '../styles/AdminPanel.css'

export default function AdminPanel() {
	return (
		<div className="admin-panel">
			<aside className="admin-sidebar">
				<h2>Admin Panel</h2>
				<ul className="admin-menu">
					<li>
						<a href="/admin/dashboard">Dashboard</a>
					</li>
					<li>
						<a href="/admin/products">Products</a>
					</li>
					<li>
						<a href="/admin/orders">Orders</a>
					</li>
					<li>
						<a href="/admin/customers">Customers</a>
					</li>
					<li>
						<a href="/admin/settings">Settings</a>
					</li>
				</ul>
			</aside>
			<main className="admin-content">
				<header className="admin-header">
					<h1>Welcome to Damztech Admin Panel</h1>
				</header>
				<div className="admin-main">
					<p>Content of the admin panel goes here.</p>
				</div>
			</main>
		</div>
	)
}
