import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch user activity from the backend
    axios.get('http://localhost:5001/api/activity')
      .then((res) => setActivities(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Your Activity</h3>
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>{activity.activityType} at {new Date(activity.timestamp).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
