import MeetingTypeList from '@/components/MeetingTypeList';

const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(now);

  return (
    <section className="flex size-full flex-col gap-6 text-white px-4 md:px-6 lg:px-10">
      <div className="h-[300px] w-full rounded-2xl bg-hero bg-cover shadow-xl">
        <div className="flex h-full flex-col justify-between rounded-2xl bg-black/40 p-6 backdrop-blur-sm md:p-8 lg:p-12">
          <div className="glassmorphism w-fit rounded-lg px-4 py-1 text-center text-sm font-normal shadow-md">
            Upcoming Meeting
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
              {time}
            </h1>
            <p className="text-lg font-medium text-sky-300 md:text-xl lg:text-2xl">
              {date}
            </p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
