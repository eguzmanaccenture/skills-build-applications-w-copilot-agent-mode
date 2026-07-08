import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(buildApiUrl('teams'));
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.results || [];
        setTeams(items);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading teams…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Teams</h2>
      <div className="list-group">
        {teams.map((team) => (
          <div key={team._id || team.id} className="list-group-item">
            <div className="d-flex justify-content-between">
              <strong>{team.name}</strong>
              <span className="text-muted">{team.sport}</span>
            </div>
            <div className="text-muted small">{team.members?.length || 0} members</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
