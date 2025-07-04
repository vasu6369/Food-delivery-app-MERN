import React,{ useEffect } from 'react';
export default function Carousel() {

    useEffect(() => {
        const carousel = document.querySelector("#carouselExampleFade");
        if (carousel) {
            new window.bootstrap.Carousel(carousel, {
                interval: 1700,
                ride: "carousel", 
                pause: "false"
            });
        }
    }, []);
    
    return (
        <div className="container mt-5 pt-5">
            <div className="row">
                <div className="col-12">
                    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="2000">
                        <div className="carousel-caption text-start text-light" style={{ zIndex: "10" }}>
                            <h1 className="fw-bold fs-2" style={{ width: "50%" }}>
                                Delicious, cheesy, and served fresh to your doorstep. Order now!
                            </h1>
                            <p className="fs-5 d-none d-md-block" style={{ width: "60%", fontSize: "1.5rem" }}>
                                From your favorite comfort foods to fresh and healthy options, we’ve got something for everyone. With just a few clicks, your meal will be on its way. Quick, easy, and delicious — that’s our promise!
                            </p>
                        </div>
                        <div className="carousel-inner" id="carousel">
                            <div className="carousel-item active">
                                <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg" className="d-block w-100 rounded-4" style={{ height: "350px", objectFit: "cover", filter: "brightness(50%)", }} alt="Delicious Food" />
                            </div>
                            <div className="carousel-item">
                                <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" className="d-block w-100 rounded-4" style={{ height: "350px", objectFit: "cover", filter: "brightness(50%)", }} alt="Healthy Food" />
                            </div>
                            <div className="carousel-item">
                                <img src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg" className="d-block w-100 rounded-4" style={{ height: "350px", objectFit: "cover", filter: "brightness(50%)", }} alt="Fast Delivery" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon visually-hidden" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                            <span className="carousel-control-next-icon visually-hidden" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
