export type Categoria = {
  id: string;
  nombre: string;
  orden: number;
};

export type Producto = {
  id: string;
  nombre: string;
  descripcion: string | null;
  precio: number;
  imagen_url: string | null;
  categoria_id: string;
  disponible: boolean;
};
