import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../../supabaseService';
import Banner from '@/types/Banner';
import showToast from '@/components/ui/UiToast';

export default function useAddBannerMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (banner: Banner) => Api.addBanner(banner),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] }); 
      showToast('banner created successfully', 'success');
    },
    
    onError: (error) => {
      console.error(error);
      showToast('error creating banner', 'error');
    },
  })

  return { mutation }
}
