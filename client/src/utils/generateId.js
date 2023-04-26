export function generateId() {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const length = 8;
    let id = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }
  
    return id;
  }