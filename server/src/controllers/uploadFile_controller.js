import multer from 'multer'
import path from 'path';
import fs from 'node:fs'
import { generateId } from '../../../client/src/utils/generateId.js';
import { users } from '../repository/user_repository.js';

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

export const upload = multer({ storage: storageProfil });

export async function uploadFile(req, res){
    try {
        if(!req.file) {
            res.status(400).send('No file uploaded.');
            return;
        }
        const userId = req.params.id
        const id = generateId()
        const mimetype = req.file.mimetype
        const oldPath = req.file.path;

        let url = null
        let newFileName;
        console.log(mimetype == 'image/jpeg')

        if(mimetype === 'image/png'){
            newFileName = path.join(path.dirname(oldPath), id + '.png');
            url = id + '.png'
            users.picture(userId, url).then(() => {
                fs.rename(oldPath, path.join(process.cwd(), newFileName), (err) => {
                    if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                    }
                
                    console.log('File renamed successfully.');
                    return res.status(200).json({msg: 'File renamed successfully.', url});
                });
            })
        } else if(mimetype === 'image/jpeg') {
            newFileName = path.join(path.dirname(oldPath), id + '.jpg');
            url = id + '.jpg'
            users.picture(userId, url).then(() => {
                fs.rename(oldPath, path.join(process.cwd(), newFileName), (err) => {
                    if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                    }
                
                    console.log('File renamed successfully.');
                    return res.status(200).json({msg: 'File renamed successfully.', url});
                });
            })
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Error uploading file.');
    }
}