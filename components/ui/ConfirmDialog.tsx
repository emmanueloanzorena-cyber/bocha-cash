"use client";

import Modal from "./Modal";
import Button from "./Button";

type Props = {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title = "Confirmar acción",
  message,
  confirmText = "Eliminar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
    >
      <p className="text-slate-300">
        {message}
      </p>

      <div className="mt-8 flex justify-end gap-3">
        <Button
          variant="secondary"
          onClick={onCancel}
        >
          {cancelText}
        </Button>

        <Button
          variant="danger"
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}