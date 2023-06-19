import fs from 'fs';

const loadItems=async (path) =>{
    if (fs.existsSync(path)) {
      const data = await fs.promises.readFile(path, 'utf-8')
      const items = JSON.parse(data)
      return items
    }
    return 'El archivo no existe'
  }

  export default loadItems;