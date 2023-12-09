import ShoppingCart from "./ShoppingCart";

export default function Header()
{
    return(
        <div>
            <ShoppingCart />

            <div style={{ "padding": "1rem", "display": "flex", "justify-content": "space-between" }}>
                <ul style={{ "display": "flex", "justify-content": "space-between" }}>
                    <li style={{ "margin-right": "1.5rem" }}>Welcome to our Online Store!</li>
                    <li style={{ "color": "red", "margin-right": "1.5rem" }}>Upload  Yor Product</li>
                    <li style={{ "color": "red" }}>Register as a Driver</li>
                </ul>
                <ul style={{ "display": "flex", "justify-content": "space-between" }}>
                    <li style={{ "color": "red", "margin-right": "1.5rem" }}>For Sale</li>
                    <li>United Kindom</li>
                </ul>
            </div>
            <div style={{ "padding-bottom": "1rem" }}>
                <h1 style={{ "font-size": "2rem" }}>VENSLE.COM</h1>
            </div>
            <ul style={ { "background": "black", "color": "white", "display": "flex", "margin-bottom": "1.5rem", "padding-top": "0.5rem", "padding-bottom": "0.5rem" } }>
                <li style={{ "margin-right": "2%" }}>All Categories</li>
                <li style={{ "margin-right": "2%" }}>Home Appliances</li>
                <li style={{ "margin-right": "2%" }}>Fashion</li>
                <li style={{ "margin-right": "2%" }}>Sporting Goods</li>
                <li style={{ "margin-right": "2%" }}>Computing</li>
                <li style={{ "margin-right": "2%" }}>Household</li>
                <li>Cleaning</li>
            </ul>

            <div style={{ "height": "60vh", "background-color": "grey" }}>

            </div>
        </div>
    )
}