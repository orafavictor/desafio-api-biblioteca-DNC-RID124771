import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { LivrosService } from '../../api/LivrosService'

const LivrosCadastro = () => {
  const navigate = useNavigate()

  const [livro, setLivro] = useState({
    titulo: '',
    paginas: '',
    isbn: '',
    editora: ''
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Função para validar campos em tempo real
  const validarCampo = (campo, valor) => {
    const novosErrors = { ...errors }

    switch (campo) {
      case 'titulo':
        if (!valor || valor.trim() === '') {
          novosErrors.titulo = 'Título é obrigatório'
        } else {
          delete novosErrors.titulo
        }
        break
      case 'paginas':
        if (!valor || isNaN(valor) || Number(valor) <= 0) {
          novosErrors.paginas = 'Número de páginas deve ser um número positivo'
        } else {
          delete novosErrors.paginas
        }
        break
      case 'isbn':
        if (!valor || valor.trim() === '') {
          novosErrors.isbn = 'ISBN é obrigatório'
        } else {
          delete novosErrors.isbn
        }
        break
      case 'editora':
        if (!valor || valor.trim() === '') {
          novosErrors.editora = 'Editora é obrigatória'
        } else {
          delete novosErrors.editora
        }
        break
    }

    setErrors(novosErrors)
  }

  // Função para atualizar campo do livro
  const handleInputChange = (campo, valor) => {
    setLivro(prev => ({ ...prev, [campo]: valor }))
    validarCampo(campo, valor)
  }

  // Função para criar livro
  const createLivro = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Formatar dados antes de enviar
      const dadosFormatados = LivrosService.formatarLivro(livro)

      // Chamar API
      const resultado = await LivrosService.createLivro(dadosFormatados)

      if (resultado.success) {
        alert(resultado.message)
        // Limpar formulário
        setLivro({
          titulo: '',
          paginas: '',
          isbn: '',
          editora: ''
        })
        setErrors({})
        // Redirecionar para lista de livros
        navigate('/livros')
      } else {
        alert(resultado.message)
      }
    } catch (error) {
      alert('Erro inesperado ao cadastrar livro')
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  // Função para cancelar e voltar
  const handleCancel = () => {
    navigate('/livros')
  }

  return (
    <>
      <Header/>
      <SubmenuLivros/>
      <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        <div className='form-container'>
          <form onSubmit={createLivro}>
            <div className='form-group'>
              <label htmlFor='titulo'>Título *</label>
              <input
                type="text"
                id='titulo'
                value={livro.titulo}
                onChange={(e) => handleInputChange('titulo', e.target.value)}
                className={errors.titulo ? 'error' : ''}
                disabled={loading}
                placeholder="Digite o título do livro"
              />
              {errors.titulo && <span className='error-message'>{errors.titulo}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor='paginas'>Número de Páginas *</label>
              <input
                type="number"
                id='paginas'
                value={livro.paginas}
                onChange={(e) => handleInputChange('paginas', e.target.value)}
                className={errors.paginas ? 'error' : ''}
                disabled={loading}
                placeholder="Digite o número de páginas"
                min="1"
              />
              {errors.paginas && <span className='error-message'>{errors.paginas}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor='isbn'>ISBN *</label>
              <input
                type="text"
                id='isbn'
                value={livro.isbn}
                onChange={(e) => handleInputChange('isbn', e.target.value)}
                className={errors.isbn ? 'error' : ''}
                disabled={loading}
                placeholder="Digite o código ISBN"
              />
              {errors.isbn && <span className='error-message'>{errors.isbn}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor='editora'>Editora *</label>
              <input
                type="text"
                id='editora'
                value={livro.editora}
                onChange={(e) => handleInputChange('editora', e.target.value)}
                className={errors.editora ? 'error' : ''}
                disabled={loading}
                placeholder="Digite o nome da editora"
              />
              {errors.editora && <span className='error-message'>{errors.editora}</span>}
            </div>

            <div className='form-actions'>
              <button
                type="button"
                onClick={handleCancel}
                className='btn-secondary'
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className='btn-primary'
                disabled={loading || Object.keys(errors).length > 0}
              >
                {loading ? 'Cadastrando...' : 'Cadastrar Livro'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LivrosCadastro