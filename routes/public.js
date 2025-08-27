import express from "express"; //importing express module for use
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"; //importing jsonwebtoken module for use
const prisma = new PrismaClient();

const router = express.Router(); //create a router instance - uma parte do express que lida com rotas
const JWT_SECRET = process.env.JWT_SECRET; // secret key for JWT - chave secreta para o JWT, que deve ser mantida em segredo e não deve ser exposta no código fonte
//register

router.post("/register", async (req, res) => {
  try {
    //pega as info que vem pelo body da requisição e dá uma resposta
    const user = req.body; //pega o corpo da requisição - as informações do usuário vem no body

    const salt = await bcrypt.genSalt(10); //gera um salt para criptografar a senha - quanto maior o número, mais seguro é

    const hashPassword = await bcrypt.hash(user.password, salt); //criptografa a senha do usuário com o salt gerado - hash é a função que criptografa a senha * pega o password do usuário e coloca o salt

    const userDb = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashPassword, //coloca a senha criptografada no banco de dados
      },
    }); //cria um novo usuário no banco de dados com os dados do corpo da requisição
    res.status(201).json(userDb); //responde com o status 201 - created - e devolve o user em json
  } catch (error) {
    console.error(error); // mostra o erro real no terminal
    res.status(500).json({ error: error.message }); // devolve a mensagem real para o cliente
  }
});

//login
router.post("/login", async (req, res) => {
  const start = Date.now();
  try {
    const userInfo = req.body;
    const user = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    if (!user) {
      console.log("Tempo do login:", Date.now() - start, "ms");
      return res.status(404).json({ error: "User not found" });
    }

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(
      userInfo.password,
      user.password
    );
    if (!isPasswordValid) {
      console.log("Tempo do login:", Date.now() - start, "ms");
      return res.status(401).json({ error: "Invalid password" });
    }

    //Gera o token de autenticação
    // gera um token JWT com o id do usuário e uma chave secreta
    const token = jwt.sign(
      { userId: user.id }, // payload do token, que contém o id do usuário
      JWT_SECRET, // chave secreta para assinar o token
      { expiresIn: "1h" }
    ); // o token expira em 1 hora
    console.log("Tempo do login:", Date.now() - start, "ms");

    return res.status(200).json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router; //exporta o router para ser usado em outros arquivos

//Maylon
//b5J7XT20gY5DwWsH
