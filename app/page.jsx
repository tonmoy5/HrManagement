export const metadata = {
  title: "HRM | Dashboard",
  description: "HR Management Software",
};
const Home = () => {
  const cardData = [
    {
      title: "Total Employees",
      count: 8,
      style: "bg_green_gradient text-white",
    },
    {
      title: "Today's Presents",
      count: 7,
      style: "bg_blue_gradient text-white",
    },
    {
      title: "Today's Absents",
      count: 1,
      style: "bg_orange_gradient text-white",
    },
    { title: "Today's Leave", count: 0, style: "bg_red_gradient text-white" },
  ];
  return (
    <section>
      <div className="flex md:flex-row flex-col gap-5">
        {cardData.map((card, index) => (
          <Card6 key={index} card={card} />
        ))}
      </div>
    </section>
  );
};

export default Home;

const Card6 = ({ card }) => {
  return (
    <div className={`${card.style} p-5 rounded md:w-1/4 w-full`}>
      <h3>{card.title}</h3>
      <p className="text-3xl font-bold">{card.count}</p>
    </div>
  );
};
