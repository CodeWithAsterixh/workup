

export async function readHtmlFiles (url:string){
    try{
        const entries = await fetch(url)
        // const htmlFiles = entries.filter(entry => entry)
        const res = await entries.text()
        return res
    }catch{
        return ""
    }
}