import { Link } from "react-router"
import "./blog-box.css"

export default function BlogBox({ title, img, children, hideHome }) {
    return (
        <div className="blog-box">
            {!hideHome && (
                <Link className="home-link" to="/">🏠 Home</Link>
            )}
            <h1>{title}</h1>
            {!!img && (<img src={img} alt={title} />)}
            {children}
        </div>
    )
}
