// CustomToast.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function CustomToast(id) {
  const navigate = useNavigate();

  if (!visible) return null;

  const notify = () => {
    toast.custom((t) => (
      <div className="toast">
        <span>Done</span>
        <button onClick={() => navigate(`/c/${id}`)}>Go to Recipe</button>
      </div>
    ));
  };

  return notify();
};
