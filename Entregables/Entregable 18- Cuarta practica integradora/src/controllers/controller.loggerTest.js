import Router from 'express';

const router= Router();

router.get('/:typeLog', (req,res)=>{
    const {typeLog} =req.params;

    switch(typeLog){
        case 'fatal':
            req.logger.fatal('nivel fatal desde el test de logs')
            res.send("testeando logs.....")
            break;

        case 'error':
            req.logger.error('nivel error desde el test de logs')
            res.send("testeando logs.....")
            break;

        case 'warning':
            req.logger.warning('nivel warning desde el test de logs')
            res.send("testeando logs.....")
            break;

        case 'info':
            req.logger.info('nivel info desde el test de logs')
            res.send("testeando logs.....")
            break;
        
        case 'http':
            req.logger.http('nivel http desde el test de logs')
            res.send("testeando logs.....")
        break;

        case'debug':
            req.logger.debug('nivel debug desde el test de logs')
            res.send("testeando logs.....")
            break;

        default:
            res.json({error: "el parametro es incorrecto"});
            
    }
})

export {router as loggerController}