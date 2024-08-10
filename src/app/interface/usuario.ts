export interface Usuario {
    name: string;
    last_name: string;
    email: string;
    phone_number: string;
    rol: string; 
    is_active?: boolean;
    is_staff?: boolean;
    password?: string;
}
