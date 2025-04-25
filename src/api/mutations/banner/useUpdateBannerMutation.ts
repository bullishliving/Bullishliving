import { useMutation, useQueryClient } from '@tanstack/react-query';

import showToast from '@/components/ui/UiToast';

import Banner from '@/types/Banner';

import { Api } from '../../supabaseService';

export default function useUpdateBannerMutation() {
  const queryClient = useQueryClient();
  
  const mutaion = useMutation({
    mutationFn: (prop: {bannerId: number, banner: Banner}) => Api.updateBanner(prop.bannerId, prop.banner),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] }); 
      showToast('banner updated successfully', 'success');
    },

    onError: (error) => {
      console.error(error);
      showToast('error updating banner', 'error');
    },
  })

  return { mutaion }
}
