export type Movimiento = {
  id: number;
  descripcion: string;
  monto: number;
  tipo: "gasto" | "ingreso";
  categoria: string;
  medioPago: string;
  fecha: string;
}