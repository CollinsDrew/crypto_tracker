const Chart = (props) => {
  const name = props.data.name;
  const price = props.data.price;

  return (
    <div>
      <h1>{name}</h1>
      <h2>{price}</h2>
    </div>
  );
};

export default Chart;
