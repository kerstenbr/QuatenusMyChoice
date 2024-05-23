import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Searchbar = () => {
    // TODO: Melhorar e muito a maneira como trato os erros da pesquisa, usar Zod talvez?
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const navigate = useNavigate()

    const onSearch = (data) => {
        const { name } = data
        navigate(`/search/${name}`)
        reset()
    }
    return (
        // TODO: Seria legal em vez de ter que apertar o botão, fazer um "onChange" pra fazer um "search as you type"
        <form className="input-group mb-3 mt-2" onSubmit={handleSubmit(onSearch)}>
            <input {...register("name", { required: true })} aria-invalid={errors.name ? "true" : "false"} type="search" className="form-control" placeholder="Pesquise aqui" />
            {errors.name?.type === "required" && (
                // alert("Digite algo para pesquisar")
                // TODO: Melhorar este erro depois, como estou na dev build ele fica lançando duas vezes e estava atrapalhando
                console.error("Digite algo para pesquisar")
            )}
            <button type="submit" className="btn btn-sm btn-qorange">Pesquisar</button>
        </form>
    )
}

export default Searchbar