import { useEffect, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { InView } from 'react-intersection-observer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { getQuestionsList } from '../api';
import Sharing from '../elements/sharing';

function Questions() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const filter = new URLSearchParams(search).get('filter');
  const [offset, setOffset] = useState(0);
  const [questions, setQuestions] = useState([]);
  const { isLoading, data, refetch } = useQuery({
    queryKey: ['health', { offset, filter }],
    queryFn: getQuestionsList,
  });
  const inputRef = useRef();

  useEffect(() => {
    if (data) setQuestions((list) => [...list, ...data]);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [offset]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setQuestions([]);
    setOffset(0);

    navigate(`/questions?filter=${e.target.filter.value}`);
  };

  if (filter === '' && inputRef.current) {
    inputRef.current.focus();
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="pb-2 text-3xl font-bold border-b-4 border-teal-500">
        Questions
      </h1>
      <div className="border-[#36d7b7] border-[2px] p-4 mt-[1rem] rounded-[0.3rem] flex flex-row gap-4">
        <form className="flex justify-center" onSubmit={(e) => handleSubmit(e)}>
          <input
            defaultValue={filter}
            type="text"
            placeholder="Filter"
            className="text-[black] py-2 pl-2 rounded-l-[0.3rem] flex-1"
            name="filter"
            ref={inputRef}
          />

          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-l-[0] rounded-r-[0.3rem] mt-0"
          >
            Filter
          </button>
        </form>
        {filter != null && (
          <button
            type="button"
            onClick={() => {
              setQuestions([]);
              setOffset(0);
              if (inputRef.current) {
                inputRef.current.value = '';
              }
              navigate('/questions');
            }}
            className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4  border-red-800 rounded-[0.3rem] mt-0"
          >
            Clear
          </button>
        )}
        <Sharing />
      </div>
      <div className="grid justify-center grid-cols-1 gap-4 mx-4 mt-8 md:grid-cols-2 2xl:grid-cols-3">
        {questions.map((choices, index) => (
          <Link
            key={Number(index)}
            to={`/questions/${choices.id}`}
            className="block transform transition-all hover:scale-105 border-[#36d7b7]   border-[2px]  w-[20rem] rounded-[0.3rem]"
          >
            <div className="p-4 rounded-md shadow-md ">
              <h3 className="text-lg font-bold mb-[1rem] text-center">
                {choices.question}
              </h3>
              <img
                src={choices.image_url}
                alt={choices.question}
                className="mb-4 rounded-md"
              />
              {/* <div className="mt-4">
                {choices.choices.map((choice, s) => (
                  <p key={s}>
                    {choice.choice}: {choice.votes}
                  </p>
                ))}
              </div> */}
            </div>
          </Link>
        ))}
        {questions && (
          <InView
            as="div"
            onChange={(inView, entry) => {
              if (inView) {
                setOffset((value) => value + 10);
              }
            }}
          />
        )}
      </div>
      {isLoading && (
        <div className="flex justify-center items-center flex-col my-[2rem]">
          <HashLoader color="#36d7b7" />
          <h3 className="mt-[1rem] text-2xl opacity-[0.7]">Loading...</h3>
        </div>
      )}
    </div>
  );
}

export default Questions;
