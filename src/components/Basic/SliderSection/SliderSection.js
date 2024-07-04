export const SliderSection = () => {
    return(
        <section className=" slider_section position-relative">
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                <li data-target="#carouselExampleIndicators" data-slide-to={2} />
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="img-box">
                          <img src="images/medicine.png" alt="" />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="detail-box">
                          <h1>
                            Welcome To Our <br />
                            <span>
                              Online Medicine
                            </span>
                          </h1>
                          <p>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                            alteration in some form, by injected humour, or randomised words which don't look even slightly
                            believable.
                          </p>
                          <div>
                            <a href>
                              Buy Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="img-box">
                          <img src="images/medicine.png" alt="" />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="detail-box">
                          <h1>
                            Welcome To Our <br />
                            <span>
                              Online Medicine
                            </span>
                          </h1>
                          <p>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                            alteration in some form, by injected humour, or randomised words which don't look even slightly
                            believable.
                          </p>
                          <div>
                            <a href>
                              Buy Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="img-box">
                          <img src="images/medicine.png" alt="" />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="detail-box">
                          <h1>
                            Welcome To Our <br />
                            <span>
                              Online Medicine
                            </span>
                          </h1>
                          <p>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                            alteration in some form, by injected humour, or randomised words which don't look even slightly
                            believable.
                          </p>
                          <div>
                            <a href>
                              Buy Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="sr-only">Next</span>
              </a>
            </div>
        </section>
    );
};