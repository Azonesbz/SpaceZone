import multer from 'multer'
import path from 'path';
import fs from 'node:fs'

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

        const oldPath = req.file.path;
        const newFileName = path.join(path.dirname(oldPath), req.body.user_id + '.jpg');
        console.log(newFileName)
        
        fs.rename(oldPath, path.join(process.cwd(), newFileName), (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
        
          console.log('File renamed successfully.');
          return res.status(200).json({msg: 'File renamed successfully.', newFileName});
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error uploading file.');
    }
}