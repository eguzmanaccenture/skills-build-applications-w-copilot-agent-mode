import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(buildApiUrl('leaderboard'));
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.results || [];
        setEntries(items);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading leaderboard…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <div className="list-group">
        {entries.map((entry) => (
          <div key={entry._id || entry.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>#{entry.rank}</strong>
              <div className="text-muted small">{entry.userId?.name || entry.userId || 'Unknown'}</div>
            </div>
            <span className="badge bg-primary rounded-pill">{entry.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
