const EditCard = ({ id }) => {
    const handleEdit = () => {
        console.log(id)
    }

    return (
        <button type="button" className="btn btn-sm btn-warning me-1" onClick={handleEdit}>Editar</button>
    )
}

export default EditCard