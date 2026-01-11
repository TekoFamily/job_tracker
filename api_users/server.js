import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();
const app = express();
const JWT_SECRET = 'your-secret-key'; // Em produção, use variáveis de ambiente

app.use(cors());
app.use(express.json());

// Middleware de Autenticação
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token não fornecido' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido ou expirado' });
        req.user = user;
        next();
    });
};

// --- ROTAS DE USUÁRIO (Autenticação) ---

// Cadastro de usuário
app.post('/usuarios', async (req, res) => {
    try {
        const { email, name, age, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                age,
                password: hashedPassword
            }
        });

        res.status(201).json({ id: user.id, email: user.email, name: user.name });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

// Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao realizar login' });
    }
});

// --- ROTAS DE VAGAS (Protegidas) ---

// Buscar vagas do usuário logado
app.get('/vagas', authenticateToken, async (req, res) => {
    try {
        const jobs = await prisma.job.findMany({
            where: { userId: req.user.id },
            orderBy: { date: 'desc' }
        });
        res.json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar vagas' });
    }
});

// Criar nova vaga para o usuário logado
app.post('/vagas', authenticateToken, async (req, res) => {
    try {
        const { company, role, link, status, notes } = req.body;

        if (!company) {
            return res.status(400).json({ error: 'Nome da empresa é obrigatório' });
        }

        const job = await prisma.job.create({
            data: {
                company,
                role,
                link,
                status,
                notes,
                userId: req.user.id
            }
        });

        res.status(201).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar vaga' });
    }
});

// Atualizar uma vaga do usuário logado
app.put('/vagas/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { company, role, link, status, notes } = req.body;

        // Verifica se a vaga pertence ao usuário
        const existingJob = await prisma.job.findFirst({
            where: { id, userId: req.user.id }
        });

        if (!existingJob) {
            return res.status(404).json({ error: 'Vaga não encontrada ou acesso negado' });
        }

        const updatedJob = await prisma.job.update({
            where: { id },
            data: {
                company,
                role,
                link,
                status,
                notes
            }
        });

        res.json(updatedJob);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar vaga' });
    }
});

// Deletar uma vaga do usuário logado
app.delete('/vagas/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se a vaga pertence ao usuário
        const existingJob = await prisma.job.findFirst({
            where: { id, userId: req.user.id }
        });

        if (!existingJob) {
            return res.status(404).json({ error: 'Vaga não encontrada ou acesso negado' });
        }

        await prisma.job.delete({
            where: { id }
        });

        res.json({ message: 'Vaga deletada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar vaga' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});