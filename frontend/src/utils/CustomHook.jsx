export const useGetLocalStorage = ()=>{
    return JSON.parse(localStorage.getItem("snapchat_profile"));
}

export const useSetLocalStorage = (data)=>{
    localStorage.setItem('snapchat_profile',JSON.stringify(data))
    return JSON.parse(localStorage.getItem("snapchat_profile"));
}