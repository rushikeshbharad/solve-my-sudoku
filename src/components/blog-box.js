import { Link } from "react-router"
import "./blog-box.css"

export default function BlogBox({ title, hero, children, hideHome }) {
    return (
        <div className="blog-box">
            {!hideHome && (
                <Link className="home-link" to="/">🏠 Home</Link>
            )}
            <h1>{title}</h1>
            {!!hero && (<img src={hero} alt={title} />)}
            {children}
        </div>
    )
}
