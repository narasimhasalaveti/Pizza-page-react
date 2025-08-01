import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import pizzaData from "./data.js";

function App() {
	return (
		<div className="container">
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

function Header() {
	return (
		<header className="header">
			<h1>Fast React Pizza Co.</h1>
		</header>
	);
}

function Menu() {
	const pizzas = pizzaData;
	return (
		<main className="menu">
			<h2>Our Menu</h2>
			{pizzas ? (
				<React.Fragment>
					<p>
						Authentic Italian cuisine. 6 creative pizzas to choose from. All
						from our stone oven, all organic, all delicious.
					</p>
					<ul className="pizzas">
						{pizzas.map((pizza) => (
							<Pizza pizzaObj={pizza} key={pizza.name} />
						))}
					</ul>
				</React.Fragment>
			) : (
				<h1>Sorry, we're still working on our menu. Please come back later!</h1>
			)}
			{/* <Pizza
				name="Pizza Spinaci"
				ingredients="Tomato, mozarella, spinach, and ricotta cheese"
				photoName="pizzas/spinaci.jpg"
				price={120}
			/>
			<Pizza
				name="Pizza Margherita"
				ingredients="Tomato and mozarella"
				photoName="pizzas/margherita.jpg"
				price={100}
			/> */}
		</main>
	);
}

// instead of passing as props, we are destructuring the pizza object
function Pizza({ pizzaObj }) {
	return (
		<li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
			<img src={pizzaObj.photoName} alt={pizzaObj.name} />
			<div>
				<h3>{pizzaObj.name}</h3>
				<p>{pizzaObj.ingredients}</p>
				<span>
					{pizzaObj?.soldOut ? "SOLD OUT" : "₹" + (pizzaObj.price + 9)}
				</span>
			</div>
		</li>
	);
}

function Footer() {
	const hour = new Date().getHours();
	const openHour = 12;
	const closedHour = 23;
	const isOpen = hour >= openHour && hour <= closedHour;

	return (
		<footer className="footer">
			{isOpen ? (
				<OrderOpens closedHour={closedHour} />
			) : (
				<OrderClosed openHour={openHour} closedHour={closedHour} />
			)}
		</footer>
	);
}

// Here we used props
function OrderOpens(props) {
	return (
		<div className="order">
			<p>
				We're open until {props.closedHour}:00. Come visit us or order online
			</p>
			<button className="btn">Order</button>
		</div>
	);
}

// instead of passing as props, we are destructuring the values
function OrderClosed({ openHour, closedHour }) {
	return (
		<div className="order">
			<p>
				We're happy to welcome you between {openHour}:00 and {closedHour}
				:00. Please come back later😊!
			</p>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
