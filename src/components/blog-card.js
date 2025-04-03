import { Link } from "react-router"
import "./blog-card.css"

export default function BlogCard({ title, img, link }) {
    return (
        <Link className="blog-card" to={link}>
            <img src={img} alt={title} />
            <div className="blog-card-cover" />
            <h2>{title}</h2>
        </Link>
    )
}
