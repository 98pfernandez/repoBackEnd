import  Router  from 'express';
import passport from 'passport';
import { generateToken } from '../utils/jwt.utils.js';
import { privateAccess } from '../middlewares/index.js';
import UserService from "../services/users.service.js";
import  {transport}  from "../config/email.config.js";
import { upload} from '../middlewares/multer.js';
import dotenv from 'dotenv';
const userService=new UserService();
const router = Router();

//Variables de entorno:
dotenv.config({ path: "../../.env" });

router.get('/', async (req,res)=>{
  try {
    const usersDB=await userService.getUsers();

    const users= usersDB.map(({email, name, rol})=>({email, name, rol}));

    res.json({users})
  } catch (error) {
    console.log(error)
  }
})

//borrar por dos dias o mas de inactividad
router.delete('/', async (req,res)=>{
  const usersDB=await userService.getUsers();
  const arrEmailToDelete=[];
  
  usersDB.forEach(user => {
      const userLastConnection=new Date(user.last_connection).getTime();
      const currentDate= new Date().getTime();
      const diffMiliSec = currentDate - userLastConnection;
      const diffDays = diffMiliSec / (1000 * 60 * 60 * 24);

    if(diffDays>2){
      arrEmailToDelete.push(user.email)
    }
  });
  
  if(arrEmailToDelete.length>0){
    try {
      const responseDB=await userService.deleteManyUser(arrEmailToDelete)
      const mail=process.env.MAILER_SERVICE;
      
      for(let i=0;i<arrEmailToDelete.length;i++){
        await transport.sendMail({
          from: mail,
          to: arrEmailToDelete[i],
          subject: 'Deleted account',
          html:`
          <p>Your account was deleted due to inactivity.</p>`, 
          attachments:[]
        })
      }

      return res.status(200).json({responseDB})
    } catch (error) {
      return res.status(400).json({error})
    }
  }

  return res.status(200).json({info: "0 deletes"})
  })

router.post(
  '/',
  passport.authenticate('register', {session:false, failureRedirect: '/users/failRegister', failureFlash:true  }),
  async (req, res) => {
    try {
      const userToken = req.user;
      const token = generateToken(userToken);
      res.cookie("authToken", token, { httpOnly: true }).status(201).json({ message: "Sesión iniciada" });
    } catch (error) {
      console.log(error);
      if (error.code === 11000)
        return res.status(400).json({ error: 'El usuario ya existe' });
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  })

router.get('/failRegister', async (req, res) => {
  res.json({ error: "login error"});
});

router.get('/premium/:userEmail' , privateAccess, async (req, res) => {
  const {userEmail} = req.params;

    const responseDBCreate=await userService.findUserByEmail(userEmail)
    if (!responseDBCreate) return res.status(400).json({error:true, info:'user not found'});

    const namesToSearch = ['comprobante de domicilio', 'identificacion', 'comprobante de estado de cuenta'];
    const filteredDocuments = responseDBCreate.documents.filter(obj => namesToSearch.includes((obj.name).split('.')[0].toLowerCase()));
    if(filteredDocuments.length!=3) return res.status(404).json({ error: 'Necesita subir los siguientes documentos: comprobante de domicilio, identificacion y comprobante de estado de cuenta'});

    const userInfo={
      rol: responseDBCreate.rol =='premium'? 'user' : 'premium'
    }

    const responseDBUpdate=await userService.updateUser(userEmail, userInfo);
    if (responseDBUpdate.modifiedCount==0) return res.status(400).json({error:true, info:'update error'});

    
    res.status(200).json({info:`the role of user ${userEmail} was changed from ${responseDBCreate.rol} to ${userInfo.rol}`});
});

router.post('/:userEmail/documents', upload.array('file', 10), async (req, res) => {
try {
  const {userEmail} = req.params;
  const user=await userService.findUserByEmail(userEmail)
  if (!user) return res.status(400).json({error:true, info:'user not found'});
  
  const fileNames = req.files.map(file => file.originalname);
  const filePaths = req.files.map(file => file.path);

  const documents=[];
  
  for (let i=0; i<fileNames.length; i++){
    documents.push(
      {
        name: fileNames[i],
        reference: filePaths[i]
      }
    )
  }

  
  if(user.documents){
    user.documents = user.documents.concat(documents);
  }else{
    user.documents=documents;
  }

  userService.updateUser(userEmail, user)
} catch (error) {
  return res.send({ error});
}
  return res.send({ data: 'archivos enviados'});
} )

export { router as userController };