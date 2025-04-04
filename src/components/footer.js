import { useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import './footer.css'

export default function Footer() {
    const location = useLocation()

    useEffect(() => {
        window.scroll(0, 0)
    }, [location.pathname])

    return (
        <div className="footer">
            <Link
                to="/terms-of-use"
                className="link"
            >
                Terms of Use
            </Link>
            <Link
                to="/privacy-policy"
                className="link"
            >
                Privacy Policy
            </Link>
            <Link
                to="/about-us"
                className="link"
            >
                About Us
            </Link>
      </div>
    )
}
