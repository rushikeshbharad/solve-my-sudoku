import "./blog-card.css"

export default function BlogCard({ title, img, link }) {
    return (
        <a className="blog-card" href={link}>
            <img src={img} alt={title} />
            <div className="blog-card-cover" />
            <h2>{title}</h2>
        </a>
    )
}
