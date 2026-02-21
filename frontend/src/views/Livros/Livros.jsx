import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { LivrosService } from '../../api/LivrosService'
import { Link } from "react-router-dom"

const Livros = () => {
  const [livros, setLivros] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('')
  const [livrosFiltrados, setLivrosFiltrados] = useState([])

  // Função para carregar livros
  const getLivros = async () => {
    setLoading(true)
    try {
      const resultado = await LivrosService.getLivros()

      if (resultado.success) {
        setLivros(resultado.data)
        setLivrosFiltrados(resultado.data)
      } else {
        alert(resultado.message)
        setLivros([])
        setLivrosFiltrados([])
      }
    } catch (error) {
      alert('Erro ao carregar livros')
      setLivros([])
      setLivrosFiltrados([])
    } finally {
      setLoading(false)
    }
  }

  // Função para deletar livro
  const deleteLivro = async (livroId, tituloLivro) => {
    const confirmacao = confirm(`Você realmente deseja remover o livro "${tituloLivro}"?`)

    if (confirmacao) {
      try {
        const resultado = await LivrosService.deleteLivro(livroId)

        if (resultado.success) {
          alert(resultado.message)
          // Recarregar lista
          getLivros()
        } else {
          alert(resultado.message)
        }
      } catch (error) {
        alert('Erro ao remover livro')
        console.error('Erro:', error)
      }
    }
  }

  // Função para filtrar livros
  const filtrarLivros = (termo) => {
    setFiltro(termo)

    if (!termo.trim()) {
      setLivrosFiltrados(livros)
    } else {
      const filtrados = livros.filter(livro =>
        livro.titulo.toLowerCase().includes(termo.toLowerCase()) ||
        livro.editora.toLowerCase().includes(termo.toLowerCase()) ||
        livro.isbn.toLowerCase().includes(termo.toLowerCase())
      )
      setLivrosFiltrados(filtrados)
    }
  }

  useEffect(() => {
    getLivros()
  }, [])

  // Atualizar filtro quando livros mudarem
  useEffect(() => {
    filtrarLivros(filtro)
  }, [livros])

  // Loading state
  if (loading) {
    return (
      <>
        <Header/>
        <SubmenuLivros/>
        <div className='livros'>
          <h1>Carregando livros...</h1>
          <div className='loading'>
            <p>Por favor, aguarde...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header/>
      <SubmenuLivros/>
      <div className='livros'>
        <div className='header-section'>
          <h1>Biblioteca de Livros</h1>
          <div className='search-section'>
            <input
              type="text"
              placeholder="Buscar por título, editora ou ISBN..."
              value={filtro}
              onChange={(e) => filtrarLivros(e.target.value)}
              className='search-input'
            />
            <button onClick={getLivros} className='btn-refresh'>
              🔄 Atualizar
            </button>
          </div>
        </div>

        {livrosFiltrados.length === 0 ? (
          <div className='no-books'>
            <h3>Nenhum livro encontrado</h3>
            <p>
              {filtro ?
                'Nenhum livro corresponde aos critérios de busca.' :
                'Não há livros cadastrados ainda.'
              }
            </p>
            <Link to="/livros/cadastro" className='btn-primary'>
              Cadastrar Primeiro Livro
            </Link>
          </div>
        ) : (
          <>
            <div className='results-info'>
              <p>
                {livrosFiltrados.length} livro{livrosFiltrados.length !== 1 ? 's' : ''} encontrado{livrosFiltrados.length !== 1 ? 's' : ''}
                {filtro && ` para "${filtro}"`}
              </p>
            </div>

            <ul className='books-grid'>
              {livrosFiltrados.map((livro) => (
                <li key={livro.id} className='book-card'>
                  <div className='livro-info'>
                    <h3>{livro.titulo}</h3>
                    <p><strong>Editora:</strong> {livro.editora}</p>
                    <p><strong>Páginas:</strong> {livro.paginas}</p>
                    <p><strong>ISBN:</strong> {livro.isbn}</p>
                  </div>
                  <div className='botoes'>
                    <Link
                      className='btn edit'
                      to={`/livros/edicao/${livro.id}`}
                      title="Editar livro"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                      </svg>
                    </Link>
                    <button
                      className='btn delete'
                      onClick={() => deleteLivro(livro.id, livro.titulo)}
                      title="Remover livro"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}

export default Livros