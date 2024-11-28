import {Link} from "react-router";
import fr121 from "@/assets/fr-116-oil-on-canvas-195x195-cm-2023.jpg";

const things = [
  { title: 'Reproducing "FR-121"', description: 'An exploration of reproducing the iconic artwork "FR-121" with a modern twist.', link: '/fr-121', img: fr121 },
];

export const Things = () => {
  return (
    <section className="w-full p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {things.map((thing) => (
          <Link to={thing.link} key={thing.title} className="p-5 rounded-lg border border-border/40">
            <img src={thing.img} alt={thing.title} className="w-full object-cover rounded-lg"/>
            <h2 className="text-2xl font-inter font-bold mt-5">{thing.title}</h2>
            <p className="mt-2">{thing.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}