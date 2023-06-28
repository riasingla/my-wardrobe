import axios from 'axios';

const baseUrl = "https://localhost:7025";


const api= axios.create({
    baseURL: baseUrl,
    headers:{
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((config)=> {
    const token = localStorage.getItem('token');
    if(token)
    {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

const authService = {
    signup:(userData) => api.post('/User/signup',userData),
    login:(loginData) => api.post('/User/login',loginData),
};

const ClothingItemService = {
    GetAllClothingItems : ()=>api.get('/api/ClothingItems/'),
    GetItemsByUserId:(userId)=>api.get(`/api/ClothingItems/Items/${userId}`),
    AddClothingItem: (ClothingItemData)=> api.post('/api/ClothingItems/',ClothingItemData),
    GetById:(id)=>api.get(`/api/ClothingItems/${id}`),
    UpdateClothingItem:(id, ClothingItemData)=>api.put(`/api/ClothingItems/${id}`,ClothingItemData),
    DeleteClothingItem:(id)=>api.delete(`/api/ClothingItems/${id}`),
    
};

const OutfitService =
{
    CreateOutfit:(OutfitData)=>api.post('/api/Outfit/',OutfitData),
    GetOutfits:()=>api.get('/api/Outfit/'),
    GetOutfitsByUserId:(userId)=>api.get(`/api/Outfit/user/${userId}`),
    GetOutfitById:(id)=>api.get(`/api/outfit/${id}`),
    UpdateOutfit:(id, OutfitData)=>api.put(`/api/Outfit/${id}`,OutfitData),
    DeleteOutfit:(id)=>api.delete(`/api/Outfit/${id}`),
}

export { authService, ClothingItemService, OutfitService };