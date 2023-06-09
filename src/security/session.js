import { verifyToken } from "../utils.js";

export default async function sessionIsValid(req, res){
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await verifyToken(token);
        // le token est valide, continuer le traitement de la requête
        res.status(200).send(true)
      } catch (err) {
        // le token est invalide ou manquant, renvoyer une erreur 401
        res.status(401).send(false);
      }
}