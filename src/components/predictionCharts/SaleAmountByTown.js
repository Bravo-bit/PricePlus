import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const SaleAmountByTown = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [town, setTown] = useState("");

  useEffect(() => {
    if (town !== "") {
      const fetchPredictions = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://127.0.0.1:5000/home?town=${town}`);
          // Round predicted_sale_amount in each prediction
          const roundedPredictions = response.data.map((prediction) => ({
            ...prediction,
            predicted_sale_amount: Math.round(prediction.predicted_sale_amount),
          }));
          setPredictions(roundedPredictions);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching predictions:", error);
          setLoading(false);
        }
      };
      fetchPredictions();
    }
  }, [town]);

  const handleSearch = (e) => {
    e.preventDefault();
    setTown(e.target.elements.town.value);
  };

  return (
    <div>
      <h1>Predicted Sale Amount By Town</h1>
      <form onSubmit={handleSearch}>
        <input type="text" name="town" placeholder="Enter town name" />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <LineChart
            width={1800}
            height={500}
            data={predictions}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="predicted_sale_amount"
              stroke="pink"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default SaleAmountByTown;
