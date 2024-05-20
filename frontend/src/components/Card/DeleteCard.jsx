const DeleteCard = ({ id }) => {
    const handleDelete = () => {
        console.log(id)
    }

    return (
        <button type="button" className="btn btn-sm btn-danger" onClick={handleDelete}>Excluir</button>
    )
}

export default DeleteCard