import { useState } from 'react';
import dynamic from 'next/dynamic';

import UiModal from '../ui/UiModal';
import UiIcon from '../ui/UiIcon';

import SetProductForm from './SetProductForm';
import useCategoriesQuery from '@/api/query/useCategoriesQuery';
import { useSetProductStore } from '@/Store/ProductStore';
const SetProductVariantForm = dynamic(() => import('./SetProductVariantForm'));
const MangeCategories = dynamic(() => import('./ManageCategories'));
const EditCategories = dynamic(() => import('./EditCategory'));

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

export default function AddProductModal({ isOpen, onClose }: Props) {
  const [activeView, setActiveView] = useState(0);
  const [activeCategoryId, setActiveCategoryId] = useState<string>('');
  
  const { query: { data: categories } } = useCategoriesQuery();

  const { activeProduct, setActiveVariantIndex } = useSetProductStore();

  function handleActiveView(index: number) {
    setActiveView(index)
  }

  function handleActiveCategoryId(categoryId: string) {
    setActiveCategoryId(categoryId);
  }

  function closeModal() {
    onClose();
    setActiveView(0)
  }

  const views = [
    {
      title: `${activeProduct ? 'Edit' : 'Add'} Product`,
      node: (
        <SetProductForm
          closeModal={closeModal}
          categories={categories || []}
          onSetActiveView={handleActiveView}
        />
      ),
    },
    {
      title: `${false ? 'Edit' : 'Product'} Variant`,
      node: <SetProductVariantForm />,
      startNode: (
        <button
          onClick={() => {
            setActiveView(0);
            setActiveVariantIndex(null);
          }}
          className="stroke-secondary-500"
        >
          <UiIcon icon="ArrowLeft" size="24" />
        </button>
      ),
    },
    {
      title: 'Manage Categories',
      node: (
        <MangeCategories
          categories={categories || []}
          handleActiveView={handleActiveView}
          setActiveCategoryId={handleActiveCategoryId}
        />
      ),
      startNode: (
        <button
          onClick={() => setActiveView(0)}
          className="stroke-secondary-500"
        >
          <UiIcon icon="ArrowLeft" size="24" />
        </button>
      ),
    },
    {
      title: 'Edit Category',
      node: <EditCategories categoryId={activeCategoryId} />,
      startNode: (
        <button
          onClick={() => setActiveView(2)}
          className="stroke-secondary-500"
        >
          <UiIcon icon="ArrowLeft" size="24" />
        </button>
      ),
    },
  ];

  return (
    <UiModal
      isOpen={isOpen}
      onClose={closeModal}
      title={views[activeView].title}
      startNode={views[activeView].startNode}
    >
      {views[activeView].node}
    </UiModal>
  );
}
