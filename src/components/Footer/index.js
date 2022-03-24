import "./style.css";

function Footer(props) {
    const {image, title, session} = props;

    return (
        <footer className="Footer">
            <div className="film-banner">
                <img src={image} alt={title} />
            </div>
            <div className="film-info">
                <h4>{title}</h4>
                <h4>{session}</h4>
            </div>
        </footer>
    )
}

export default Footer;