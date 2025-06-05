interface IHeadingProps {
  label: string;
}

const Heading: React.FC<IHeadingProps> = (props) => {
  const { label } = props;
  return <h3 className="heading">{label}</h3>;
};

export default Heading;
