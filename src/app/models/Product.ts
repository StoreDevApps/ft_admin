export interface Product {
    id: number;
    presentation: string;
    category: string;
    detail: string;
    brand: string;
    codigo: string;
    duedate: string | null;
    state: string;
    aud_created_at: string;
    images: string[];
    videos: string[];
    price: number;
    average_rating?: number; 
    rating_count?: number;  
  }  