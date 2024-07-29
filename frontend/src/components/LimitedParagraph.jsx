const LimitedParagraph = ({ text, limit }) => {
  const limitedText = text.length > limit ? `${text.substring(0, limit)}...` : text;
  return <p className="card-text">{limitedText}</p>;
};

export default LimitedParagraph;
