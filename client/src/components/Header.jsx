export default function Header(){
    let handleScrollProduct = () => {
        const balise = document.querySelector("#product");
        const position = balise.offsetTop;
        window.scrollTo({
            top: position,
            behavior: "smooth"
        });
    }
    return (
        <>
            <div className="background-bar shape shadow"></div>
            <header className="header">
                <div className="body-header">
                    <h1 className="title">SpaceZone, spécialisé dans la vente en ligne</h1>
                    <div className="best-seller">
                        <h2 className="title-best-seller">Meilleures ventes : Découvrez les produits les plus populaires parmi notre communauté de clients satisfaits.</h2>
                    </div>
                    <div className="arrow-box" onClick={handleScrollProduct}>
                        <svg className="arrow" width="50" height="50" fill="black" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 4v8h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1-1.414 0l-6.586-6.586A1 1 0 0 1 5.414 12H9V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v0Z"></path>
                        </svg>
                    </div>
                </div>
            </header>
        </>
    )
}