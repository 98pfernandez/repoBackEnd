class ContactDTO {
    constructor(contact) {
      this.name = contact.first_name
      this.lastname = contact.last_name
      this.active = true
      this.phone = contact.phone ? contact.phone.split('-').join('') : ''
    }
  }