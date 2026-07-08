import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(buildApiUrl('workouts'));
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.results || [];
        setWorkouts(items);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading workouts…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Suggested workouts</h2>
      <div className="list-group">
        {workouts.map((workout) => (
          <div key={workout._id || workout.id} className="list-group-item">
            <div className="d-flex justify-content-between">
              <strong>{workout.title}</strong>
              <span className="text-muted">{workout.duration} min</span>
            </div>
            <div className="text-muted small">{workout.focus} • {workout.difficulty}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
