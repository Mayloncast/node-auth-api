import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/list-users", async (req, res) => {
    try{
const users = await prisma.user.findMany({omit:{password:true}}); //busca todos os usuários no banco de dados
res.status(200).json(users); //responde com o status 200 - ok - e devolve os usuários em json
    }catch(error){
    console.error(error);
    res.status(500).json({ error: error.message });
    }
}
)
export default router; 