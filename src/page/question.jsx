import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getQuestionById, putQuestionById } from '../api';
import { Loading } from '../elements/loadingScreen';
import Sharing from '../elements/sharing';

function Question() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, error, data, refetch } = useQuery(
    ['question', id],
    getQuestionById
  );
  const [voteData, setVoteData] = useState({});

  const { refetch: vote } = useQuery({
    queryKey: ['putQuestionById', { questionId: id, data: voteData }],
    queryFn: putQuestionById,
    enabled: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  async function handleVote(index) {
    const newVoteData = { ...data };

    newVoteData.choices[index].votes += 1;

    setVoteData(newVoteData);
    await vote();
    refetch();
  }

  return (
    <div className=" flex flex-col justify-center items-center gap-[3rem] ">
      <h1 className="text-3xl font-bold border-b-4 border-teal-500 pb-2 mt-[3rem] text-center">
        {data.question}
      </h1>
      <div className=" p-4 rounded-md flex  flex-col xl:flex-row gap-[1rem]">
        <img
          src={data.image_url}
          alt={data.question}
          className="mb-4 rounded-md"
        />

        <div className="mt-4  flex flex-col gap-[1rem]">
          {data.choices.map((item, index) => (
            <div className="flex items-center justify-between gap-4 text-center">
              <h3 className="text-xl" key={Number(index)}>
                {item.choice}: {item.votes}
              </h3>
              <button
                type="button"
                onClick={() => {
                  handleVote(index);
                }}
              >
                vote
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className=" flex gap-[1rem] ">
        <button
          type="button"
          className=" mt-[0rem]"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <Sharing />
      </div>
    </div>
  );
}

export default Question;
