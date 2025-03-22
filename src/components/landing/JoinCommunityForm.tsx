import useToggle from '@/hooks/useToggle';
import OrSeperator from '../OrSeperator';
import UiButton from '../ui/UiButton';
import UiForm from '../ui/UiForm';
import UiIcon from '../ui/UiIcon';
import UiInput from '../ui/UiInput';
import showToast from '../ui/UiToast';
import { Api } from '@/api/supabaseService';
import CommunityMember from '@/types/CommunityMember';
import useObjectState from '@/hooks/useObjectState';
import JoinCommunitySchema from '@/utils/schemas/JoinCommunitySchema';

export default function JoinCommunityForm() {
  const formData = useObjectState({
    name: '',
    email: '',
    phone: '',
  });

  const loading = useToggle();

  async function onSubmit() {
    try {
      loading.on();
      await Api.addCommunityMember(formData.value as CommunityMember);
      showToast('You’ve successfully joined the community! 🎉', 'success');
    } catch (error) {
      console.log(error);
      showToast('oops, an error occured', 'error');
      throw new Error(`An error occured when adding memeber ${error}`);
    } finally {
      loading.off();
    }
  }

  return (
    <div className="w-full max-w-[459px] mx-auto mt-[-100px] sm:mt-[-120px] md:mt-[-220px] px-6 py-8 md:p-10 bg-[#0101014D] backdrop-blur-[56px] border border-[#bab8b871] rounded-2xl">
      <h3 className="text-white font-obitron font-black text-xl mb-6">
        Run Together. Grow Stronger
      </h3>
      <UiForm
        formData={formData.value}
        onSubmit={onSubmit}
        schema={JoinCommunitySchema}
      >
        {({ errors }) => (
          <div className="grid gap-6">
            <UiInput
              name="name"
              onChange={formData.set}
              value={formData.value.name}
              placeholder="Enter Fullname"
              error={errors.name}
              variant="transparent"
            />
            <UiInput
              name="email"
              onChange={formData.set}
              value={formData.value.email}
              placeholder="Enter your email address"
              error={errors.email}
              variant="transparent"
            />
            <UiInput
              name="phone"
              type="phone"
              onChange={formData.set}
              value={formData.value.phone}
              placeholder="Enter your email address"
              error={errors.phone}
              variant="transparent"
            />
            <UiButton variant="white" loading={loading.value}>
              Subscribe
              <UiIcon icon="ArrowDiagonal" size="24" />
            </UiButton>
          </div>
        )}
      </UiForm>
      <div className="mt-6">
        {' '}
        <OrSeperator />
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-8">
        <p className="text-white text-sm font-montserrat">
          Join bullish run community on{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://strava.app.link/a2N2Rl6fVRb"
            className="font-bold text-orange-500 hover:text-orange-600"
          >
            STRAVA
          </a>{' '}
          to win while running
        </p>
        <div className="min-w-[129px]">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://strava.app.link/a2N2Rl6fVRb"
          >
            <UiButton variant="orange">
              Join now <UiIcon icon="ArrowDiagonal" size="24" />
            </UiButton>
          </a>
        </div>
      </div>
    </div>
  );
}
