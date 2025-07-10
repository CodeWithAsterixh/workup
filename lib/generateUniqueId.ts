export default function generateUniqueId(arrayOfIds:string[]=[]){
    const id = (crypto.randomUUID()).split("-").join("")

    while(arrayOfIds.find(i => i == id)){
        generateUniqueId(arrayOfIds)
    }

    return id
}