export const handleRequest = (response: Response) => {
    if (response.ok) {
      return response.json();
    } else {
      const message = response.status === 404 ? 'Recurso no encontrado' : 'Ha ocurrido un error inesperado';
      return message;
    }
  };