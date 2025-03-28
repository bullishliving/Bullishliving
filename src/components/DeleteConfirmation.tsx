import UiModal from "./ui/UiModal";
import UiButton from "./ui/UiButton";

interface Props {
  isOpen: boolean;
  onAction: VoidFunction;
  onClose: VoidFunction
}

export default function DeleteConfirmation({ isOpen, onAction, onClose }: Props) {
  return (
    <UiModal title="Confirm Delete" isOpen={isOpen} onClose={onClose}>
      <p className="font-montserrat text-tertiary-700 mb-5">
        Are you sure you want to delete this item? This action is irreversible.
        All related data will also be permanently deleted.
      </p>
      <div className="flex gap-2 max-w-[260px]">
        <UiButton variant="grey" onClick={onClose}>
          Cancel
        </UiButton>
        <UiButton variant="danger" onClick={onAction}>
          Delete
        </UiButton>
      </div>
    </UiModal>
  );
}
