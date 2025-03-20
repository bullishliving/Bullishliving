import { useState } from 'react';

import UiModal from '../ui/UiModal';

import SetProductForm from './setProductForm';
import SetProductVariantForm from './SetProductVariantForm';
import UiIcon from '../ui/UiIcon';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

export default function AddProductModal({ isOpen, onClose }: Props) {
  const [activeView, setActiveView] = useState(1);

  const views = [
    {
      title: `${false ? 'Edit' : 'Add'} Product`,
      node: <SetProductForm />,
    },
    {
      title: `${false ? 'Edit' : 'Product'} Variant`,
      node: <SetProductVariantForm />,
      startNode: (
        <button
          onClick={() => setActiveView(0)}
          className="stroke-secondary-500"
        >
          <UiIcon icon="ArrowLeft" size="24" />
        </button>
      ),
    },
  ];

  return (
    <UiModal
      isOpen={true}
      onClose={onClose}
      title={views[activeView].title}
      startNode={views[activeView].startNode}
    >
      {views[activeView].node}
    </UiModal>
  );
}
