import { useEffect, useMemo, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(buildApiUrl('users'));
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.results || [];
        setUsers(items);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const totalUsers = useMemo(() => users.length, [users]);

  if (loading) {
    return <p className="text-muted">Loading users…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Users</h2>
      <p className="text-muted">{totalUsers} registered athletes</p>
      <div className="list-group">
        {users.map((user) => (
          <div key={user._id || user.id} className="list-group-item">
            <div className="d-flex justify-content-between">
              <strong>{user.name}</strong>
              <span className="text-muted">{user.fitnessGoal}</span>
            </div>
            <div className="text-muted small">{user.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
