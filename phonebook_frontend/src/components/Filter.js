const Filter = ({ names, findNames }) => {
  return (
    <div>
      filter shown with: 
      <input
        type="text"
        placeholder="Search.."
        value={names}
        onChange={findNames}
      />
    </div>
  );
};

export default Filter;
