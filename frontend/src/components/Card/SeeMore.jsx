const SeeMore = ({ id }) => {
    const handleSeeMore = () => {
        console.log(id)
    }

    return (
        <button type="button" className="btn btn-sm btn-qblue me-1" onClick={handleSeeMore}>Ver mais</button>
    )
}

export default SeeMore