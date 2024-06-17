export function validarCorreoElectronico(correo: string): boolean {
    const expresionRegularCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return expresionRegularCorreo.test(correo);
  }
