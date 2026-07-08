import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(buildApiUrl('activities'));
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.results || [];
        setActivities(items);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading activities…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Recent activities</h2>
      <div className="list-group">
        {activities.map((activity) => (
          <div key={activity._id || activity.id} className="list-group-item">
            <div className="d-flex justify-content-between">
              <strong>{activity.type}</strong>
              <span className="text-muted">{activity.duration} min</span>
            </div>
            <div className="text-muted small">Distance: {activity.distance || 0} km</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;
