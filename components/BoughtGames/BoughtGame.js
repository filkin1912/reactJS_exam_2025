export const BoughtGame = ({_id, title, imageUrl, category}) => {

    return (
        <div className="bought-game" style={{
            backgroundImage: `url(${imageUrl})`,
        }}>
            <div style={{
                position: 'absolute',
                bottom: '2px',
                left: '2px',
                padding: '10px',
                }}>
                <h2 style={{
                    color: 'white',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                }}>
                    {title}
                </h2>
                <h6 style={{
                    color: 'white',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                }}>
                    {category}
                </h6>
            </div>
        </div>
    );
}
