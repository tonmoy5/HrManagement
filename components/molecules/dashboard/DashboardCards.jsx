"use client";

const DashboardCards = ({ cardData, isLoading }) => {
  return (
    <div className="flex md:flex-row flex-col gap-5 ">
      {cardData?.map((card, index) => (
        <Card key={index} card={card} isLoading={isLoading} />
      ))}
    </div>
  );
};

export default DashboardCards;

export const Card = ({ card, isLoading }) => {
  return (
    <div className={`${card.style} p-5 rounded md:w-1/4 w-full shadow-md`}>
      <h3>{card.title}</h3>

      {isLoading ? (
        <div className="h-4 rounded bg-gray-200 w-14 my-2.5 animate-pulse"></div>
      ) : (
        <p className="text-3xl font-bold">{card.count}</p>
      )}
    </div>
  );
};
