import fs from 'fs'

class FilesDao {
  constructor(path) {
    this.path=path;
  }

  async loadItems() {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, 'utf-8')
      const items = JSON.parse(data)
      return items
    }
    return 'El archivo no existe'
  }
}

export default FilesDao;