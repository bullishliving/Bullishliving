import { useMutation, useQueryClient } from '@tanstack/react-query';

import showToast from '@/components/ui/UiToast';

import { Api } from '../../supabaseService';

export default function useDeleteBannerMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (bannerId: number) => Api.deleteBanner(bannerId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] }); 
      showToast('banner deleted', 'success');
    },

    onError: (error) => {
      console.error(error);
      showToast('error occured when deleting banner', 'error');
    },
  })

  return { mutation }
}
