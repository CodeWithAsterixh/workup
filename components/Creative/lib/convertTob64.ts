export async function convertTob64(file:File){
    return new Promise((res, rej)=>{
        const reader = new FileReader();
        reader.onloadend = ()=>res(reader.result);

        reader.onerror = rej;
        reader.readAsDataURL(file)
    })
}