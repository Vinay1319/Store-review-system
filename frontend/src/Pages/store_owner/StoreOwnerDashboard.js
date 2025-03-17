import React, { useEffect, useState } from "react";
import {
  fetchStoreDetails,
  fetchAverageRating,
  fetchStoreRatings,
} from "../../api/storeOwnerApi";
import { useSelector } from "react-redux";
import "./StoreOwnerDashboard.css";
const StoreOwnerDashboard = () => {
  const [store, setStore] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token } = useSelector((state) => state.auth);
  const userId = user?.id;

  useEffect(() => {
    const fetchData = async () => {
        try {
            if (!userId || !token) {
                setError("User not authenticated.");
                setLoading(false);
                return;
            }

            console.log("Store ID:", userId);

            const storeData = await fetchStoreDetails(userId);
            setStore(storeData);

            const avgRating = await fetchAverageRating();
            console.log("avgRating", avgRating);
            setAverageRating(avgRating?.averageRating || "No Ratings Yet");

            try {
                const storeRatings = await fetchStoreRatings(storeData.id);
                console.log("storeRatings", storeRatings);
                setRatings([...storeRatings]);
            } catch (ratingError) {
                console.warn("Failed to fetch ratings:", ratingError);
                setRatings([]); // Ensure ratings array is empty instead of throwing error
            }

            setLoading(false);
        } catch (err) {
            setError("Failed to fetch store details.");
            setLoading(false);
        }
    };

    fetchData();
}, []);


  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="dashboard-container">
      <div className="store-header">
        <h2>📊 Store Owner Dashboard</h2>
        {store && (
          <div className="store-stats">
            <div className="stat-card">
              <strong>🏪 Store Name</strong>
              <span>{store.name}</span>
            </div>
            <div className="stat-card">
              <strong>📍 Location</strong>
              <span>{store.address}</span>
            </div>
            <div className="stat-card">
              <strong>⭐ Average Rating</strong>
              <span>{averageRating}</span>
            </div>
          </div>
        )}
      </div>

      <div className="ratings-section">
        <h3>📝 Ratings Received</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>👤 User Name</th>
              <th>📧 Email</th>
              <th>⭐ Rating</th>
            </tr>
          </thead>
          <tbody>
            {ratings.length > 0 ? (
              ratings.map((rating, index) => (
                <tr key={rating.userId}>
                  <td>{index + 1}</td>
                  <td>{rating.name}</td>
                  <td>{rating.email}</td>
                  <td>{rating.rating}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No ratings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
