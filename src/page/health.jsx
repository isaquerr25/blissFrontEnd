import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../elements/loadingScreen';
import { getHealthData } from '../api';

function Health() {
  const navigate = useNavigate();
  const { isLoading, data, refetch } = useQuery({
    queryKey: ['health'],
    queryFn: getHealthData,
  });

  if (isLoading) return <Loading />;

  const { status } = data;

  if (status !== 'OK') {
    return (
      <div className="flex justify-center items-center flex-col h-[100vh] w-[100vw]">
        <h3 className=" text-2xl opacity-[0.7]">Server health is not OK!</h3>
        <button
          type="button"
          className="mt-[1rem] px-[1.5rem] py-[0.5rem] rounded-[1rem] border-[2px] border-[#36d7b7] text-[1rem] hover:bg-[#fff2] transition duration-300"
          onClick={refetch}
        >
          Retry Action
        </button>
      </div>
    );
  }
  navigate('/questions');

  return <></>;
}

export default Health;
