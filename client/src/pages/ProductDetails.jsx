import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../context/Context";
import StarRating from "../components/StarRating ";
import StarDisplay from "../components/StarDisplay ";

export default function ProductDetails() {
    const { id } = useParams();
    const {fooditems,addTocart,cartitems,removefromCart,clearItemFromCart,getreviewsbyid,addreview,} = useContext(StoreContext);

    const product = fooditems.find((item) => item._id.toString() === id);
    const incart = cartitems[id] > 0;

    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            const rev = await getreviewsbyid(id);
            if (rev) setReviews(rev);
        };
        fetchReviews();
    }, [id]);

    const averageRating =reviews.length > 0? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : null;

    const showDefaultRating = !averageRating || averageRating < 2.5;

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!rating || !comment) return alert("Please fill all fields");
        setLoading(true);
        const res = await addreview(id, rating, comment);
        if (res) {
            setReviews([...reviews, res]);
            setRating(0);
            setComment("");
        }
        setLoading(false);
    };

    return (
        <div className="container mt-5 pt-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card p-3 shadow rounded-4" style={{backgroundColor: "var(--bs-card-bg, var(--bs-body-bg))",color: "var(--bs-body-color)",transition: "background-color 0.3s ease",}}>
                        <img src={product.url} alt={product.name} className="img-fluid rounded-4" style={{ objectFit: "cover" }}/>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card p-4 shadow rounded-4 h-100" style={{backgroundColor: "var(--bs-card-bg, var(--bs-body-bg))",color: "var(--bs-body-color)",transition: "background-color 0.3s ease",}}>
                        <h2 className="fw-bold">{product.name}</h2>
                        <p className="text-success fw-semibold fs-4">₹ {product.price}</p>
                        <p className="text-muted">{product.description}</p>

                        <div className="mt-3">
                            <h5 className="fw-semibold">⭐ Average Customer Rating</h5>
                            <div className="card p-3 rounded-4 shadow-sm border-0" style={{backgroundColor: "var(--bs-body-bg)",color: "var(--bs-body-color)",}}>
                                {showDefaultRating ? (
                                    <p className="text-muted mb-0">
                                        Not enough reviews to display a reliable rating.
                                    </p>
                                ) : (
                                    <div className="d-flex align-items-center gap-2">
                                        <StarDisplay rating={parseFloat(averageRating)} />
                                        <span className="fw-bold">{averageRating} / 5</span>
                                        <small className="text-muted ms-auto">
                                            {reviews.length} review(s)
                                        </small>
                                    </div>
                                )}
                            </div>
                        </div>

                        {!incart ? (
                            <button className="btn btn-primary mt-4 px-4 py-2 rounded-pill shadow-sm" onClick={() => addTocart(product)}>
                                Add to Cart
                            </button>
                        ) : (
                            <div className="d-flex flex-wrap gap-3 align-items-center mt-4">
                                <div className="d-flex align-items-center gap-2">
                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => removefromCart(product)}>-</button>
                                    <span className="fw-bold fs-5"> {cartitems[product._id] || 0}
                                    </span>
                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => addTocart(product)}>+</button>
                                </div>
                                <button className="btn btn-danger btn-sm rounded-pill" onClick={() => clearItemFromCart(product)}>
                                    Remove From Cart
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-12 mt-5">
                    <h4 className="mb-3">⭐ Leave a Review</h4>
                    <div className="mb-3">
                        <StarRating rating={rating} setRating={setRating} />
                    </div>

                    <form onSubmit={onSubmit} className="bg-light bg-opacity-10 p-4 rounded shadow-sm" style={{backgroundColor: "var(--bs-card-bg, var(--bs-body-bg))",color: "var(--bs-body-color)",}}>
                        <div className="mb-3">
                            <label htmlFor="comment" className="form-label fw-semibold">
                                Your Comment
                            </label>
                            <textarea id="comment" className="form-control" value={comment} onChange={(e) => setComment(e.target.value)} rows={3} placeholder="Write your thoughts..."></textarea>
                        </div>
                        <button className="btn btn-success px-4" type="submit" disabled={loading}>
                            {loading ? "Submitting..." : "Submit Review"}
                        </button>
                    </form>
                </div>

                <div className="col-12 mt-5">
                    <h4 className="mb-3">🗣️ Customer Reviews</h4>
                    {reviews.length === 0 ? (
                        <p className="text-muted">No reviews yet. Be the first to write one!</p>
                    ) : (
                        reviews.map((review, index) => (
                            <div key={index} className="border p-3 mb-3 rounded shadow-sm" style={{backgroundColor: "var(--bs-card-bg, var(--bs-body-bg))",color: "var(--bs-body-color)",}}>
                                <div className="d-flex justify-content-between">
                                    <h6 className="fw-bold mb-1">👤 {review.username}</h6>
                                    <small className="text-muted">
                                        {new Date(review.createdAt).toLocaleString()}
                                    </small>
                                </div>
                                <div className="mb-2">
                                    <StarDisplay rating={review.rating} />
                                </div>
                                <p className="m-0">{review.comment}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
