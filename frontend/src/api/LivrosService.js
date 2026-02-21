import axios from "axios";

const BASE_URL = "http://localhost:3000";

// Configuração do axios com interceptors para tratamento de erros
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para tratamento de respostas
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Erro na API:', error);
        return Promise.reject(error);
    }
);

export class LivrosService {
    /**
     * Lista todos os livros
     * @returns {Promise} Promise com a lista de livros
     */
    static async getLivros() {
        try {
            const response = await api.get('/api/livros');
            return {
                success: true,
                data: response.data,
                message: 'Livros carregados com sucesso'
            };
        } catch (error) {
            return {
                success: false,
                data: [],
                message: error.response?.data?.mensagem || 'Erro ao carregar livros',
                error: error
            };
        }
    }

    /**
     * Busca um livro por ID
     * @param {number} id - ID do livro
     * @returns {Promise} Promise com os dados do livro
     */
    static async getLivro(id) {
        try {
            const response = await api.get(`/api/livros/${id}`);
            return {
                success: true,
                data: response.data,
                message: 'Livro encontrado'
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error.response?.data?.mensagem || 'Erro ao buscar livro',
                error: error
            };
        }
    }

    /**
     * Cria um novo livro
     * @param {Object} livro - Dados do livro
     * @returns {Promise} Promise com o resultado da criação
     */
    static async createLivro(livro) {
        try {
            // Validação básica no frontend
            const validacao = this.validarLivro(livro);
            if (!validacao.valido) {
                return {
                    success: false,
                    data: null,
                    message: validacao.mensagem
                };
            }

            const response = await api.post('/api/livros', livro);
            return {
                success: true,
                data: response.data.livro,
                message: response.data.mensagem || 'Livro criado com sucesso'
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error.response?.data?.mensagem || 'Erro ao criar livro',
                error: error
            };
        }
    }

    /**
     * Atualiza um livro existente
     * @param {number} id - ID do livro
     * @param {Object} livro - Dados atualizados do livro
     * @returns {Promise} Promise com o resultado da atualização
     */
    static async updateLivro(id, livro) {
        try {
            // Validação básica no frontend
            const validacao = this.validarLivro(livro);
            if (!validacao.valido) {
                return {
                    success: false,
                    data: null,
                    message: validacao.mensagem
                };
            }

            const response = await api.put(`/api/livros/${id}`, livro);
            return {
                success: true,
                data: response.data.livro,
                message: response.data.mensagem || 'Livro atualizado com sucesso'
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error.response?.data?.mensagem || 'Erro ao atualizar livro',
                error: error
            };
        }
    }

    /**
     * Remove um livro
     * @param {number} id - ID do livro
     * @returns {Promise} Promise com o resultado da remoção
     */
    static async deleteLivro(id) {
        try {
            const response = await api.delete(`/api/livros/${id}`);
            return {
                success: true,
                data: response.data.livro,
                message: response.data.mensagem || 'Livro removido com sucesso'
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error.response?.data?.mensagem || 'Erro ao remover livro',
                error: error
            };
        }
    }

    /**
     * Valida os dados de um livro
     * @param {Object} livro - Dados do livro para validar
     * @returns {Object} Resultado da validação
     */
    static validarLivro(livro) {
        if (!livro.titulo || livro.titulo.trim() === '') {
            return { valido: false, mensagem: 'Título é obrigatório' };
        }

        if (!livro.paginas || isNaN(livro.paginas) || Number(livro.paginas) <= 0) {
            return { valido: false, mensagem: 'Número de páginas deve ser um número positivo' };
        }

        if (!livro.isbn || livro.isbn.trim() === '') {
            return { valido: false, mensagem: 'ISBN é obrigatório' };
        }

        if (!livro.editora || livro.editora.trim() === '') {
            return { valido: false, mensagem: 'Editora é obrigatória' };
        }

        return { valido: true, mensagem: 'Dados válidos' };
    }

    /**
     * Formata os dados do livro para envio à API
     * @param {Object} livro - Dados do livro
     * @returns {Object} Dados formatados
     */
    static formatarLivro(livro) {
        return {
            titulo: livro.titulo?.trim(),
            paginas: Number(livro.paginas),
            isbn: livro.isbn?.trim(),
            editora: livro.editora?.trim()
        };
    }
}