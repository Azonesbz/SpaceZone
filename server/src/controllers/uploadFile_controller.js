import multer from '.pnpm/multer@1.4.5-lts.1/node_modules/multer'
import path from 'path';
import fs from 'node:fs'
import { generateId } from '../../../client/src/utils/generateId.js';
import { users } from '../repository/user_repository.js';
import { v4 as uuidv4 } from '.pnpm/uuid@9.0.0/node_modules/uuid';
import jwt from '.pnpm/jsonwebtoken@9.0.0/node_modules/jsonwebtoken';


let data; 

const storageProfil = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = '../client/uploads/profil';
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        data = Date.now() + '-' + file.originalname
        cb(null, Date.now() + '-' + file.originalname)
    },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Erreur : seuls les fichiers d'images sont autorisés (jpeg, jpg, png).");
    }
});

export const uploadProfil = multer({ storage: storageProfil });

const storageProduct = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = '../client/uploads/product';
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const fileName = uuidv4() + '-' + file.originalname;
        cb(null, fileName);
    },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Erreur : seuls les fichiers d'images sont autorisés (jpeg, jpg, png).");
    }
});

export const uploadProduct = multer({ storage: storageProduct });

export async function uploadProfilFile(req, res){
    const userId = req.body.id
    try {
        if(!req.file) {
            res.status(400).send('No file uploaded.');
            return;
        }
        
        const id = generateId()
        const mimetype = req.file.mimetype
        const oldPath = req.file.path;

        let url = null
        let newFileName;

        if(mimetype === 'image/png'){
            newFileName = path.join(path.dirname(oldPath), id + '.png');
            url = id + '.png'
        } else if(mimetype === 'image/jpeg') {
            newFileName = path.join(path.dirname(oldPath), id + '.jpg');
            url = id + '.jpg'
        } else if(mimetype === 'image/webp') {
            newFileName = path.join(path.dirname(oldPath), id + '.webp');
            url = id + '.webp'
        } else {
            return res.status(400).send('Unsupported file format.');
        }

        users.picture(userId, url)
            .then(user => {
                const token = jwt.sign(user[0], process.env.PRIVATE_KEY, {expiresIn: '1h'})
                fs.rename(oldPath, path.join(process.cwd(), newFileName), (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send(err);
                    }
                    console.log('File renamed successfully.');
                    return res.status(200).json({msg: 'File renamed successfully.', url, token: token});
                });
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({err})
            })
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Error uploading file.');
    }
}