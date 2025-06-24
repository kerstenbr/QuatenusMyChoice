const FaqAccordion = ({ faq }) => {
  return (
    <div className="faq-container">
      <div className="accordion mb-2 shadow shadow-sm" id={`accordion-${faq._id}`}>
        <div className="accordion-item">
          <h2 className="accordion-header" id={`heading-${faq._id}`}>
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${faq._id}`}
              aria-expanded="false"
              aria-controls={`${faq._id}`}>
              {faq.question}
            </button>
          </h2>
          <div id={`${faq._id}`} className="accordion-collapse collapse" aria-labelledby={`heading-${faq._id}`}>
            <div className="accordion-body" dangerouslySetInnerHTML={{ __html: `${faq.answer}` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqAccordion;
