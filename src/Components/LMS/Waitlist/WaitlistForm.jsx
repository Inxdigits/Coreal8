import React from "react";

const WaitlistForm = ({ form, handleChange, handleSubmit, loading, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="waitlist-inputs">
        <div className="waitlist-input-field">
          <label htmlFor="waitlist-email">Email Address</label>
          <input
            id="waitlist-email"
            type="email"
            name="email"
            placeholder="e.g johnDoe@email.com"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="waitlist-input-field">
          <label htmlFor="waitlist-name">Full Name</label>
          <input
            id="waitlist-name"
            type="text"
            name="name"
            placeholder="e.g John Doe"
            value={form.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="waitlist-submission">
        <button
          type="submit"
          className="waitlist-submit-btn"
          disabled={loading}
        >
          {loading ? "Joining..." : "Join the Waitlist"}
        </button>
        {error && <p className="waitlist-error">{error}</p>}
      </div>
    </form>
  );
};

export default WaitlistForm;
