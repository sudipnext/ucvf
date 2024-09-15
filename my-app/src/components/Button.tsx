const Button = (props) => {
  return (
    <button
      onClick={handleAddRow}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      + Add Row
    </button>
  );
};

export default Button;
