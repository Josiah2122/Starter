export default function MyButton({ label, onClick, ...props }) {
  return (
    <button
      className="glowing-btn"
      onClick={onClick}
      {...props} // allows disabled, type, etc.
    >
      <span className="glowing-bg"></span>
      <span className="glowing-text">{label}</span>
    </button>
  );
}
