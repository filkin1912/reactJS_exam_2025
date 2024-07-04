export const Box = () => {
    return(
        <div className="box">
            <div className="btn_container">
                <a href>
                    Buy Now
                </a>
            </div>
            <div className="img-box">
                <img src="images/p-5.jpg" alt="" />
            </div>
            <div className="detail-box">
                <div className="star_container">
                    <i className="fa fa-star" aria-hidden="true" />
                    <i className="fa fa-star" aria-hidden="true" />
                    <i className="fa fa-star" aria-hidden="true" />
                    <i className="fa fa-star" aria-hidden="true" />
                    <i className="fa fa-star-o" aria-hidden="true" />
                </div>
                <div className="text">
                    <h6>Health</h6>
                    <h6 className="price">
                    <span>
                        $
                    </span>
                    30
                    </h6>
                </div>
            </div>
        </div>
    );
};