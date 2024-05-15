const Card = ({ family }) => {
    return (
        <div className="card">
            <h1>{family.name}</h1>
            <p>{family.desc}</p>
        </div>
    )
}

export default Card