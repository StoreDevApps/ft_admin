export interface Usuario {
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    idrol: string; 
    is_active?: boolean;
    is_staff?: boolean;
    contrasena?: string;
}
